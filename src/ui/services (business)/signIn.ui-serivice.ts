import { Page } from "@playwright/test";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";
import { logStep } from "utils/reporter.utils";

//доп слой астракции

export class SignInUIService {
  private signInPage: SignInPage;
  private homePage: HomePage; 
  constructor(private page: Page) {
    this.signInPage = new SignInPage(page);
    this.homePage = new HomePage(page);
  }

  @logStep("UI Service: Login as Local User")
  async signInAsLocalUser() {
    await this.signInPage.openPortal();
    await this.signInPage.fillCredentials({ username: USER_LOGIN, password: USER_PASSWORD });
    await this.signInPage.clickLoginButton();
    await this.homePage.waitForOpened();
    //получение токена из браузерного контекста 
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    // find() возвращает 1e true  или undefined-> !.value утверждаем, что cookie "Authorization" обязательно будет найден, 
    // и  результат find() не будет undefined
    return token;
  }
}