module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 5, // Minimum length for the username
      maxLength: 20 // Maximum length for the username
    },
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', // Regex for email validation
      maxLength: 255 // Maximum length for the email address
    },
    password: {
      type: 'string',
      minLength: 8, // Minimum length for the password
      maxLength: 100 // Maximum length for the password
    },
    firstName: {
      type: 'string',
      minLength: 1, // Minimum length for the first name
      maxLength: 50 // Maximum length for the first name
    },
    lastName: {
      type: 'string',
      minLength: 1, // Minimum length for the last name
      maxLength: 50 // Maximum length for the last name
    },
  },
  required: [
    'username',
    'email',
    'password',
    'firstName',
    'lastName'
  ],
  additionalProperties: false
};
