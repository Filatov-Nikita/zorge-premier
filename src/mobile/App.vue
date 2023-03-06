<template lang="pug"> #app(:class="{'no-padding': noPadding}")
  //- .width-height-view(v-if="whv") {{ whv }}
  Header
  .main: router-view
  .footer
    a.footer__jsi(href="https://js-invest.ru/" target="_blank")
      svg: use(xlink:href="/static/sprite.svg#logo-jsi")
    .footer__desc © 1994-#{new Date().getFullYear()} ООО ГК «Жилстройинвест» <br>
      | Материалы сайта не являются публичной офертой. <br>
      .footer__private-police(@click="openPrivatePolice") Политика конфиденциальности
    .footer__bottom
      .footer__socs
        a.footer__soc(
          v-for="(href,key) in $store.getters['settings/socs']"
          :key="key"
          :href="href"
          target="_blank"
        ): svg: use(:xlink:href="`/static/sprite.svg#${key}`")
      a.yesidea(href="https://yes-idea.ru/" target="_blank")
        svg: use(xlink:href="/static/sprite.svg#yesidea")
  Menu
  .first-boot(v-if="firstBoot")
</template>

<script>
import Menu from './components/Menu'
import Header from './components/Header'
import {mapGetters} from 'vuex'
import Vue from 'vue'
export default {
  data: () => ({
    noPadding: false,
    firstBoot: true,
    whv: ''
  }),
  components: { Menu, Header },
  computed: mapGetters({
    mobileTopLogoBgHide: 'variables/mobileTopLogoBgHide',
    mobileMenuContext: 'menu/mobileMenuContext',
    privatePolice: 'agreePrivatePolice/privatePolice'
  }),
  mounted () {
    document.body.className = 'mobile-desktop'
    if (process.env.NODE_ENV === 'development') {
      this.whv = innerWidth + 'x' + innerHeight
      $(window).resize(() => {
        this.whv = innerWidth + 'x' + innerHeight
      })
    }
    const loaderHide = Vue.prototype.loaderHide
    Vue.prototype.loaderHide = () => {
      this.firstBoot = false
      this.mobileMenuContext.close()
      setTimeout(() => loaderHide(), 200)
    }
    $.fancybox.defaults.beforeShow = () => {
      this.mobileMenuContext.lock = true
    }
    $.fancybox.defaults.beforeClose = () => {
      this.mobileMenuContext.lock = false
    }
    $.fancybox.defaults.thumbs.autoStart = true
    $.fancybox.defaults.thumbs.axis = 'x'
  },
  methods: {
    openPrivatePolice () {
      $.fancybox.open(`<div class="container">${this.privatePolice}</div>`)
    }
  }
}
</script>

<style lang="stylus">
.fancybox-thumbs
  width auto
  left 0
  bottom 0
  top auto
  right  0
  height 95px
  box-sizing border-box
  padding 10px 10px 5px 10px
  background rgba(0, 0, 0, .3)
.fancybox-show-thumbs .fancybox-inner
  right 0
  bottom 95px
</style>
<style scoped lang="stylus">
.width-height-view
  color #000
  z-index 9999
  line-height 1
  background #fff
  fixed left 0 top 0
#app
  user-select none
  padding-top 90px
  &.no-padding
    padding-top 0
.footer
  z-index 1
  position relative
  padding 20px 20px 15px
  background-color #151b26
  &__private-police
    line-height 1
    margin-top 5px
    cursor pointer
    width fit-content
    font-size rem(12px)
    border-bottom 1px dashed
    color rgba(255, 255, 255, .7)
  &__jsi svg
    fill #fff
    size 204px 20px
    margin-bottom 10px
  &__desc
    color #b9b9b9
    font-size 11px
    line-height 1.2
    margin-bottom 12px
  &__bottom
    display flex
    align-items center
    justify-content space-between
  &__socs
    display flex
    align-items center
  &__soc
    margin-right 6px
    svg
      size 22px
      fill #b8babd
.yesidea
  svg
    fill #fff
    size 78px 24px
>>>
  .icon-border
    border-width 2px
  .second-title
    color #fff
    font-size 14px
    font-weight 400
    text-align center
    margin-bottom 15px
    line-height 20.58px
    text-transform uppercase
    font-family 'Heading Pro Wide'
  .event-button
    height 41px
    display flex
    margin 0 auto
    line-height 1
    color #1f252f
    cursor pointer
    font-weight 700
    padding 0 12px 0
    user-select none
    width fit-content
    align-items center
    border-radius 62px
    letter-spacing 1px
    font-size rem(10px)
    border 3px solid #f6ac6d
    text-transform uppercase
    background-color #f6ac6d
    font-family 'Heading Pro Wide'
    transition background-color .15s ease-in-out, color .15s ease-in-out
    &:hover
      color #fff
      text-decoration none
      background-color transparent
    svg
      fill #1F252F
      size 30px 9px
      margin-right 9px
      transition fill .15s ease-in-out
    &:hover svg
      fill #fff
  .smooth-scrollbar
    overflow visible!important
  .scrollbar-track-x
    top -35px
    height 1px
    bottom auto
  .scrollbar-thumb-x
    top -2px
    height 3px
</style>
