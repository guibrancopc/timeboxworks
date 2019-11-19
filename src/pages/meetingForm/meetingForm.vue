<template>
    <tw-container>
        <tw-row>
          <tw-col>
            <tw-title :size="1">Meeting Form</tw-title>
          </tw-col>
        </tw-row>
        <tw-page>
          <tw-row>
            <tw-col>
              <tw-input-text
                label="Meeting name"
                :required="false"/>
              <tw-input-text
                label="Meeting Description"
                type="textarea"
                :rows="3"/>
              <tw-row>
                <tw-col>
                  <tw-input-datetime-picker
                    label="Start time"/>
                </tw-col>
                <tw-col>
                  <tw-input-datetime-picker
                    label="End time"/>
                </tw-col>
              </tw-row>
            </tw-col>
          </tw-row>
        </tw-page>
        <button @click="shouldShow = !shouldShow">Teste</button>
        <transition name="fade">
          <div v-if="shouldShow">IAIHEWFAIUHE</div>
        </transition>
    </tw-container>
</template>

<script>
export default {
  name: 'tw-meeting-form',
  data() {
    return {
      shouldShow: true,
    };
  },
};
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
