import { expect } from "@playwright/test";
import { SalesPortalPage } from "ui/pages/salePortal.page";

export abstract class Modal extends SalesPortalPage {
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
