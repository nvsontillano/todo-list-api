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
  },
  required: ["title"],
  additionalProperties: false,
};