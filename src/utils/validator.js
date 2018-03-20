import { required, maxLength, email, minLength } from 'vuelidate/lib/validators';

function mapValidationsSuit() {
  return {
    validations: {
      entity: {
        name: {
          required,
          maxLength: maxLength(250),
        },
        description: {
          maxLength: maxLength(250),
        },
        priority: {
          required,
        },
      },
    },
  };
}
function mapValidationsCase() {
  return {
    validations: {
      entity: {
        name: {
          required,
          maxLength: maxLength(250),
        },
        description: {
          required,
          maxLength: maxLength(250),
        },
        priority: {
          required,
        },
      },
    },
  };
}
function mapValidationsRegistration() {
  return {
    validations: {
      entity: {
        firstName: {
          required,
          maxLength: maxLength(250),
        },
        lastName: {
          required,
          maxLength: maxLength(250),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(5),
        },
        confirmationPassword: {
          required,
          minLength: minLength(5),
        },
      },
    },
  };
}
export { mapValidationsSuit, mapValidationsCase, mapValidationsRegistration };

