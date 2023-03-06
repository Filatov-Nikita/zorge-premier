<template lang="pug">
router-link(v-if="to" :to="to" exact).proposed-page
  svg: use(:xlink:href="`/static/sprite.svg#${icon || 'arrow-horizontal-long'}`")
  slot
button(v-else).proposed-page
  svg: use(:xlink:href="`/static/sprite.svg#${icon || 'arrow-horizontal-long'}`")
  slot
</template>

<script>
export default {
  props: [ 'to', 'icon' ]
}
</script>

<style scoped lang="stylus">
.proposed-page
  z-index 5
  display flex
  line-height 1
  color #1f252f
  cursor pointer
  font-weight 700
  user-select none
  margin-left auto
  width fit-content
  position relative
  align-items center
  border-radius 62px
  margin-bottom 90px
  font-size rem(12px)
  padding 11px 12px 10px
  border 3px solid #f6ac6d
  text-transform uppercase
  background-color #f6ac6d
  letter-spacing rem(2.64px)
  font-family 'Heading Pro Wide'
  transition background-color .15s ease-in-out, color .15s ease-in-out
  +below(1290px)
    font-size rem(11px)
    padding 9px 10px 8px
    letter-spacing rem(1px)
  &:hover
    color #fff
    text-decoration none
    background-color transparent
  svg
    fill #1F252F
    size 43px 18px
    margin-right 15px
    transition fill .15s ease-in-out
  &:hover svg
    fill #fff
</style>
