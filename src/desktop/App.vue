<template lang="pug"> #app
  //- .width-height-view(v-if="whv") {{ whv }}
  .first-boot(v-if="firstBoot")
  .header: top-buttons(v-if="topButtonsShow")
  .main: router-view
  .back.icon-border(v-if="!emptyHistory" @click="$router.back()" style="z-index: 100")
    svg: use(xlink:href="/static/sprite.svg#arrow-back")
  .bottom-right-panel
    button(
      v-if="!menuShow && !phoneHidden"
      type="button"
      @click="$refs.modal.open()"
      style="margin-bottom: 30px; display: block; background: transparent; outline: 0; border: 0; padding: 0; margin-left: auto"
    )
      img(src="@/assets/svg/callme.svg")
    a.phone.comagic_phone(
      v-if="!menuShow && !phoneHidden"
      :href="`tel://${phone.href}`"
      @mouseover="$store.commit('variables/phoneShow', true)"
      @mouseleave="$store.commit('variables/phoneShow', false)"
      :class="{'phone--black-mode': phoneBlackMode}"
    )
      transition(name="fade-025"): .phone__number(
        v-if="phoneShow && phoneTextVisible"
        :class="{'phone__number--black-mode': phoneBlackMode}"
      ) {{ phone.text }}
      .icon-bg
        svg: use(xlink:href="/static/sprite.svg#phone")
  Footer(v-if="footerShow")
  ModalCallback(ref="modal" theme="Заказать обратный звонок")
  transition(name="fade-025"): .hidden-menu(v-if="menuShow")
    .top-right-panel
      .icon-bg.icon-bg--close(@click="toggleMenu"): svg: use(xlink:href="/static/sprite.svg#close")
      a.phone.comagic_phone(
        :href="`tel://${phone.href}`"
        @mouseover="$store.commit('variables/phoneShow', true)"
        @mouseleave="$store.commit('variables/phoneShow', false)"
      )
        .phone__number {{ phone.text }}
        .icon-bg: svg: use(xlink:href="/static/sprite.svg#phone")
      button(
        type="button"
        @click="$refs.modal.open()"
        style="margin-top: 10px; display: block; background: transparent; outline: 0; border: 0; padding: 0; margin-left: auto"
      )
        img(src="@/assets/svg/callme.svg")
    .ellipses
      svg.ellipse.ellipse-1(xmlns="http://www.w3.org/2000/svg" width="1016" height="1016" viewBox="0 0 1016 1016")
        clipPath#yjkqa(xmlns="http://www.w3.org/2000/svg"): path(fill="#fff" d="M1016 508c0 280.561-227.439 508-508 508C227.439 1016 0 788.561 0 508 0 227.439 227.439 0 508 0c280.561 0 508 227.439 508 508z")
        path(fill="none" stroke-width="4" stroke-miterlimit="20" d="M1016 508c0 280.561-227.439 508-508 508C227.439 1016 0 788.561 0 508 0 227.439 227.439 0 508 0c280.561 0 508 227.439 508 508z" clip-path="url(#yjkqa)")
      svg.ellipse.ellipse-2(width="1108" height="766" viewBox="0 0 1108 766" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(d="M1107 0C1107 611.379 611.379 1107 0 1107" stroke="url(#paint0_linear)" stroke-opacity="0.3" stroke-width="2")
        defs: linearGradient#paint0_linear(x1="0" y1="-1107" x2="0" y2="1107" gradientUnits="userSpaceOnUse")
          stop(stop-color="#F6AC6D")
          stop(offset="1" stop-color="#764419")
      svg.ellipse.ellipse-3(xmlns="http://www.w3.org/2000/svg" width="522" height="522" viewBox="0 0 522 522")
        clipPath#udina: path(fill="#fff" d="M522 261c0 144.146-116.854 261-261 261C116.854 522 0 405.146 0 261 0 116.854 116.854 0 261 0c144.146 0 261 116.854 261 261z")
        path(fill="none" stroke-miterlimit="20" stroke-width="4" d="M522 261c0 144.146-116.854 261-261 261C116.854 522 0 405.146 0 261 0 116.854 116.854 0 261 0c144.146 0 261 116.854 261 261z" clip-path="url(#udina)")
      svg.ellipse.ellipse-4(xmlns="http://www.w3.org/2000/svg" width="659" height="659" viewBox="0 0 659 659")
        clipPath#ix7qa: path(fill="#fff" d="M659 329.5C659 511.478 511.478 659 329.5 659S0 511.478 0 329.5 147.522 0 329.5 0 659 147.522 659 329.5z")
        path(fill="none" stroke-miterlimit="20" stroke-width="4" d="M659 329.5C659 511.478 511.478 659 329.5 659S0 511.478 0 329.5 147.522 0 329.5 0 659 147.522 659 329.5z" clip-path="url(#ix7qa)")
    .container.h-100: .hidden-menu__wrapper
      .first-menu: router-link(v-for="item in menu" :key="item.to" :to="item.to" exact) {{ item.title }}
      .second-menu: router-link(v-for="item in subMenu" :key="item.to" :to="item.to" exact) {{ item.title }}
</template>

<script>
import Vue from 'vue'
import Footer from './components/Footer'
import { mapGetters, mapActions } from 'vuex'
import TopButtons from './components/TopButtons'
import ModalCallback from './components/ModalCallback.vue'

export default {
  components: { Footer, TopButtons, ModalCallback },
  data: () => ({
    firstBoot: true,
    emptyHistory: true,
    whv: ''
  }),
  computed: {
    ...mapGetters({
      menu: 'menu/links',
      phone: 'settings/phone',
      subMenu: 'menu/subLinks',
      menuShow: 'variables/menuShow',
      phoneShow: 'variables/phoneShow',
      footerShow: 'variables/footerShow',
      phoneHidden: 'variables/phoneHidden',
      phoneBlackMode: 'variables/phoneBlackMode',
      topButtonsShow: 'variables/topButtonsShow',
      phoneTextVisible: 'variables/phoneTextVisible'
    })
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      this.whv = innerWidth + 'x' + innerHeight
      $(window).resize(() => {
        this.whv = innerWidth + 'x' + innerHeight
      })
    }
    document.body.className = 'body-desktop'
    const loaderHide = Vue.prototype.loaderHide
    Vue.prototype.loaderHide = () => {
      if (!this.firstBoot) {
        this.emptyHistory = false
      }
      this.firstBoot = false
      this.$store.commit('variables/menuShow', false)
      setTimeout(() => loaderHide(), 200)
    }
  },
  methods: mapActions({toggleMenu: 'variables/toggleMenu'})
}
</script>

<style scoped lang="stylus">
@import 'assets/styles.styl'
</style>
