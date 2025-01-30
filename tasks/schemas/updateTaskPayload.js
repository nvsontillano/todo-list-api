module.exports = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 255
    },
    description: {
      type: "string",
      maxLength: 1023
    },
    isDone: {
      type: "boolean",
    },
  },
  additionalProperties: false,
  minProperties: 1, // Ensure at least one property is present
};