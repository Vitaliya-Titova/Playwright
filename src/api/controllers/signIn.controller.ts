import { APIRequestContext } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { ICredentials, ILoginFromResponse } from "types/signIn.types";
import { logStep } from "utils/reporter.utils";

export class SignInController {
  private request: RequestApi;
  constructor() {
    this.request = new RequestApi();
  }
  //constructor(private request = new RequestApi()) {}

  @logStep("API: Login")
  async signIn(body: ICredentials) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.LOGIN,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    };
    return await this.request.send<ILoginFromResponse>(options);
  }
}
