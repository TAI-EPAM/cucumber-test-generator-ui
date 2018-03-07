import { required, maxLength } from 'vuelidate/lib/validators';

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
export { mapValidationsSuit, mapValidationsCase };

