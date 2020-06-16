<template>
  <div class="tw-switch">
    <input
      type="checkbox"
      id="tw-switch"
      :checked="checked"
      @change="onChange"
      class="tw-switch__input"/>
    <label
      class="tw-switch__label"
      aria-label="Toggle Switch"
      for="tw-switch"></label>
  </div>
</template>

<script>
export default {
  name: 'TwSwitch',
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.checked);
    },
  },
};
</script>

<style scoped>
.tw-switch__input[type=checkbox]{
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;
}

.tw-switch__label {
  cursor: pointer;
  text-indent: -9999px;
  width: 60px;
  height: 30px;
  background: grey;
  display: inline-block;
  border-radius: 100px;
  position: relative;
}

.tw-switch__label:after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

.tw-switch__input:checked + .tw-switch__label {
  background: var(--success);
}

.tw-switch__input:checked + .tw-switch__label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

.tw-switch__label:active:after {
  width: 23px;
}

</style>
