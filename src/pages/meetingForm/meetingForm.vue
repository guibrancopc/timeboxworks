<template>
  <div>
    <h1>Meeting Form</h1>
    <tw-button
      :type="'success'"
      :callback="test"
      :size="'md'"
      :block="false"
      :outline="true"
      :disabled="false">Teste 2</tw-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: () => {
        console.log('Deu boaaa!!! \\o/');
      },
    };
  },
};
</script>
