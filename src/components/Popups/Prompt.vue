<template>
  <div id="prompt-popup">
    <PopupBase
      :title="title"
      :show="show"
      @close="cancel"
    >
      <div v-html="content" />

      <el-input v-model="value" :placeholder="placeholder" />
      
      <div class="buttons">
        <el-button @click="confirm" type="primary">{{confirmText}}</el-button>
        <el-button @click="cancel">{{cancelText}}</el-button>
      </div>
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
      confirm: ()=>{},
      cancel: ()=>{},
      confirmText: '',
      cancelText: '',
      value: '',
      placeholder: '',
    }
  },
  mounted() {
    this.$events.on('show-prompt', (content, confirm, cancel, options = {}) => {
      this.title = options.title ?? this.$t('ui.enter')
      this.content = content
      this.confirm = () => { this.show = false; if(confirm) confirm(this.value) }
      this.cancel = () => { this.show = false; if(cancel) cancel() }
      this.confirmText = options.confirmText ?? this.$t('ui.confirm')
      this.cancelText = options.cancelText ?? this.$t('ui.cancel')
      this.value = options.default ?? ''
      this.placeholder = options.placeholder ?? ''
      this.show = true
    })
  },
}
</script>

<style lang="scss">
#prompt-popup {
  >.popup-base .popup .content {
    >.el-input {
      margin-top: 15px;
    }
    
    >.buttons {
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;

      >*:nth-child(2) { margin-top: 5px }
    }
  }
}
</style>