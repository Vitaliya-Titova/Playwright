import { expect } from "@playwright/test";
import { Modal } from "../modal.pages";
import { logStep } from "utils/reporter.utils";

export class FilterModal extends Modal {
  readonly uniqueElement = this.page.locator(`div[role="dialog"]`);

  readonly title = this.uniqueElement.locator(".modal-title");
  readonly applyButton = this.uniqueElement.getByRole("button", { name: "Apply" });
  readonly clearFiltersButton = this.uniqueElement.getByRole("button", { name: "Clear Filters" });
  readonly closeButton = this.uniqueElement.locator('button[aria-label="Close"]');

  readonly checkbox = (name: string) => this.uniqueElement.locator(`input[value="${name}"]`);

  //Для каждого значения из  списка  находит на странице чекбокс,
  //  у которого атрибут value совпадает с этим значением
  // и кликает по этому чекбоксу, чтобы его отметить
  // мультивыбор
  @logStep("UI: Check Multiple Options on FilterModal")
  async checkFilters(...value: string[]) {
    for (const v of value) {
      await this.checkbox(v).check();
    }
  }

  @logStep("UI: Click ApplyButton on FilterModal")
  async clickApply() {
    await this.applyButton.click();
  }

  @logStep("UI: Click ClearFiltersButton on FilterModal")
  async clickClearFilters() {
    await this.clearFiltersButton.click();
  }

  @logStep("UI: Click CloseButton on FilterModal")
  async close() {
    await this.closeButton.click();
    await expect(this.uniqueElement).not.toBeVisible(); //дождемся что модалка полностью пропала
  }
}
