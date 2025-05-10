import { expect } from "@playwright/test";
import Ajv from "ajv";

//сравниваются по сути 2 объекта но ч/з json schema
export function validateSchema(expectedSchema: object, body: object) {
  const ajv = new Ajv();
  //создается валидатор исходя из той схемы, которую мы ему отдали, работает как замыкание(closure)
  const validate = ajv.compile(expectedSchema);

  //вернется булевое значение
  const isValid = validate(body);
  if (!isValid) {
    console.log("Data is not valid according to the schema.");
    console.log(validate.errors);
    expect.soft(validate.errors, "Should not have json schema errors").toMatchObject([]);
  }
  expect.soft(isValid, "Actual data should match expected").toBe(true);
}
