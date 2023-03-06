<template lang="pug">
  div(v-if="formShow" ref="modal" :class="className"): slot
</template>

<script>
export default {
  props: ['className', 'options'],
  data () {
    const self = this
    return {
      formShow: false,
      defaultOptions: {
        afterClose: () => {
          self.formShow = false
        }
      },
      fancybox: null
    }
  },
  mounted () {
    if (typeof this.options === 'object') {
      Object.keys(this.options).forEach(key => {
        if (typeof this.defaultOptions[key] === 'undefined') {
          this.defaultOptions[key] = this.options[key]
        } else {
          const copy = this.defaultOptions[key]
          this.defaultOptions[key] = () => {
            if (typeof copy === 'function') {
              copy()
            }
            if (typeof this.options[key] === 'function') {
              this.options[key]()
            }
          }
        }
      })
    }
  },
  methods: {
    open () {
      this.formShow = true
      this.$nextTick(() => {
        $.fancybox.open($(this.$refs.modal), this.defaultOptions)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
