import Vue from 'vue'
import VueI18n from 'vue-i18n'
import getUserLocale from 'get-user-locale'

Vue.use(VueI18n)


function getLocale() {
  let userLocale = localStorage.lang || getUserLocale()
  let defaultLocale = getUserLocale()
  let locale = 'en'
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  locales.keys().forEach(key => {
    if('./' + userLocale.split('-')[0] + '.json' == key) locale = userLocale.split('-')[0]
    if('./' + userLocale + '.json' == key) locale = userLocale

    if('./' + getUserLocale().split('-')[0] + '.json' == key) defaultLocale = getUserLocale().split('-')[0]
    if('./' + getUserLocale() + '.json' == key) defaultLocale = getUserLocale()
  })
  window.userLocale = locale
  window.defaultUserLocale = defaultLocale
  
  window.allLocales = []
  locales.keys().forEach(currentLocale => window.allLocales.push(currentLocale.replace('./', '').replace('.json', '')))

  return locale
}

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: getLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})