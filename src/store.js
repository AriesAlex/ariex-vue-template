export default {
  data() {
    return {
      isFull: true,
    }
  },
  created() {
    this._resize()
  },
  methods: {
    _resize() {
      this.isFull = window.innerWidth > 700
     }
  },
  computed: {
    isDev() { return process.env.NODE_ENV == 'development' },
  },
}