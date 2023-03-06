<template lang="pug">
.back-to(ref="parent")
  .icon-border(@click="$router.back()"  v-if="!removeBack")
    svg: use(xlink:href="/static/sprite.svg#arrow-back")
  component.event-button(exact
    v-if="!buttonDisable"
    :is="to ? 'router-link' : 'div'"
    :to="to"
    @click="$emit('click')"
  )
    svg.icon(v-if="icon" :class="icon"): use(:xlink:href="`/static/sprite.svg#${icon}`")
    .w-100.text-center: slot
</template>

<script>
export default {
  props: ['to', 'icon', 'buttonDisable', 'removeBack']
}
</script>

<style scoped lang="stylus">
.back-to
  z-index 5
  width 100%
  bottom 20px
  display flex
  padding 0 20px
  position sticky
.event-button
  width 100%
  flex-grow 1
  letter-spacing 0
  text-align center
  padding 9px 15px 8px
  +below(355px)
    padding 9px 5px 8px
  &:hover
    color #1f252f
    background-color #f6ac6d
    svg
      fill #1F252F
.icon-border
  size 41px
  min_size 41px
  flex-basis 41px
  margin-right 10px
  background-color #151b26
  +below(355px)
    margin-right 5px
  svg
    size 22px 21px
.icon
  fill #1F252F
  &.filter
    size 24px 18px
    min_size 24px 18px
  &.parking
    size 24px
  &.play
    size 24px 18px
    min_size 24px 18px
  &.arrow-horizontal-small
    size 29px 16px
    min_size 29px 16px
</style>
