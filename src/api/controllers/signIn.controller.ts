import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { ICredentials, ILoginFromResponse } from "types/signIn.types";

export class SignInController {
  constructor(private request = new RequestApi()) {}

  //login
  async signIn(body: ICredentials) {
    const options: IRequestOptions = {
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
