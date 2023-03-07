<template lang="pug"> div
  .shadow(:style="styleShadow")
  .menu(ref="menu")
    .icon-bg.icon-bg--close(@click="menu.close()"): svg: use(xlink:href="/static/sprite.svg#close")
    a.phone.comagic_phone(:href="`tel://${phone.href}`" @click="$VKGoal('contact')")
      .phone__number {{ phone.text }}
      .icon-bg: svg: use(xlink:href="/static/sprite.svg#phone")
    .first-menu: router-link(v-for="item in links" :key="item.to" :to="item.to" exact) {{ item.title }}
    .second-menu: router-link(v-for="item in subLinks" :key="item.to" :to="item.to" exact) {{ item.title }}
</template>

<script>
import MobileSwipeMenu from 'mobile-swipe-menu'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    menu: {},
    styleShadow: {
      visibility: 'hidden',
      transition: '',
      opacity: 0
    }
  }),
  computed: mapGetters({
    links: 'menu/links',
    phone: 'settings/phone',
    subLinks: 'menu/subLinks'
  }),
  mounted () {
    const self = this
    this.menu = new MobileSwipeMenu(this.$refs.menu, {
      width: innerWidth,
      enableBodyHook: true,
      events: {
        stop: function () {
          self.stop(this)
        },
        drag: this.drag,
        opening: this.opening,
        closing: this.closing
      }
    })
    this.$store.commit('menu/setMobileMenuContext', this.menu)
  },
  methods: {
    stop ({isOpened}) {
      if (isOpened) {
        this.opening()
      } else {
        this.closing()
      }
    },
    opening () {
      this.styleShadow.transition = 'opacity .15s ease-in-out'
      this.styleShadow.opacity = 1
    },
    closing () {
      this.styleShadow.transition = 'opacity .15s ease-in-out'
      this.styleShadow.opacity = 0
      setTimeout(() => {
        this.styleShadow.visibility = 'hidden'
      }, 200)
    },
    drag ({xCurrent, currentDirection}) {
      if (currentDirection !== 'left' && currentDirection !== 'right') {
        return false
      }
      if (xCurrent <= 0) {
        const onePercent = innerWidth / 100
        this.styleShadow.transition = ''
        this.styleShadow.visibility = 'visible'
        const opacity = Math.round((-xCurrent / onePercent)) / 100
        this.styleShadow.opacity = opacity > 1 ? 1 : opacity < 0 ? 0 : opacity
      } else {
        this.styleShadow.visibility = 'hidden'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.icon-bg
  size 41px
  svg
    max_size 17px
.shadow
  size 100%
  z-index 1001
  fixed top 0 left 0
  background rgba(0, 0, 0, .5)
  transition visibility .15s ease-in-out
.menu
  display flex
  flex-direction column
  z-index 1002!important
  justify-content center
  background #1f252f url('../assets/svg/menu-bg.svg') no-repeat top right/cover
.icon-bg--close
  absolute right 20px top 20px
  svg
    size 15px
.phone
  absolute right 20px bottom 20px
  &__number
    line-height 1
    font-size 14px
    font-weight 500
    margin-right 15px
    letter-spacing 2px
    font-family Heading Pro Wide
.first-menu, .second-menu
  padding 20px
.first-menu
  @media(max-height 600px)
    padding-bottom 4vh
  a
    display block
    color #f6ac6d
    line-height 1
    font-size 20px
    font-weight 700
    margin-bottom 20px
    width fit-content
    letter-spacing 2px
    text-transform uppercase
    font-family 'Heading Pro Wide'
    @media(max-height 585px)
      font-size 18px
      margin-bottom 18px
    &:last-child
      @media(max-height 600px)
        margin-bottom 3vh
.second-menu
  @media(max-height 600px)
    padding-top 4vh
  a
    color #fff
    display block
    line-height 1
    font-size 12px
    font-weight 500
    margin-top 15px
    width fit-content
    text-transform uppercase
    letter-spacing rem(1.2px)
    font-family 'Heading Pro Wide'
    @media(max-height 585px)
      margin-top 12px
    &:first-child
      @media(max-height 600px)
        margin-top 3vh
</style>
