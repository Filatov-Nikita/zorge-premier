<template lang="pug"> .home
  .curtains
    .curtains-content
      .curtains-text Клубные дома у леса
      img.curtains-logo(alt src="@/assets/images/logo-circle.png")
      svg.curtains-premiere: use(xlink:href="/static/sprite.svg#text-premiere")
    .curtains-arrow-bottom(@click="scrollToAboutSection"): svg: use(xlink:href="/static/sprite.svg#arrow-bottom")
  .about(ref="about")
    .about-image
      .main-title(style="margin-top:0;padding-top:50px;") О проекте
        .main-title__circle-1
    .about-collage-1
      .about-collage-1__image
      .second-title {{ $store.getters['about/block1'].title }}
      .about-content(v-html="$store.getters['about/block1'].desc") {{ $store.getters['about/block1'].desc }}
    .about-collage-2.about-item
      .about-collage-2__image
      .second-title {{ $store.getters['about/block2'].title }}
      .about-content(v-html="$store.getters['about/block2'].desc") {{ $store.getters['about/block2'].desc }}
      router-link(
        v-if="$store.getters['about/block2'].button.text"
        :to="$store.getters['about/block2'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block2'].button.text }}
    .about-collage-3.about-item
      .about-collage-3__image
      .second-title {{ $store.getters['about/block3'].title }}
      .about-content(v-html="$store.getters['about/block3'].desc") {{ $store.getters['about/block3'].desc }}
      router-link(
        v-if="$store.getters['about/block3'].button.text"
        :to="$store.getters['about/block3'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block3'].button.text }}
    .about-collage-5.about-item
      .about-collage-5__image
      .second-title {{ $store.getters['about/block5'].title }}
      .about-content(v-html="$store.getters['about/block5'].desc") {{ $store.getters['about/block5'].desc }}
      router-link(
        v-if="$store.getters['about/block5'].button.text"
        :to="$store.getters['about/block5'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block5'].button.text }}
    .about-full-bg.about-full-bg-1
    .about-collage-4.about-item
      .about-collage-4__image
      .second-title {{ $store.getters['about/block4'].title }}
      .about-content(v-html="$store.getters['about/block4'].desc") {{ $store.getters['about/block4'].desc }}
      router-link(
        v-if="$store.getters['about/block4'].button.text"
        :to="$store.getters['about/block4'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block4'].button.text }}
    .about-collage-6.about-item
      .about-collage-6__image
      .second-title {{ $store.getters['about/block6'].title }}
      .about-content(v-html="$store.getters['about/block6'].desc") {{ $store.getters['about/block6'].desc }}
      .event-button(v-if="$store.getters['about/block6'].button.text" @click="$refs.modalClosedTerritory.open()")
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block6'].button.text }}
    .about-collage-7.about-item
      .about-collage-7__image
      .second-title {{ $store.getters['about/block7'].title }}
      .about-content(v-html="$store.getters['about/block7'].desc") {{ $store.getters['about/block7'].desc }}
      router-link(
        v-if="$store.getters['about/block7'].button.text"
        :to="$store.getters['about/block7'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block7'].button.text }}
    .about-full-bg.about-full-bg-2
    .about-collage-8.about-item
      .about-collage-8__image
      .second-title {{ $store.getters['about/block8'].title }}
      .about-content(v-html="$store.getters['about/block8'].desc") {{ $store.getters['about/block8'].desc }}
    .about-collage-9.about-item
      .about-collage-9__image
      .second-title {{ $store.getters['about/block9'].title }}
      .about-content(v-html="$store.getters['about/block9'].desc") {{ $store.getters['about/block9'].desc }}
      router-link(
        v-if="$store.getters['about/block9'].button.text"
        :to="$store.getters['about/block9'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block9'].button.text }}
    .about-collage-12.about-item
      .about-collage-12__image
      .second-title {{ $store.getters['about/block10'].title }}
      .about-content(v-html="$store.getters['about/block10'].desc") {{ $store.getters['about/block10'].desc }}
      router-link(
        v-if="$store.getters['about/block10'].button.text"
        :to="$store.getters['about/block10'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block10'].button.text }}
    .about-collage-11.about-item
      .about-collage-11__image
      .second-title {{ $store.getters['about/block11'].title }}
      .about-content(v-html="$store.getters['about/block11'].desc") {{ $store.getters['about/block11'].desc }}
      router-link(
        v-if="$store.getters['about/block11'].button.text"
        :to="$store.getters['about/block11'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block11'].button.text }}
    .about-collage-10.about-item
      .about-collage-10__image
      .second-title {{ $store.getters['about/block12'].title }}
      .about-content(v-html="$store.getters['about/block12'].desc") {{ $store.getters['about/block12'].desc }}
      router-link(
        :to="$store.getters['about/block12'].button.link"
        exact
      ).event-button
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | {{ $store.getters['about/block12'].button.text }}
  modal-right-to-left(title="Закрытая территория" ref="modalClosedTerritory")
    img(alt src="../assets/images/modal-closed-territory.jpg")
    .custom-modal-text
      p Закрытая территория, спокойные прогулки с детьми, тишина и приватность – всё это ZORGE PREMIERE гарантирует своим жителям приватность и безопасность.
      p Изолированный внутренний двор на высоте второго этажа, спокойные прогулки с детьми, тишина, современные системы видеонаблюдения на всей территории комплекса обеспечивают неприкосновенность вашей личной жизни.
      .row
        .col-6.text-center
          img.custom-modal-icon(alt src="../../desktop/assets/images/icon-camera.svg")
          .custom-modal-icon-text Видео-<br>наблюдение
        .col-6.text-center
          img.custom-modal-icon(alt src="../../desktop/assets/images/icon-password.svg")
          .custom-modal-icon-text Вход по чип-<br>карте
</template>

<script>
import ModalRightToLeft from '../components/ModalRightToLeft'
export default {
  components: {ModalRightToLeft},
  mounted () {
    setTimeout(() => {
      this.loaderHide()
    }, 200)
    this.$parent.noPadding = true
    addEventListener('scroll', this.scroll)
    this.scroll()
  },
  beforeDestroy () {
    this.$parent.noPadding = false
    removeEventListener('scroll', this.scroll)
    this.$store.commit('variables/setMobileTopLogoBgHide', false)
  },
  methods: {
    scroll () {
      if (scrollY >= this.$refs.about.offsetTop) {
        this.$store.commit('variables/setMobileTopLogoBgHide', false)
      } else {
        this.$store.commit('variables/setMobileTopLogoBgHide', true)
      }
    },
    scrollToAboutSection () {
      window.scroll({ top: this.$refs.about.offsetTop, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped lang="stylus">
.about
  width 100%
.about-image
  size 100% 480px
  position relative
  background #1f252f url('../assets/images/main-bg-about.jpg') no-repeat center bottom/cover
  &:after
    content ''
    opacity .95
    size 100% 154px
    absolute left 0 bottom 0
    background-image linear-gradient(0deg, #181f29 0%, rgba(31, 37, 47, 0) 100%)
.curtains
  display flex
  height 100vh
  align-items center
  justify-content center
  background url('../assets/images/main-bg-curtains.jpg') no-repeat center/cover
  @media(max-height 620px)
    padding-bottom 60px
  @media(max-height 550px)
    padding-top 85px
    padding-bottom 0
    align-items flex-start
.curtains-content
  text-align center
  padding-bottom 30px
.curtains-logo
  size 192px
  display block
  margin 0 auto
  margin-bottom 35px
.curtains-premiere
  fill #fff
  size 214px 21px
.curtains-text
  color #fff
  line-height 1
  font-size 15px
  font-weight 700
  margin-bottom 85px
  letter-spacing 1.43px
  text-transform uppercase
  font-family 'Heading Pro Wide'
  @media(max-height 620px)
    margin-bottom 10vh
  @media(max-height 520px)
    margin-bottom 8vh
.curtains-arrow-bottom
  size 60px
  display flex
  margin-left -30px
  align-items center
  border-radius 60px
  justify-content center
  absolute left 50% bottom 20px
  border 1px solid rgba(246, 172, 109, .5)
  @media(max-height 520px)
    size 48px
    margin-left -24px
  svg
    fill #f6ac6d
    size 17px 33px
    @media(max-height 520px)
      size 12px 26px
.main-title
  color #f6ac6d
  font-size 23px
  font-weight 700
  margin-top -65px
  text-align center
  position relative
  padding 30px 0 330px
  letter-spacing 2.19px
  text-transform uppercase
  font-family 'Heading Pro Wide'
  &__circle-1
    margin-right -45px
    size 233px 278px
    absolute right 50% top 20px
    background url('../assets/images/main-about-top-line.png') no-repeat center/223px 278px
.about-content
  color #b9b9b9
  font-size 12px
  text-align center
.about-item
  position relative
  padding 310px 20px 30px
.about-full-bg
  height 290px
  background no-repeat center/cover
.about-full-bg-1
  background-image url('../assets/images/about-full-bg-1.jpg')
.about-full-bg-2
  background-image url('../assets/images/about-full-bg-2.jpg')
.about-collage-1
  padding 0 20px
  position relative
  &__image
    height 300px
    margin 0 -20px
    background url('../assets/images/about-collage-1.png') no-repeat center top/374px 715px
.about-collage-2
  &__image
    size 280px
    z-index -1
    absolute left 50% top 0
    transform translateX(-50%)
    border-radius: 50%
    background url('../assets/images/about-collage-2.jpg') no-repeat center top/375px 629px
    background-size: cover;
.about-collage-3
  &__image
    size 280px
    z-index -1
    absolute left 50% top 0
    transform translateX(-50%)
    border-radius: 50%
    background url('../assets/images/about-collage-3.jpg') no-repeat center top/376px 482px
    background-size: cover;
.about-collage-4
  &__image
    size 280px
    border-radius: 50%
    z-index -1
    absolute left 50% top 10px
    transform: translateX(-50%)
    background url('../assets/images/about-collage-4.jpg') no-repeat center/cover
.about-collage-5
  margin-top 30px
  &__image
    size 100%
    z-index -1
    absolute left 0 top 0
    background url('../assets/images/about-collage-5.png') no-repeat center top/374px 482px
.about-collage-6
  &__image
    size 280px
    z-index -1
    absolute left 50% top 0
    transform translateX(-50%)
    border-radius: 50%
    background url('../assets/images/about-collage-6.png') no-repeat center top/374px 294px
    background-size: cover;
.about-collage-7
  &__image
    size 280px
    z-index -1
    absolute left 50% top 0
    transform translateX(-50%)
    border-radius: 50%
    background url('../assets/images/about-collage-7-1.png') no-repeat center top/374px 620px
    background-size: cover;
.about-collage-8
  padding-top 330px
  &__image
    size 100%
    z-index -1
    absolute left 0 top 0
    background url('../assets/images/about-collage-8.png') no-repeat center top -105px/375px 610px
.about-collage-9
  &__image
    size 100%
    z-index -1
    absolute left 0 top 0
    background url('../assets/images/about-collage-9.png') no-repeat center top/375px 294px
.about-collage-10
  padding-top 320px
  &__image
    size 280px
    z-index -1
    absolute left 0 top 0
    absolute left 50% top 0
    transform translateX(-50%)
    border-radius: 50%
    background url('../assets/images/about-collage-10.jpg') no-repeat
    background-position-x: -70px
    background-position-y: 0px
    background-size: cover;
.about-collage-12
  padding-top 310px
  &__image
    size 100%
    z-index -1
    absolute left 0 top 0
    background url('../assets/images/about-collage-12.png') no-repeat center top/294px
.about-collage-11
  &__image
    size 100%
    z-index -1
    absolute left 0 top 0
    background url('../assets/images/about-collage-11.png') no-repeat center top/375px 582px
</style>
