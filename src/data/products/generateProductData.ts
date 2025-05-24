import { faker } from "@faker-js/faker";
import { getRandromEnumValue } from "utils/enum.utilits";
import { IProduct } from "types/products.type";
import { MANUFACTURER } from "./manufacturer.data";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: `TestVita ${faker.string.alpha(31)}`,
    manufacturer: getRandromEnumValue(MANUFACTURER),
    price: faker.number.int(99999),
    amount: faker.number.int(5),
    notes: `Notes ${faker.string.alpha(244)}`,
    ...params,
  };
}
