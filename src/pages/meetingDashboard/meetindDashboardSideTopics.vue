<template>
  <tw-box class="tw-meeting-dashboard-parking-lot">
    <div class="tw-u-text-align--right tw-u-margin--bottom">
      <tw-button
        size="sm"
        @click="onAdd">+ Add side topic</tw-button>
    </div>
    <div
      v-if="isListItemsEmpty"
      class="tw-meeting-dashboard-pargking-lot__blank-slate" >
      <p>Have a side topic? Post it here in your parking lot. :)</p>
    </div>
    <div
      v-else
      class="tw-meeting-dashboard-parking-lot__body">
      <tw-post-it
        ref="postIts"
        style="margin: 4px"
        v-for="(item, index) in items"
        :key="item.id"
        :prefix="`${index + 1}. `"
        v-model="item.value"
        @textarea-blurred="onTextareaBlurred(item)"
        @deleted="onDelete(item)" />
    </div>
  </tw-box>
</template>

<script>
export default {
  name: 'TwMeetingDashboardSideTopics',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isListItemsEmpty() {
      return this.items.length === 0;
    },
  },
  methods: {
    onTextareaBlurred(item) {
      if (!item.value) {
        this.deleteById(item.id);
      }
    },
    onAdd() {
      const newId = this.$twServices.uid.getUid();
      this.addById(newId);
      this.$nextTick(() => {
        this.focusById(newId);
      });
    },
    addById(newId) {
      this.items.push({
        id: newId,
        value: '',
      });
    },
    onDelete(item) {
      if (!item.value) {
        this.deleteById(item.id);
      } else {
        this.$twDialog.confirm({
          text: 'Are you sure to remove it?',
          confirmButtonTheme: 'danger',
          confirmButtonText: 'Yes, do it',
          cancelButtonText: 'Not anymore',
          callback: isConfirmed => {
            if (isConfirmed) { this.deleteById(item.id); }
          },
        });
      }
    },
    deleteById(id) {
      const index = this.items
        .map(item => item.id)
        .indexOf(id);
      this.items.splice(index, 1);
    },
    focusById(id) {
      const indexFound = this.items.findIndex(item => item.id === id);
      this.$refs.postIts[indexFound].$refs.textarea.focus();
    },
  },
};
</script>

<style scoped>
.tw-meeting-dashboard-pargking-lot__blank-slate {
  text-align: center;
  margin: 74.5px 0;
  color: var(--gray);
}
</style>
