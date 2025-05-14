import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { test as base } from "./pages.fixture";

interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ homePage, signInPage }, use) => {
    await use(async () => {
      await signInPage.openPortal();
      await signInPage.fillCredentials({ username: USER_LOGIN, password: USER_PASSWORD });
      await signInPage.clickLoginButton();
      await homePage.waitForOpened();

      // await page.locator("#emailinput").fill(USER_LOGIN);
      // await page.locator("#passwordinput").fill(USER_PASSWORD);
      // await page.getByRole("button", { name: "Login" }).click();
    });
  },
});

export { expect } from "@playwright/test";
