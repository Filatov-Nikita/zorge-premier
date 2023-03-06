<template lang="pug"> .apartment-concepts
  ScrollPage(ref="scrollbar" :backgroundImage="require('../assets/images/apartment-concepts.jpg')")
    .container
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[0].title")
          div(v-html="items[0].content")
          router-link.link(:to="items[0].button.link" exact)
            svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
            .link__text {{ items[0].button.text }}
        .col-md-5: .apartment-concepts-picture-1.apartment-concepts-picture: .sizer
      .row.mb-5.align-items-center
        .col-md-5: .apartment-concepts-picture-2.apartment-concepts-picture: .sizer
          .line-1
          .line-2
        .col-md-7
          .long-title(v-html="items[1].title")
          div(v-html="items[1].content")
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[2].title")
          div(v-html="items[2].content")
        .col-md-5: .apartment-concepts-picture-4.apartment-concepts-picture
          .sizer
          .line
      .row.mb-5.align-items-center
        .col-md-5: .apartment-concepts-picture-5.apartment-concepts-picture: .sizer
        .col-md-7
          .long-title(v-html="items[3].title")
          div(v-html="items[3].content")
    .apartment-concepts-bg-full-1.mb-5
    .container
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[4].title")
          div(v-html="items[4].content")
        .col-md-5: .apartment-concepts-picture-8.apartment-concepts-picture: .sizer
          .line-1
          .line-2
      .row.mb-5.align-items-center
        .col-md-5: .apartment-concepts-picture-10.apartment-concepts-picture: .sizer
        .col-md-7
          .long-title(v-html="items[5].title")
          div(v-html="items[5].content")
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[6].title")
          div(v-html="items[6].content")
        .col-md-5: .apartment-concepts-picture-11.apartment-concepts-picture: .sizer
          .line-1
          .line-2
    .apartment-concepts-bg-full-2.mb-5
    .container
      .row.mb-5.align-items-center
        .col-md-5: .apartment-concepts-picture-12.apartment-concepts-picture: .sizer
          .line-1
        .col-md-7
          .long-title(v-html="items[7].title")
          div(v-html="items[7].content")
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[8].title")
          div(v-html="items[8].content")
          //- router-link.link(:to="items[8].button.link" exact)
          //-   svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
          //-   .link__text {{ items[8].button.text }}
        .col-md-5: .apartment-concepts-picture-13.apartment-concepts-picture: .sizer
      //- .row.mb-5.align-items-center
      //-   .col-md-5: .apartment-concepts-picture-14.apartment-concepts-picture: .sizer
      //-     .line-1
        //- .col-md-7
        //-   .long-title(v-html="items[9].title")
        //-   div(v-html="items[9].content")
      .row.mb-5.align-items-center
        .col-md-5: .apartment-concepts-picture-15.apartment-concepts-picture: .sizer
        .col-md-7
          .long-title(v-html="items[10].title")
          div(v-html="items[10].content")
</template>

<script>
import ScrollPage from '../components/ScrollPage'
import ModalRightToLeft from '../components/ModalRightToLeft'
import NextSection from '../components/NextSection'
import {mapGetters} from 'vuex'
export default {
  components: { ScrollPage, ModalRightToLeft, NextSection },
  computed: {
    ...mapGetters({items: 'concepts/items'}),
    scrollbar () {
      return this.$refs.scrollbar.$refs.scrollbar.scrollbar
    }
  },
  beforeDestroy () {
    this.$store.commit('variables/footerShow', true)
  },
  mounted () {
    this.$store.commit('variables/footerShow', false)
    this.loaderHide()
  },
  methods: {
    nextBlock () {
      this.scrollbar.setMomentum(
        this.scrollbar.offset.x,
        window.innerHeight - this.scrollbar.scrollTop
      )
    }
  }
}
</script>

<style scoped lang="stylus">
.apartment-concepts-picture-1
  z-index 1
  size 522px
  margin-left 40px
  margin-top -40px
  position relative
  background url('./../assets/images/apartment-concepts-picture-1-1.png') no-repeat center/cover
.apartment-concepts-picture-2
  size 522px
  position relative
  margin-left -40px
  .line-1
    size 100%
    z-index 1
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-2.png') no-repeat center/cover
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
.apartment-concepts-picture-4
  size 522px
  margin-left 40px
  position relative
  .line
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-4.png') no-repeat center/cover
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
.apartment-concepts-picture-5
  size 522px
  margin-left -40px
  background url('./../assets/images/apartment-concepts-picture-5.png') no-repeat center/cover
.apartment-concepts-bg-full-1
  z-index 1
  size 100% 628px
  position relative
  background url('./../assets/images/apartment-concepts-bg-full-1.jpg') no-repeat center/cover
  &:before
    content ''
    size 215px
    margin -107px 0 0 -107px
    absolute left 0 top 100%
    background url('./../assets/images/about-picture-3.png') no-repeat center/cover
.apartment-concepts-picture-8
  size 522px
  margin-left 40px
  position relative
  &:after
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-8.png') no-repeat center/cover
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
    @extend .apartment-concepts-picture-4:before
.apartment-concepts-picture-10
  size 522px
  margin-left -40px
  position relative
  border-radius: 50%
  background url('./../assets/images/apartment-concepts-picture-10.jpg') no-repeat right/cover
  background-size: cover !important
  &:before
    @extend .apartment-concepts-picture-2 .line-2
    top auto
    right 100%
    bottom 50%
    transform rotate(90deg)
.apartment-concepts-picture-11
  size 522px
  margin-left 40px
  position relative
  &:before
    z-index 1
    size 100%
    content ''
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-11.png') no-repeat center/cover
  &:after
    @extend .apartment-concepts-picture-4:after
.apartment-concepts-bg-full-2
  z-index 1
  size 100% 628px
  position relative
  background url('./../assets/images/apartment-concepts-bg-full-2.jpg') no-repeat center/cover
.apartment-concepts-picture-12
  size 522px
  margin-left -40px
  position relative
  &:before
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-12.png') no-repeat center/cover
  &:after
    @extend .apartment-concepts-picture-4:after
    size 767px
    left auto
    top 54px
    right 144px
  .line-1
    @extend .apartment-concepts-picture-2 .line-2
    top 50%
    left 100%
    right auto
    transform rotate(-90deg)
.apartment-concepts-picture-13
  size 522px
  margin-left 40px
  position relative
  background url('./../assets/images/apartment-concepts-picture-13.png') no-repeat center/cover
  &:before
    @extend .apartment-concepts-picture-2 .line-2
    top auto
    left 100%
    right auto
    bottom 50%
.apartment-concepts-picture-14
  size 522px
  margin-left -40px
  position relative
  &:after
    @extend .apartment-concepts-picture-4:after
    left -57px
    size 244px
    top -34px
  &:before
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-14.png') no-repeat center/cover
  .line-1
    @extend .apartment-concepts-picture-8 .line-2
    top 50%
    left 100%
    right auto
    transform rotate(-90deg)
.apartment-concepts-picture-15
  size 522px
  margin-left -40px
  position relative
  &:before
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/apartment-concepts-picture-15.png') no-repeat center/cover
  &:after
    @extend .apartment-concepts-picture-4:after
    size 693px
.apartment-concepts-picture
  +below(1345px)
    size 100%
    background-size contain
.sizer
  +below(1345px)
    padding-top 100%
</style>
