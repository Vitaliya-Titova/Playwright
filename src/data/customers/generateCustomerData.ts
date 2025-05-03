import { faker } from "@faker-js/faker";
import { ICustomer } from "types/customer.types";
import { COUNTRIES } from "data/customers/countries.data";
import { getRandromEnumValue } from "utils/enum.utilits";

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: `test${Date.now()}@gmail.com`,
    name: `TestVita ${faker.string.alpha(31)}`,
    country: getRandromEnumValue(COUNTRIES),
    city: `City ${faker.string.alpha(15)}`,
    street: `Street ${faker.string.alphanumeric(33)}`,
    house: faker.number.int(999),
    flat: faker.number.int(9999),
    phone: `+${faker.number.int({ min: 1000000000, max: 9999999999 })}`,
    notes: `Notes ${faker.string.alpha(244)}`,
    ...params,
  };
}
