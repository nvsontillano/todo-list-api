module.exports = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    isDone: {
      type: "boolean",
    },
  },
  additionalProperties: false,
  minProperties: 1, // Ensure at least one property is present
};