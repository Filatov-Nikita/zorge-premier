<template lang="pug"> .custom-modal(v-if="isOpened"): .wrapper(:class="{'hiding': !visible}")
  .top
    .icon-border(@click="close"): svg: use(xlink:href="/static/sprite.svg#close")
    .title(v-if="title")  {{ title }}
  slot
</template>

<script>
export default {
  props: ['title'],
  data: () => ({
    visible: false,
    isOpened: false
  }),
  methods: {
    open () {
      this.isOpened = true
      this.$nextTick(() => {
        this.visible = true
      })
    },
    close () {
      this.visible = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.isOpened = false
        }, 100)
        this.$emit('afterClose')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.wrapper
  width 100%
  z-index 100
  height 100vh
  overflow-x hidden
  max-width 1460px
  fixed right 0 top 0
  transform translateX(0)
  background-color #1f252f
  animation rightToLeft .5s
  @keyframes rightToLeft
    to
      transform translateX(0)
    from
      transform translateX(100%)
  &.hiding
    transform translateX(100%)
    transition transform .15s ease-in-out
.custom-modal
  size 100%
  z-index 1001
  overflow auto
  fixed right 0 top 0
  transform translateX(0)
  animation rightToLeft .5s
  @keyframes rightToLeft
    to
      transform translateX(0)
    from
      transform translateX(100%)
  img
    max-width 100%
.custom-modal-text
  color #fff
  padding 20px
  font-weight 300
  line-height 1.4
  font-size .95rem
.custom-modal-icon
  margin-bottom 10px
.custom-modal-icon-text
  color #f6ac6d
  font-weight 700
  font-size .6rem
  user-select none
  line-height .84375rem
  letter-spacing .1375rem
  text-transform uppercase
  font-family 'Heading Pro Wide'
.top
  display flex
  padding 0 20px
  size 100% 89px
  align-items center
.title
  margin 0
  color #fff
  line-height 1
  font-size 14px
  font-weight 700
  font-family 'Heading Pro Wide'
.icon-border
  size 41px
  margin-right 10px
  svg
    size 17px
</style>
