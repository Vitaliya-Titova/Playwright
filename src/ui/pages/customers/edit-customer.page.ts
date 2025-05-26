import { ICustomer } from "types/customer.types";
import { SalesPortalPage } from "../salePortal.page";
import { DeleteCustomerModal } from "../modals/customers/delete.modal";
import { logStep } from "utils/reporter.utils";

export class EditCustomerPage extends SalesPortalPage {
  // Modals
  deleteCustomerModal = new DeleteCustomerModal(this.page);

  //inputs
  readonly emailInput = this.page.locator("#inputEmail");
  readonly nameInput = this.page.locator("#inputName");
  readonly countryInput = this.page.locator("#inputCountry");
  readonly cityInput = this.page.locator("#inputCity");
  readonly streetInput = this.page.locator("#inputStreet");
  readonly houseInput = this.page.locator("#inputHouse");
  readonly flatInput = this.page.locator("#inputFlat");
  readonly phoneInput = this.page.locator("#inputPhone");
  readonly notesInput = this.page.locator("#textareaNotes");

  //errors
  readonly emailError = this.page.locator("#error-inputEmail");
  readonly nameError = this.page.locator("#error-inputName");
  readonly cityError = this.page.locator("#error-inputCity");
  readonly streetError = this.page.locator("#error-inputStreet");
  readonly houseError = this.page.locator("#error-inputHouse");
  readonly flatError = this.page.locator("#error-inputFlat");
  readonly phoneError = this.page.locator("#error-inputPhone");
  readonly notesError = this.page.locator("#error-textareaNotes");

  //Buttons
  readonly saveChangesButton = this.page.getByRole("button", { name: "Save Changes" });
  readonly deleteCustomerButton = this.page.getByRole("button", { name: "Delete Customer" });

  readonly uniqueElement = this.saveChangesButton;

  @logStep("UI: Fill Edit Customer Inputs on EditCustomerPage")
  async fillInputs(customer: Partial<ICustomer>) {
    customer.email && (await this.emailInput.fill(customer.email));
    customer.name && (await this.nameInput.fill(customer.name));
    customer.country && (await this.countryInput.selectOption(customer.country));
    customer.city && (await this.cityInput.fill(customer.city));
    customer.street && (await this.streetInput.fill(customer.street));
    customer.house && (await this.houseInput.fill(customer.house.toString()));
    customer.flat && (await this.flatInput.fill(customer.flat.toString()));
    customer.phone && (await this.phoneInput.fill(customer.phone));
    customer.notes && (await this.notesInput.fill(customer.notes));
  }

  @logStep("UI: Get Edit Form Input Values on EditCustomerPage")
  async getInputValues() {
    const [email, name, country, city, street, house, flat, phone, notes] = await Promise.all([
      this.emailInput.inputValue(),
      this.nameInput.inputValue(),
      this.countryInput.inputValue(),
      this.cityInput.inputValue(),
      this.streetInput.inputValue(),
      this.houseInput.inputValue(),
      this.flatInput.inputValue(),
      this.phoneInput.inputValue(),
      this.notesInput.inputValue(),
    ]);
    return { email, name, country, city, street, house, flat, phone, notes };
  }

  @logStep("UI: Click SaveChangesButton on EditCustomerPage")
  async clickSaveChanges() {
    await this.saveChangesButton.click();
  }

  @logStep("UI: Click DeleteCustomerButton on EditCustomerPage")
  async clickDeleteCustomer() {
    await this.deleteCustomerButton.click();
  }

  @logStep("UI: Get Edit Form ErrorMessages")
  async getFormErrors() {
    return {
      email: (await this.emailError.isVisible()) ? await this.emailError.innerText() : null,
      name: (await this.nameError.isVisible()) ? await this.nameError.innerText() : null,
      city: (await this.cityError.isVisible()) ? await this.cityError.innerText() : null,
      street: (await this.streetError.isVisible()) ? await this.streetError.innerText() : null,
      house: (await this.houseError.isVisible()) ? await this.houseError.innerText() : null,
      flat: (await this.flatError.isVisible()) ? await this.flatError.innerText() : null,
      phone: (await this.phoneError.isVisible()) ? await this.phoneError.innerText() : null,
      notes: (await this.notesError.isVisible()) ? await this.notesError.innerText() : null,
    };
  }
}
