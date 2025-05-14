import { ICreateValidDataCustomer } from "types/customer.types";
import { generateCustomerData } from "./generateCustomerData";
import _ from "lodash";

export const regValidTestData: ICreateValidDataCustomer[] = [
  {
    testName: "Success | All required fields are valid (without notes)",
    validCreationCustomerData: _.omit(generateCustomerData(), ["notes"]),
  },
  {
    testName: "Success | All required fields are valid (notes empty)",
    validCreationCustomerData: generateCustomerData({ notes: "" }),
  },
  {
    testName: "Success | All fields are valid",
    validCreationCustomerData: generateCustomerData(),
  },
  {
    testName: "Success | Minimum length inputs-data",
    validCreationCustomerData: generateCustomerData({ name: "T", city: "T", street: "T", house: 1, flat: 1, phone: "+1234567890" }),
  },
  {
    testName: "Success | Maximum length inputs-data",
    validCreationCustomerData: generateCustomerData({ name: "T".repeat(39), city: "T".repeat(19), street: "T".repeat(20), house: 999, flat: 9999, phone: "+12345678901234567890", notes: "A".repeat(250) }),
  },
];
