module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3, // Minimum length for the username
      maxLength: 20 // Maximum length for the username
    },
    password: {
      type: 'string',
      minLength: 8, // Minimum length for the password
      maxLength: 100 // Maximum length for the password
    }
  },
  required: [
    'username',
    'password'
  ],
  additionalProperties: false
};
