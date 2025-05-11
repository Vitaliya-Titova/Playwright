import { COUNTRIES } from "data/customers/countries.data";

//полная структура obj с указанием на всех уровнаях какие ключи и типы данных, иногда и значения(enum) там лежат; включая валидацию

export const customersAllSchema = {
  type: "object",
  properties: {
    Customers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          country: { type: "string", enum: Object.values(COUNTRIES) },
          city: { type: "string" },
          street: { type: "string" },
          house: { type: "number" },
          flat: { type: "number" },
          phone: { type: "string" },
          createdOn: { type: "string" },
          notes: { type: "string" },
        },
        required: ["_id", "email", "name", "country", "street", "city", "createdOn", "house", "flat", "phone"],
      },
    },
    ErrorMessage: { type: ["string", "null"] },
    IsSuccess: { type: "boolean" },
    sorting: {
      type: "object",
      properties: {
        sortField: { type: "string" },
        sortOrder: { type: "string" },
      },
      required: ["sortField", "sortOrder"],
    },
  },
  required: ["Customers", "IsSuccess", "ErrorMessage", "sorting"],
};
