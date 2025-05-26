import { expect } from "@playwright/test";
import { Modal } from "../modal.pages";
import { logStep } from "utils/reporter.utils";

export class DeleteCustomerModal extends Modal {
  readonly modalContainer = this.page.locator(`div[role="dialog"]`);
  readonly deleteButton = this.modalContainer.getByRole("button", { name: "Yes, Delete" });
  readonly cancelButton = this.modalContainer.getByRole("button", { name: "Cancel" });
  readonly title = this.modalContainer.locator(".modal-title");
  readonly closeButton = this.modalContainer.locator('button[aria-label="Close"]');

  uniqueElement = this.deleteButton;

  @logStep("UI: Click CloseButton on DeleteModal")
  async close() {
    await this.closeButton.click();
    await this.waitForClosed();
  }

  @logStep("UI: Click DeleteButton on DeleteModal")
  async clickDelete() {
    await this.deleteButton.click();
  }

  @logStep("UI: Click CancelButton on DeleteModal")
  async clickCancel() {
    await this.cancelButton.click();
  }
}
