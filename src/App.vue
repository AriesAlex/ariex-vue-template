<template>
  <div id="app" :theme="theme">
    <router-view v-if="!hideRouterView" />

    <AlertPopup />
    <ConfirmPopup />
    <ImagePopup />
    <PromptPopup />
  </div>
</template>

<script>
import AlertPopup from '@/components/Popups/Alert'
import ConfirmPopup from '@/components/Popups/Confirm'
import ImagePopup from '@/components/Popups/Image'
import PromptPopup from '@/components/Popups/Prompt'

export default {
  components: { AlertPopup, ConfirmPopup, ImagePopup, PromptPopup },
  data() {
    return {
      theme: 'default',
      hideRouterView: false,
    }
  },
  created() {
    this.$events.on('set-lang', this.setLang)
    this.$events.on('set-theme', this.setTheme)
    this.setTheme('default')
  },
  methods: {
    setTheme(theme) {
      import(`@/scss/themes/${theme}.scss`)
      .then(() => this.theme = theme)
    },
    setLang(lang) {
      localStorage.lang = lang
      window.userLocale = lang
      this.$i18n.locale = lang
      this.$api.defaults.headers.common.Locale = lang
      this.redrawRouterView()
    },
    insertCSS(styles) {
      let styleSheet = document.createElement('style')
      styleSheet.type = 'text/css'
      styleSheet.innerText = styles
      document.head.appendChild(styleSheet)
      return styleSheet
    },
    initMaterialIcons() {
      let css = this.insertCSS(`.material-icons {visibility: hidden}`)
      let interval = setInterval(() => {
        let loaded = document.fonts.check('12px Material Icons')
        if(loaded) {
          clearInterval(interval)
          css.outerHTML = ''
        }
      }, 200)
    },
    redrawRouterView() {
      this.hideRouterView = true
      this.$nextTick(() => {
        this.hideRouterView = false
      })
    },
  },
}
</script>

<style lang="scss">
* {
  font-family: Roboto, Helvetica, sans-serif;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

input { -webkit-user-select:text !important; user-select: text !important;}

#app .el-button+.el-button {
  margin-left: 0;
}
</style>
