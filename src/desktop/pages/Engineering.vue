<template lang="pug"> .apartment-concepts
  ScrollPage(ref="scrollbar" :backgroundImage="require('../assets/images/engineering.jpg')")
    template(v-slot:first="")
      .desc «Зорге.Премьер» – это современные инженерные системы, которые обеспечивают высочайший уровень безопасности и комфорта для каждого жильца.
    .container
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[0].title")
          div(v-html="items[0].content")
        .col-md-5: .engineering-picture-1.engineering-picture: .sizer
      .row.mb-5.align-items-center
        .col-md-5: .engineering-picture-2.engineering-picture: .sizer
          .line-1
          .line-2
        .col-md-7
          .long-title(v-html="items[1].title")
          div(v-html="items[1].content")
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[2].title")
          div(v-html="items[2].content")
        .col-md-5: .engineering-picture-4.engineering-picture
          .sizer
          .line
      .row.mb-5.align-items-center
        .col-md-5: .engineering-picture-5.engineering-picture: .sizer
        .col-md-7
          .long-title(v-html="items[3].title")
          div(v-html="items[3].content")
    .container
      .row.mb-5.align-items-center
        .col-md-7
          .long-title(v-html="items[4].title")
          div(v-html="items[4].content")
        .col-md-5: .engineering-picture-8.engineering-picture: .sizer
          .line-1
          .line-2
</template>

<script>
import ScrollPage from '../components/ScrollPage'
import ModalRightToLeft from '../components/ModalRightToLeft'
import NextSection from '../components/NextSection'
import {mapGetters} from 'vuex'
export default {
  components: { ScrollPage, ModalRightToLeft, NextSection },
  computed: {
    ...mapGetters({items: 'engineering/items'}),
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
.next-section
  bottom -35px!important
.desc
  color #fff
  font-size 20px
  max-width 700px
  font-weight 600
  line-height 1.2
  letter-spacing .22em
  text-transform uppercase
  font-family 'Heading Pro Wide'
  +below(1340px)
    padding-left 60px
.engineering-picture-1
  z-index 1
  size 522px
  margin-left 40px
  margin-top -40px
  position relative
  background url('./../assets/images/engineering-picture-1.png') no-repeat center/cover
.engineering-picture-2
  size 522px
  position relative
  margin-left -40px
  .line-1
    size 100%
    z-index 1
    absolute left 0 top 0
    background url('./../assets/images/engineering-picture-2.png') no-repeat center/cover
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
.engineering-picture-4
  size 522px
  margin-left 40px
  position relative
  .line
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/engineering-picture-4.png') no-repeat center/cover
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
.engineering-picture-5
  size 522px
  margin-left -40px
  background url('./../assets/images/engineering-picture-5.png') no-repeat center/cover
.engineering-picture-8
  size 522px
  margin-left 40px
  position relative
  &:after
    size 100%
    z-index 1
    content ''
    absolute left 0 top 0
    background url('./../assets/images/engineering-picture-8.png') no-repeat center/cover
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
    @extend .engineering-picture-4:before
.engineering-picture
  +below(1345px)
    size 100%
    background-size contain
.sizer
  +below(1345px)
    padding-top 100%
</style>
