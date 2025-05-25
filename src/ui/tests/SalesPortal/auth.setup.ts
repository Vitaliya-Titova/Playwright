import { test } from "fixtures/ui-services.fixture";

//место где хранится сохраненный контекст
const authFile = "src/.auth/user.json";

test("Login to Sales Portal", async ({ page, signInApiService }) => {
  const token = await signInApiService.loginAsLocalUser();
  //запись в текущий контекст
  //https://playwright.dev/docs/auth
  await page.context().addCookies([
    {
      name: "Authorization",
      value: token,
      domain: "anatoly-karpovich.github.io",
      path: "/aqa-course-project",
      expires: -1,
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
  //сохранение контекста
  await page.context().storageState({ path: authFile });
});
