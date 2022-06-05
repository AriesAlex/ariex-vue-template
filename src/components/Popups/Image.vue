<template>
  <div id="image-popup" v-show="img" @click="img = null">
    <div class="popup">
      <img class="image" :src="img">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      img: null
    }
  },
  mounted() {
    this.$events.on('show-image', img => {
      this.img = img
    })
  },
}
</script>

<style lang="scss">
  #image-popup {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 16;
    
    .popup {
      .image {
        max-width: 100%;
        max-height: 100%;
        bottom: 0;
        left: 0;
        margin: auto;
        overflow: auto;
        position: fixed;
        right: 0;
        top: 0;
        -o-object-fit: contain;
        object-fit: contain;
      }
    }
  }
</style>