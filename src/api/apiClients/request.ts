import { APIResponse, request } from "@playwright/test";
import { apiConfig } from "config/api-config";
import _ from "lodash";
import { IRequestOptions, IResponse } from "types/api.types";

//ооснова для всех API-запросов в тестах. Он используется в контроллерах (SignInController, CustomersController)
// для выполнения запросов
export class RequestApi {
  // Приватное поле для хранения последнего полученного объекта APIResponse
  private response: APIResponse | undefined;
  //Отправляет HTTP-запрос на указанный URL с заданными опциями
  async send<T extends Object | null>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      const requestContext = await request.newContext({
        // Используем baseURL из опций, если есть, иначе берем из конфигурации
        baseURL: options.baseURL ?? apiConfig.BASE_URL,
      });
      // Выполняем запрос
      this.response = await requestContext.fetch(options.url, _.omit(options, ["baseURL", "url"]));
      // Обязательно прописать про 500 ошибки, тк методу fetch нормально с любым статус кодом
      // поэтому проверяем, не является ли статус код ответа ошибкой сервера (>=500)
      //если >=500 то переходим в catch
      if (this.response.status() >= 500) throw new Error("Request failed with status " + this.response.status());
      // Преобразуем тело ответа в зависимости от типа контента
      const result = await this.transformResponse();
      return result;
    } catch (err) {
      console.log((err as Error).message);
      throw err;
    }
  }
  // метод определяет в каком виде будем получать  Response, т.е переопределим
  //напр contentType при удалении customer  нет
  async transformResponse() {
    let body;
    //если contentType не пришел или пустая строка  или в нем нет application/json, то  преобразуем ответ в текст
    // если contentType пришел - ответ json
    const contentType = this.response!.headers()["content-type"] || ""; //! - значение не null и не undefined
    // если this.response!.headers() вернет заголовки без ключа "content-type" (или его значение будет null или undefined),
    // то оператор || "" вернет пустую строку ("").
    //Это предотвращает ошибку, includes() не работает с  undefined, но работает с пустой строком
    if (contentType.includes("application/json")) {
      body = await this.response!.json();
    } else {
      body = await this.response!.text();
    }
    //вернем статус, тело и хедеры
    return {
      status: this.response!.status(),
      body,
      headers: this.response!.headers(),
    };
  }
}
