import { ERROR_NOTIFICATIONS, NOTIFICATIONS } from "data/notifications.data";
import { ICreateValidDataCustomer } from "types/customer.types";
import { generateCustomerData } from "./generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { faker } from "@faker-js/faker";
import _ from "lodash";

export const regValidTestData: ICreateValidDataCustomer[] = [
  //Email
  {
    testName: "Success | All required fields are valid",
    validCreationCustomerData: _.omit(generateCustomerData(), ["notes"]),
  },
  {
    testName: "Success | All fields are valid",
    validCreationCustomerData: generateCustomerData(),
  },
  // {
  //   testName: "Error | Email already exists",
  //   invalidCreationCustomerData: generateCustomerData({ email: "Vita_test2@domain.com" }),
  //   message: NOTIFICATIONS.CUSTOMER_DUPLICATED("Vita_test2@domain.com"),
  //   statusCode: STATUS_CODES.CONFLICT,
  // },
  // {
  //   testName: "Error | Email is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["email"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //Name
  // {
  //   testName: "Error | Name is empty",
  //   invalidCreationCustomerData: generateCustomerData({ name: "" }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Name is too long",
  //   invalidCreationCustomerData: generateCustomerData({ name: `TestVita ${faker.string.alpha(32)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Name is only numbers",
  //   invalidCreationCustomerData: generateCustomerData({ name: 123 as unknown as string }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Name is only special characters",
  //   invalidCreationCustomerData: generateCustomerData({ name: `${faker.string.fromCharacters("!@#$%^&*()_+-=[]{}", 20)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Name is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["name"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //Country
  // {
  //   testName: "Error | Country is empty",
  //   invalidCreationCustomerData: generateCustomerData({ country: undefined }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Country is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["country"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //City
  // {
  //   testName: "Error | City is empty",
  //   invalidCreationCustomerData: generateCustomerData({ city: "" }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | City is too long",
  //   invalidCreationCustomerData: generateCustomerData({ city: `TestVita ${faker.string.alpha(22)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | City is only numbers",
  //   invalidCreationCustomerData: generateCustomerData({ city: 123 as unknown as string }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | City is only special characters",
  //   invalidCreationCustomerData: generateCustomerData({ city: `${faker.string.fromCharacters("!@#$%^&*()_+-=[]{}", 10)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | City is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["city"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //Street
  // {
  //   testName: "Error | Street is empty",
  //   invalidCreationCustomerData: generateCustomerData({ street: "" }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Street is too long",
  //   invalidCreationCustomerData: generateCustomerData({ street: `TestStreet ${faker.string.alpha(32)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Street is only numbers",
  //   invalidCreationCustomerData: generateCustomerData({ street: 30 as unknown as string }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Street is only special characters",
  //   invalidCreationCustomerData: generateCustomerData({ street: `${faker.string.fromCharacters("!@#$%^&*()_+-=[]{}", 20)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Street is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["street"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //HouseNumber
  // {
  //   testName: "Error | HouseNumber is zero",
  //   invalidCreationCustomerData: generateCustomerData({ house: 0 }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | HouseNumber is too big",
  //   invalidCreationCustomerData: generateCustomerData({ house: 1000 }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | HouseNumber is only string",
  //   invalidCreationCustomerData: {
  //     house: faker.string.alpha("qwerty") as unknown as number, // Перезаписываем house к unknown, а затем к number
  //   },
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | HouseNumber is only special characters",
  //   invalidCreationCustomerData: generateCustomerData({ house: faker.string.fromCharacters("!@#$%^&*()_+-=[]{}", 20) as unknown as number }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | HouseNumber is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["house"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //FlatNumber
  // {
  //   testName: "Error | FlatNumber is zero",
  //   invalidCreationCustomerData: generateCustomerData({ flat: 0 }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | FlatNumber is too big",
  //   invalidCreationCustomerData: generateCustomerData({ flat: 10000 }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | FlatNumber is only string",
  //   invalidCreationCustomerData: {
  //     house: faker.string.alpha("qwerty") as unknown as number, // Перезаписываем house к unknown, а затем к number
  //   },
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | FlatNumber is only special characters",
  //   invalidCreationCustomerData: generateCustomerData({ flat: faker.string.fromCharacters("!@#$%^&*()_+-=[]{}", 20) as unknown as number }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | FlatNumber is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["flat"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //Phonenumber
  // {
  //   testName: "Error | Phonenumber is too short",
  //   invalidCreationCustomerData: generateCustomerData({ phone: `+${faker.string.numeric(8)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Phonenumber is too long",
  //   invalidCreationCustomerData: generateCustomerData({ phone: `+${faker.string.numeric(21)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Phonenumber is without +",
  //   invalidCreationCustomerData: generateCustomerData({ phone: `${faker.string.numeric(15)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Phonenumber is missing",
  //   invalidCreationCustomerData: _.omit(generateCustomerData(), ["phone"]),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // //Notes
  // {
  //   testName: "Error | Notes with forbidden characters",
  //   invalidCreationCustomerData: generateCustomerData({ phone: `${faker.string.alpha(8)} < or > symbols` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
  // {
  //   testName: "Error | Notes is too long",
  //   invalidCreationCustomerData: generateCustomerData({ notes: `${faker.string.alpha(251)}` }),
  //   message: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
  //   statusCode: STATUS_CODES.BAD_REQUEST,
  // },
];
