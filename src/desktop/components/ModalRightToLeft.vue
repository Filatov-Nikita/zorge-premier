<template lang="pug"> .popup-modal(v-if="isOpened")
  .shadow(@click="close" :class="{'hiding': !visible}")
  .wrapper(:class="{'hiding': !visible}"): smooth-scrollbar: .content
    .top
      .title {{ title }}
    .body: slot
  .close-btn.icon-border(@click="close")
    svg: use(xlink:href="/static/sprite.svg#arrow-back")
</template>

<script>
export default {
  props: ['title', 'className'],
  data: () => ({
    visible: false,
    isOpened: false
  }),
  methods: {
    open () {
      document.body.style.overflow = 'hidden';
      this.isOpened = true
      this.$nextTick(() => {
        this.visible = true
      })
    },
    close () {
      document.body.style.overflow = 'auto';
      this.visible = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.isOpened = false
        }, 100)
        this.$emit('afterClose')
      })
    }
  },
  watch: {
    isOpened(value) {
      if(value === false) this.$emit('close');
    }
  }
}
</script>

<style scoped lang="stylus">
.title
  color #fff
  width 100%
  line-height 1
  font-weight 700
  text-align left
  max-width 1230px
  font-size rem(20px)
  text-transform uppercase
  letter-spacing rem(4.4px)
  font-family 'Heading Pro Wide'
.top
  display flex
  align-items center
  padding-bottom 25px
.body
  flex-basis 100%
.shadow
  size 100%
  opacity 1
  z-index 99
  animation fadeIn .5s
  fixed left 0 top 0
  background-color rgba(21, 28, 39, .79)
  @keyframes fadeIn
    from
      opacity 0
    to
      opacity 1
  &.hiding
    opacity 0
    transition opacity .15s ease-in-out
.wrapper
  size 100%
  z-index 100
  display flex
  max-width 1460px
  fixed right 0 top 0
  flex-direction column
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
.content
  padding 25px
.close-btn
  z-index 101
  fixed left 35px bottom 55px
  +below(1800px)
    bottom 85px
</style>
