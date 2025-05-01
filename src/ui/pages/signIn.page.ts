import { ISignIn } from "types/signIn.types";
import { SalesPortalPage } from "./salePortal.page";

export class SignInPage extends SalesPortalPage {
  emailInput = this.page.locator("#emailinput");
  passwordInput = this.page.locator("#passwordinput");
  loginButton = this.page.getByRole("button", { name: "Login" });

  uniqueElement = this.loginButton;

  async fillCredentials(user: Partial<ISignIn>) {
    user.email && (await this.emailInput.fill(user.email));
    user.password && (await this.passwordInput.fill(user.password));
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
