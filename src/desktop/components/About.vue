<template lang="pug"> .about
  ScrollPage(:title="title" ref="scrollbar")
    proposed-page(to="/select") Выбор квартир
    .container
      .row.mb-5.align-items-center
        .col-md-7
          .long-title {{ $store.getters['about/block1'].title }}
          div(v-html="$store.getters['about/block1'].desc") {{ $store.getters['about/block1'].desc }}
        .col-md-5: .about-picture-1.about-picture: .sizer
      .row.mb-5.align-items-center
        .col-md-5: .about-picture-2.about-picture: .sizer
          .line-1
          .line-2
        .col-md-7
          .long-title {{ $store.getters['about/block2'].title }}
          div(v-html="$store.getters['about/block2'].desc") {{ $store.getters['about/block2'].desc }}
          router-link.link(
            v-if="$store.getters['about/block2'].button.text"
            :to="$store.getters['about/block2'].button.link"
            exact
          )
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block2'].button.text }}
      .row.mb-5.align-items-center
        .col-md-7
          .long-title {{ $store.getters['about/block3'].title }}
          div(v-html="$store.getters['about/block3'].desc") {{ $store.getters['about/block3'].desc }}
          router-link.link(
            v-if="$store.getters['about/block3'].button.text"
            :to="$store.getters['about/block3'].button.link"
            exact
          )
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block3'].button.text }}
        .col-md-5: .about-picture-4.about-picture
          .sizer
          .line

      .row.mb-5.align-items-center
        .col-md-5: .about-picture-8.about-picture: .sizer
          .line-1
          .line-2
        .col-md-7
          .long-title {{ $store.getters['about/block5'].title }}
          div(v-html="$store.getters['about/block5'].desc") {{ $store.getters['about/block5'].desc }}
          router-link.link(:to="$store.getters['about/block5'].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block5'].button.text }}
    .about-bg-full-1.mb-5
    .container
      .row.mb-5.align-items-center
        .col-md-7
          .long-title {{ $store.getters['about/block4'].title }}
          div(v-html="$store.getters['about/block4'].desc") {{ $store.getters['about/block4'].desc }}
          router-link.link(:to="$store.getters['about/block4'].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block4'].button.text }}
        .col-md-5: .about-picture-5.about-picture: .sizer
      .row.mb-5.align-items-center
        .col-md-5: .about-picture-10.about-picture: .sizer
        .col-md-7
          .long-title {{ $store.getters['about/block6'].title }}
          div(v-html="$store.getters['about/block6'].desc") {{ $store.getters['about/block6'].desc }}
          .link(@click="$refs.modalClosedTerritory.open()")
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block6'].button.text }}
      .row.mb-5.align-items-center
        .col-md-7
          .long-title {{ $store.getters['about/block7'].title }}
          div(v-html="$store.getters['about/block7'].desc") {{ $store.getters['about/block7'].desc }}
          router-link.link(:to="$store.getters['about/block7'].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block7'].button.text }}
        .col-md-5: .about-picture-11.about-picture: .sizer
          .line-1
          .line-2
    .about-bg-full-2.mb-5
    .container
      .row.mb-5.align-items-center
        .col-md-5: .about-picture-12.about-picture: .sizer
          .line-1
        .col-md-7
          .long-title {{ $store.getters['about/block8'].title }}
          div(v-html="$store.getters['about/block8'].desc") {{ $store.getters['about/block8'].desc }}
      .row.mb-5.align-items-center
        .col-md-7
          .long-title {{ $store.getters['about/block9'].title }}
          div(v-html="$store.getters['about/block9'].desc") {{ $store.getters['about/block9'].desc }}
          router-link.link(:to="$store.getters['about/block9'].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block9'].button.text }}
        .col-md-5: .about-picture-13.about-picture: .sizer
      .row.mb-5.align-items-center
        .col-md-5: .about-picture-16.about-picture: .sizer
          .line-1
        .col-md-7
          .long-title {{ $store.getters['about/block10'].title }}
          div(v-html="$store.getters['about/block10'].desc") {{ $store.getters['about/block10'].desc }}
          router-link.link(:to="$store.getters['about/block10'].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block10'].button.text }}
      .row.mb-5.align-items-center
        .col-md-7
          .long-title {{ $store.getters['about/block11'].title }}
          div(v-html="$store.getters['about/block11'].desc") {{ $store.getters['about/block11'].desc }}
          router-link.link(:to="$store.getters['about/block11'].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block11'].button.text }}
        .col-md-5: .about-picture-15.about-picture: .sizer
      .row.mb-5.align-items-center
        .col-md-5: .about-picture-14.about-picture: .sizer
          .line-1
        .col-md-7
          .long-title {{ $store.getters['about/block12'].title }}
          div(v-html="$store.getters['about/block12'].desc") {{ $store.getters['about/block12'].desc }}
          router-link.link(:to="$store.getters['about/block12'].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ $store.getters['about/block12'].button.text }}
  ModalRightToLeft(title="Закрытая территория" ref="modalClosedTerritory")
    .modal-wrapper
      img(alt src="../assets/images/bg-modal-closed-territory-2.jpg")
      .modal-container: .row
        .col-md-6
          p Полностью замкнутая, изолированная от посторонних территория «Зорге.Премьер» оснащена камерами наблюдения, имеет собственный пункт охраны с мгновенным реагированием и обеспечивает беспрекословный порядок в комплексе.
          p Расположение детских, спортивных и прогулочных пространств во внутреннем дворе также позволит вам не беспокоиться о безопасности детей во время игр и прогулок.
        .col-md-5.offset-1: .row
          .col-md-6.text-center
            img.modal-icon(alt src="../assets/images/icon-camera.svg")
            .modal-icon-text Видео-<br>наблюдение
          .col-md-6.text-center
            img.modal-icon(alt src="../assets/images/icon-password.svg")
            .modal-icon-text Вход по чип-<br>карте
</template>

<script>
import ScrollPage from './ScrollPage'
import ModalRightToLeft from './ModalRightToLeft'
import ProposedPage from '../components/ProposedPage'
export default {
  components: { ScrollPage, ModalRightToLeft, ProposedPage },
  data: () => ({
    title: 'О проекте'
  }),
  computed: {
    scrollbar () {
      return this.$refs.scrollbar.$refs.scrollbar.scrollbar
    }
  },
  mounted () {
    this.$store.commit('variables/phoneTextVisible', false)
    document.title = this.title + ' | ' + document.title
  },
  beforeDestroy () {
    this.$store.commit('variables/phoneTextVisible', true)
  }
}
</script>

<style scoped lang="stylus">
.proposed-page
  right 145px
  top calc(100vh - 105px)
  position absolute!important
  padding 14px 12px 12px!important
.about-picture-1
  z-index 1
  size 484px 459px
  margin-left 40px
  margin-top -40px
  position relative
  background url('./../assets/images/about-picture-1.png') no-repeat center/cover
.about-picture-2
  size 522px
  position relative
  margin-left -40px
  .line-1
    size calc(100% - 20px)
    z-index 1
    absolute left 0 top 0
    border-radius: 50%
    background url('./../assets/images/about-picture-2.jpg') no-repeat center/cover
  .line-2
    size 488px
    content ''
    absolute right 50% top 100%
    background url('./../assets/images/about-picture-5.png') no-repeat center/cover
  &:before
    size 688px
    content ''
    absolute left 100% bottom 50%
    background url('./../assets/images/about-picture-5.png') no-repeat center/cover
  &:after
    content ''
    size 387px
    absolute left -260px bottom -114px
    background url('./../assets/images/about-picture-3.png') no-repeat center/cover
.about-picture-4
  size 522px
  margin-left 40px
  position relative
  .line
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    border-radius: 50%
    background url('/static/gallery/architecture/render-8.jpg') no-repeat center/cover
  &:before
    content ''
    size 1108px
    absolute right 50% top 100%
    background url('./../assets/images/about-picture-7.png') no-repeat center/cover
  &:after
    content ''
    size 659px
    absolute top 105px left 320px
    background url('./../assets/images/about-picture-3.png') no-repeat center/cover
.about-picture-5
  size 522px
  margin-left 40px
  border-radius: 50%
  background url('./../assets/images/about-picture-6.jpg') no-repeat center/cover
.about-bg-full-1
  z-index 1
  size 100% 628px
  position relative
  background url('/static/gallery/architecture/render-2(2).jpg') no-repeat center/cover
  &:before
    content ''
    size 215px
    margin -107px 0 0 -107px
    absolute left 0 top 100%
    background url('./../assets/images/about-picture-3.png') no-repeat center/cover
.about-picture-8
  size 522px
  margin-left -40px
  position relative
  &:after
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/about-picture-8.png') no-repeat center/cover
  &:before
    content ''
    size 222px
    absolute right -25px top -25px
    background url('./../assets/images/about-picture-3.png') no-repeat center/cover
  .line-1
    size 730px
    absolute right 100% bottom 50%
    background url('./../assets/images/about-picture-9.png') no-repeat center/cover
  .line-2
    @extend .about-picture-4:before
.about-picture-10
  size 500px
  margin-left -40px
  position relative
  border-radius: 50%
  background url('./../assets/images/about-picture-10-1.png') no-repeat center/cover
  &:before
    @extend .about-picture-2 .line-2
    top auto
    right 100%
    bottom 50%
    transform rotate(90deg)
.about-picture-11
  size 522px
  margin-left 40px
  position relative
  &:before
    z-index 1
    size 100%
    content ''
    absolute left 0 top 0
    border-radius: 50%
    background url('./../assets/images/about-picture-11-1.png') no-repeat center/cover
  &:after
    @extend .about-picture-4:after
.about-bg-full-2
  z-index 1
  size 100% 628px
  position relative
  background url('/static/gallery/public-areas/render-1.jpg') no-repeat center bottom/cover
.about-picture-12
  size 522px
  margin-left -40px
  position relative
  &:before
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-1-1.png') no-repeat center/cover
  &:after
    @extend .about-picture-4:after
    size 767px
    left auto
    top 54px
    right 144px
  .line-1
    @extend .about-picture-2 .line-2
    top 50%
    left 100%
    right auto
    transform: rotate(-90deg)
.about-picture-16
  @extend .about-picture-12
  &:before
    @extend .about-picture-12:before
    background-image url('./../assets/images/about-picture-16.png')
  &:after
    top auto
    left auto
    right 250px
    bottom 300px
.about-picture-13
  size 522px
  margin-left 40px
  position relative
  background url('./../assets/images/about-picture-13.png') no-repeat center/cover
  &:before
    @extend .about-picture-2 .line-2
    top auto
    left 100%
    right auto
    bottom 50%
.about-picture-14
  size 522px
  margin-left -40px
  position relative
  &:after
    @extend .about-picture-4:after
    left -57px
    size 244px
    top -34px
  &:before
    size calc(100% - 20px)
    z-index 1
    content ''
    absolute left 0 top 0
    border-radius: 50%
    background url('./../assets/images/about-picture-14.jpg') no-repeat
    background-size: cover
    background-position-x: -120px
  .line-1
    @extend .about-picture-8 .line-2
    top 50%
    left 100%
    right auto
    transform rotate(-90deg)
.about-picture-15
  size 522px
  margin-left 40px
  position relative
  &:before
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/about-picture-15.png') no-repeat center/cover
  &:after
    @extend .about-picture-4:after
    size 693px
.modal-wrapper
  margin 0 -25px
  padding-right 160px
  img
    max-width 100%
.modal-container
  color #fff
  margin 0 auto
  padding 40px 130px
  +below(1290px)
    padding 40px 110px
.modal-icon
  max-width 100%
  user-select none
  margin-bottom 20px
.modal-icon-text
  color #f6ac6d
  font-weight 700
  user-select none
  font-size rem(10px)
  line-height rem(13.5px)
  text-transform uppercase
  letter-spacing rem(2.2px)
  font-family 'Heading Pro Wide'
.about-picture
  +below(1345px)
    size 100%
    background-size contain
.sizer
  +below(1345px)
    padding-top 100%
</style>
