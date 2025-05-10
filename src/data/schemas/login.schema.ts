export const loginSchema = {
  type: "object", //обязательно для каждого {}
  properties: {
    //ключи, кот-е находятся в {}
    IsSuccess: { type: "boolean" },
    ErrorMessage: { type: ["string", "null"] },
    User: {
      type: "object",
      properties: {
        _id: { type: "string" },
        username: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        roles: {
          type: "array",
          items: {
            type: "string",
          },
        },
        createdOn: { type: "string" },
      },
      required: ["_id", "firstName", "lastName", "username", "roles", "createdOn"],
    },
  },
  required: ["IsSuccess", "ErrorMessage", "User"],
};
