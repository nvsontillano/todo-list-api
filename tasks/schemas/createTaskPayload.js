module.exports = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  required: ["title"],
  additionalProperties: false,
};