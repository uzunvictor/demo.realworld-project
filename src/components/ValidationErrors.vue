<template>
  <ul class="error-messages">
    <li v-for="errorMessage of errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErrors',

  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },

  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map((name) => {
        const messages = this.validationErrors[name].join(', ');
        return `${name} ${messages}`;
      });
    },
  },
};
</script>
