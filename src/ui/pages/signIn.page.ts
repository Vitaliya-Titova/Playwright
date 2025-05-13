import { ICredentials } from "types/signIn.types";
import { SalesPortalPage } from "./salePortal.page";

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.getByRole("button", { name: "Login" });

  readonly uniqueElement = this.loginButton;

  async fillCredentials({ username, password }: Partial<ICredentials>) {
    username && (await this.emailInput.fill(username));
    password && (await this.passwordInput.fill(password));
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
