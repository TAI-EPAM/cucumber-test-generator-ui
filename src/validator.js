import { required, maxLength } from 'vuelidate/lib/validators';

function mapValidations() {
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
export default mapValidations;

