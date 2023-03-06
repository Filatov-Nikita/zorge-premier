<template lang="pug"> .footer(
    :class="{'footer--static':static, 'footer--index-102':yesideaIndex102, 'footer--bg':bg}"
  )
  .container: .position-relative: .footer__container
    div
      .footer__desc © 1994-#{new Date().getFullYear()} ООО ГК «Жилстройинвест» <br>
        | Материалы сайта не являются публичной офертой. <br>
        .footer__private-police(@click="openPrivatePolice") Политика конфиденциальности
      a.footer__jsi(href="https://js-invest.ru/" target="_blank"): svg: use(xlink:href="/static/sprite.svg#logo-jsi")
    .footer__socs
      a.footer__soc(
        v-for="(href,key) in socs"
        :key="key"
        :href="href"
        target="_blank"
      ): svg: use(:xlink:href="`/static/sprite.svg#${key}`")
    a.yesidea(href="https://yes-idea.ru/" target="_blank" v-if="yesidea !== false")
      | сделано в
      svg: use(xlink:href="/static/sprite.svg#yesidea")
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: [ 'static' ],
  computed: mapGetters({
    yesideaIndex102: 'variables/yesideaIndex102',
    yesidea: 'variables/yesidea',
    bg: 'variables/footerBg',
    socs: 'settings/socs',
    privatePolice: 'agreePrivatePolice/privatePolice'
  }),
  methods: {
    openPrivatePolice () {
      $.fancybox.open(`<div class="container">${this.privatePolice}</div>`)
    }
  }
}
</script>

<style scoped lang="stylus">
.container
  +below(1800px)
    max-width 100%
    padding 0 35px
.footer
  width 100%
  z-index 99
  padding 20px 0
  user-select none
  fixed bottom 0 left 0
  +below(1800px)
    padding 20px 0 15px
  &__private-police
    line-height 1
    margin-top 5px
    cursor pointer
    width fit-content
    font-size rem(12px)
    border-bottom 1px dashed
    color rgba(255, 255, 255, .7)
  &--index-102
    z-index 10
  &--static
    position relative
  &--bg
    z-index 97
    background-color #151b26
  &__container
    display flex
    width fit-content
    align-items center
    +below(1800px)
      align-items flex-start
  &__desc
    line-height 1
    margin-right 45px
    font-size rem(14px)
    color rgba(255, 255, 255, .7)
    +below(1800px)
      margin-bottom 5px
  &__socs
    display flex
  &__soc
    font-size 0
    display block
    svg
      size 22px
      z-index 2
      fill rgba(255, 255, 255, .7)
      transition fill .15s ease-in-out
  &__soc:hover svg
    fill #fff
  &__soc + &__soc
    margin-left 6px
  &__jsi
    position absolute
    top calc(50% - 10px)
    right calc(100% + 45px)
    +below(1800px)
      position static
    svg
      fill #fff
      size 220px 20px
.yesidea
  color #fff
  display flex
  line-height .5
  white-space nowrap
  font-size rem(14px)
  align-items flex-end
  absolute bottom 0 left 100%
  +below(1800px)
    right 0
    left auto
    bottom 50%
    transform translateY(30%)
  &:hover
    color #fff
    text-decoration none
  svg
    fill #fff
    size 77px 24px
    margin-left 5px
</style>
