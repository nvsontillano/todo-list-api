const { roles } = require('../../utils/config');

module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
    password: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
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