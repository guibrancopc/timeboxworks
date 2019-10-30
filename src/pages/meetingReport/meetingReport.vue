<template>
  <div>
    <h1>Meeting Report</h1>
    <tw-page>
      <tw-form>
        <tw-input-datetimepicker
          v-model="timepicker"
          label="Time Picker"
          :required="true"
          :custom-validation="customDateValidation"
          @input-validation="validationEvent"
          />
        <br>
        {{timepicker}}
        <br><br><br>

        <tw-input-text
          :rows="10"
          :label="'awefawef'"
          v-model.trim="text"
          :custom-validation="customValidation"
          :min-length="9"
          :max-length="50"
          :required="true"/>
          <tw-input-text
          :rows="10"
          :label="'awefawef'"
          v-model.trim="text"
          :custom-validation="customValidation"
          :min-length="9"
          :max-length="50"
          :required="true"/>
        <tw-input-text
          type="textarea"
          :rows="10"
          :label="'awefawef'"
          v-model.trim="text"
          :custom-validation="customValidation"
          :min-length="9"
          :max-length="50"
          :required="true"/>
          <br>
          <br>
          <br>
        {{text}}
        <br><br><br>
        <tw-button
          :type="'success'"
          :callback="test"
          :block="false"
          :outline="true"
          :disabled="false">Teste 2</tw-button>
      </tw-form>
    </tw-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Seu nome aqui',
      timepicker: 'afeawef',
      validation1: {},
    };
  },
  methods: {
    validationEvent(teste) {
      console.log('teste', teste);
    },
    teste2(a, b, c) {
      console.log('Lereeee!!!!', a, b, c);
    },
    test() {
      console.log('Deu boaaa!!! \\o/');
    },
    customValidation(text) {
      return text != 'kkk';
    },
    customDateValidation(date) {
      return date !== '2019-10-10T20:50:00.000Z'
    }
  }
};
</script>
