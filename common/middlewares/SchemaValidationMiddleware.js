const Ajv = require('ajv');

generateErrorMessages = (validate) => {
  // Generate error messages based on the error type
  let errorMessages = validate.errors.map((error) => {
    switch (error.keyword) {
      case 'additionalProperties':
        return {
          message: `${error.params.additionalProperty} is not a valid property.`,
        };
      case 'minProperties':
        const minProperties = error.params.limit;
        return {
          message: `Must have at least ${minProperties} properties in the payload.`,
        };
      case 'type':
        return {
          message: `${ajv.errorsText(validate.errors)}.`,
        };
      case 'required':
        return {
          message: `Payload ${error.message}.`,
        };
      default:
        return {
          message: `Invalid payload: ${ajv.errorsText(validate.errors)}.`,
        };
    }
  });

  // Concatenate all error messages into a single string
  errorMessages = errorMessages.reduce((acc, curr) => {
    return acc + curr.message;
  }, '');

  return errorMessages;
};

module.exports = {
  verify: (schema) => {
    if (!schema) {
      throw new Error('Schema not provided');
    }

    return (req, res, next) => {
      const { body } = req;
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (isValid) {
        return next();
      }

      const errorMessages = generateErrorMessages(validate);

      return res.status(400).send({
        status: false,
        message: errorMessages,
      });
    }
  }
};