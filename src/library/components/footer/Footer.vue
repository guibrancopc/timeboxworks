<template>
  <footer class="tw-footer">
    <tw-divider />
    <slot>
      <tw-row>
        <tw-col v-if="$slots.left">
          <slot name="left" />
        </tw-col>
        <tw-col class="tw-u-text-align--right" v-if="$slots.right">
          <slot name="right" />
        </tw-col>
      </tw-row>
    </slot>
  </footer>
</template>

<script>
import TwDivider from '../divider/Divider.vue';
import TwRow from '../row/Row.vue';
import TwCol from '../col/Col.vue';

export default {
  name: 'TwFooter',
  components: {
    TwDivider,
    TwRow,
    TwCol,
  },
};
</script>
