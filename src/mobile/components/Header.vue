<template lang="pug"> .header(:class="{'header--bg-hidden': mobileTopLogoBgHide}")
  router-link.logo(:class="{'logo--hidden': mobileTopLogoBgHide}" to="/" exact)
    img(src="./../../assets/svg/logo.svg")
  .d-flex.align-items-center
    router-link.select.icon-border(to="/select" exact): svg: use(xlink:href="/static/sprite.svg#key")
    .hamburger.icon-border(@click="openMenu"): svg: use(xlink:href="/static/sprite.svg#hamburger")
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    mobileMenuContext: 'menu/mobileMenuContext',
    mobileTopLogoBgHide: 'variables/mobileTopLogoBgHide'
  }),
  methods: {
    openMenu () {
      this.mobileMenuContext.open()
    }
  }
}
</script>

<style scoped lang="stylus">
.header
  width 100%
  display flex
  padding 20px
  z-index 1000
  fixed top 0 left 0
  align-items center
  background-color #1f252f
  justify-content space-between
  transition background-color .15s ease-in-out
  &--bg-hidden
    background-color rgba(31, 37, 47, 0)
.logo
  display flex
  size 183px 49px
  margin-right 15px
  align-items center
  transition opacity .15s ease-in-out
  &--hidden
    opacity 0
  img
    width 100%
.hamburger, .select
  margin 0
  size 36px
  background none
  border-width 2px
  svg
    fill #fff
    max_size 18px
.select
  margin-right 8px
</style>
