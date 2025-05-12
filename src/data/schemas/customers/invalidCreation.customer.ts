export const invalidCreationCustomerSchema = {
  type: "object",
  properties: {
    IsSuccess: { type: "boolean" },
    ErrorMessage: { type: "string" },
  },
  required: ["IsSuccess", "ErrorMessage"],
};
