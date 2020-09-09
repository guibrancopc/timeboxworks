<template>
  <footer class="tw-the-footer">
    <br><br>
    <tw-the-logo type="rounded"/>
    <br><br>
    <tw-p>Have any feedback? Feel free to <tw-a
      target="_blank"
      :href="getFeedbackLink()">send us a message</tw-a> whenever you want. :)</tw-p>
    <br><br>
  </footer>
</template>

<script>
export default {
  name: 'TwTheFooter',
  methods: {
    getFeedbackLink() {
      return 'https://docs.google.com/forms/d/1OZ7q7SiMusZ9wJfKTiwH-hPkG83hcUdx7emi3TlOWyI';
    },
  },
};
</script>

<style scoped lang="scss">
  .tw-the-footer {
    text-align: center;
    color: var(--gray);
    .tw-the-logo {
      width: 150px;
      opacity: 0.5;
      transition: 0.3s;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>
