<template lang="pug">
  .next-section(@click="click"): svg: use(xlink:href="/static/sprite.svg#arrow-very-long")
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="stylus">
.next-section
  z-index 103
  cursor pointer
  margin-left -17px
  absolute left 50% bottom 25px
  svg
    fill #f6ac6d
    size 18px 35px
    transition fill .15s ease-in-out
    animation .5s infinite alternate next-section
  &:hover svg
    fill #fff
  @keyframes next-section
    from
      transform translateY(0)
    to
      transform translateY(5px)
</style>
