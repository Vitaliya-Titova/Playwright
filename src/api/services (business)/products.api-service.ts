import { APIRequestContext, expect } from "@playwright/test";
import { ProductController } from "api/controllers/product.controller";
import { generateProductData } from "data/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct } from "types/products.type";
import { logStep } from "utils/reporter.utils";
import { validateResponse } from "utils/validations/responseValidation";

//ProductsApiService упрощает процесс создания новых продуктов через API в тестах,
//скрывает детали формирования тела запроса и валидации базового ответа.
export class ProductsApiService {
  private controller: ProductController;
  constructor(request: APIRequestContext) {
    this.controller = new ProductController();
  }
  //метод создает продукт, и валидирует его. Отдает объект продукта
  // - Генерирует или принимает данные продукта
  // - Вызывает контроллер для отправки запроса
  // - Валидирует общий ответ API
  // - Возвращает объект созданного продукта из тела ответа
  @logStep("Create Product via API")
  async create(token: string, productData?: IProduct) {
    const body = generateProductData(productData);
    const response = await this.controller.create(body, token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Product;
  }
}
