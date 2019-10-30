<template>
  <img class="ca-icon" :src="validImagePath" :alt="alt" :class="dynamicStyleClasses">
</template>

<script>
import angle_down from './images/angle_down.svg';
import calendar from './images/calendar.svg';

const availableIcons = {
  angle_down,
  calendar,
};

const availableSizes = ['sm', 'md', 'lg'];

export default {
  name: 'CaIcon',
  props: {
    name: {
      type: String,
    },
    size: {
      type: String,
      default: 'md'
    },
  },
  computed: {
    validImagePath() {
      if(this.iconIsValid(this.name)) {
        return availableIcons[this.name];
      }
      this.consoleError('icon', this.name)
      return '';
    },
    alt() {
      return `Icon ${this.name}`;
    },
    dynamicStyleClasses() {
      let classes = {};
      this.insertValidSizeClass(classes);
      return classes;
    },
  },
  methods: {
    insertValidSizeClass(classes) {
      if (this.sizeIsValid(this.size)) {
        classes[`ca-icon-${this.size}`] = true;
      } else {
        this.consoleError('size', this.size)
      }
    },
    sizeIsValid(size) {
      return availableSizes.includes(size);
    },
    iconIsValid(icon) {
      return !!availableIcons[icon];
    },
    consoleError(prop, value) {
      console.error(`CA ERROR: Invalid ${prop} type on Icon Component "${value}"`);
    }
  }
}
</script>

<style lang="scss">
.ca-icon-sm {
  width: 15px;
}

.ca-icon-md {
  width: 25px;
}

.ca-icon-lg {
  width: 30px;
}
</style>