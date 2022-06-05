<template>
  <div id="alert-popup">
    <PopupBase
      :title="title"
      :show="show"
      @close="show=false"
    >
      <div v-html="content" />
    </PopupBase>
  </div>
</template>

<script>
import PopupBase from '@/components/Popups/PopupBase'
export default {
  components: { PopupBase },
  data() {
    return {
      show: false,
      title: '',
      content: '',
    }
  },
  mounted() {
    this.$events.on('show-alert', (content, options = {}) => {
      this.title = options.title ?? this.$t('ui.attention')
      this.content = content
                         .replace(/\r\n/g, '<br>')
                         .replace(/\r\n/g, '<br>')
                         .replace(/\n/g, '<br>')
                         .replace(/\r/g, '<br>')
      this.show = true
    })
  },
}
</script>