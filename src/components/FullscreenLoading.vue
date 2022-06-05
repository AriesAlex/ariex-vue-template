<template>
  <div class="fullscreen-loading">
    <div class="lds-facebook" v-if="showSpinner">
      <div></div><div></div><div></div>
    </div>
    <div class="error" v-html="error" v-if="error" />
  </div>
</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
      showSpinner: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSpinner = true
    }, 100)
  },
}
</script>

<style lang="scss">
@import '@/scss/lds/facebook.scss';

.fullscreen-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15px;

  >.lds-facebook * {
    background: var(--primary-color);
  }

  .error {
    margin-top: 15px;
    font-size: 18px;
    text-align: center;
  }
}
</style>