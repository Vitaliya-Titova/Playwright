//страница отвечает строго за все доп методы описанные во фреймворке: тех страница
//не бизнесс методы, а для расширения функционала playwright

import { Page } from "@playwright/test";
import { IResponse } from "types/api.types";

export abstract class BasePage {
  constructor(protected page: Page) {}

  //метод waitforreq - перехват запроса к опред URL после триггера (triggerAction) даже с параметрами
  async interceptRequest<T extends unknown[]>(url: string, triggerAction: (...args: T) => Promise<void>, ...args: T) {
    const [request] = await Promise.all([this.page.waitForRequest((request) => request.url().includes(url)), triggerAction(...args)]);
    return request; // Возвращает перехваченный объект запроса
  }

  //метод перехвата ответа + приводим к типу IResponse
  async interceptResponse<U extends object | null, T extends unknown[]>(
    url: string,
    triggerAction: (...args: T) => Promise<void>,
    ...args: T
  ): Promise<IResponse<U>> {
    const [response] = await Promise.all([this.page.waitForResponse((response) => response.url().includes(url)), triggerAction(...args)]);
    return {
      status: response.status(),
      headers: response.headers(),
      body: (await response.json()) as U,
    };
  }
}
