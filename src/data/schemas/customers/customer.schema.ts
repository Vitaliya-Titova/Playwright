import { COUNTRIES } from "data/customers/countries.data";


//полная структура obj с указанием на всех уровнаях какие ключи и типы данных, иногда и значения(enum) там лежат; включая валидацию

export const customerSchema = {
  type: "object", //обязательно для каждого {}
  properties: {   //ключи, кот-е находятся в {}
    Customer: {
      type: "object",
      properties: {
        _id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        country: { type: "string", enum: Object.values(COUNTRIES) }, //вернется одна страна, тип string
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
    IsSuccess: { type: "boolean" },
    ErrorMessage: { type: ["string", "null"] },
  },
  required: ["Customer", "IsSuccess", "ErrorMessage"], //обязательные поля
};
