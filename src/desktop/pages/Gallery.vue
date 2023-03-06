<template lang="pug"> .gallery
  Logo
  transition(name="fade-05"): .gallery-items(v-if="galleryShow")
    .gallery-item(
      v-for="(item, index) in gallery"
      :key="item.key"
      :style="{backgroundImage:`url(${item.images[item.indexActive]})`}"
      :class="{'gallery-item--active':index === indexActive, 'gallery-item--hide':index !== indexActive && indexActive !== null}"
      @click="selectGallery(index)"
    )
      .gallery-item__wrapper
        .gallery-item__icon.icon-border: svg: use(:xlink:href="'/static/sprite.svg#' + item.key")
        .gallery-item__title {{ item.name }}
        .gallery-item__count {{ item.images.length }} фото
  transition(name="fade-05"): .slider(v-if="sliderShow")
    .close-btn.icon-border(v-if="!galleryShow" @click="slideClose")
      svg: use(xlink:href="/static/sprite.svg#arrow-back")
    swiper(:options="swiperOptions" @slideChange="slideChange" ref="mySwiper")
      swiper-slide(
        :key="index"
        v-for="(image, index) in images"
        :style="{backgroundImage:`url('${image}')`}"
      )
      .slider-button.slider-button--prev(slot="button-prev"): img(alt src="@/assets/svg/button-prev.svg")
      .slider-button.slider-button--next(slot="button-next"): img(alt src="@/assets/svg/button-prev.svg")
      //- .slider-pagination(slot="pagination")
    .bottom-tabs: .bottom-tab(
      v-for="(item, index) in gallery"
      :class="{'bottom-tab--active':index === indexActive}"
      @click="selectTabGallery(index)"
    ) {{ item.name }}
</template>

<script>
import Logo from '../components/Logo'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    indexActive: null,
    sliderShow: false,
    galleryShow: true,
    swiperOptions: {
      pagination: {
        el: '.slider-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.slider-button--next',
        prevEl: '.slider-button--prev'
      }
    }
  }),
  components: { Logo },
  computed: {
    ...mapGetters({gallery: 'gallery/gallery'}),
    images () {
      return this.gallery[this.indexActive].images
    },
    imagesStartIndex () {
      return this.gallery[this.indexActive].indexActive
    }
  },
  beforeDestroy () {
    this.$store.commit('variables/yesidea', true)
  },
  mounted () {
    if (this.$route.params.category) {
      const index = this.getIndexGallery(this.$route.params.category)
      if (index !== undefined) {
        this.selectGallery(index)
      }
    }
    this.$store.commit('variables/yesidea', false)
    this.loaderHide()
  },
  methods: {
    getIndexGallery (key) {
      let index
      this.gallery.forEach((item, i) => {
        if (item.key === key) {
          index = i
          return false
        }
      })
      return index
    },
    selectTabGallery (index) {
      if (this.indexActive === index) {
        return false
      }
      this.slideClose()
      setTimeout(() => {
        this.selectGallery(index)
      }, 1000)
    },
    selectGallery (index) {
      this.indexActive = index
      this.sliderShow = true
      this.swiperOptions.initialSlide = this.imagesStartIndex
      setTimeout(() => {
        this.galleryShow = false
        this.$store.commit('variables/yesideaIndex102', false)
      }, 1000)
    },
    slideClose () {
      this.galleryShow = true
      setTimeout(() => {
        this.indexActive = null
        this.sliderShow = false
        this.$store.commit('variables/yesideaIndex102', true)
      }, 100)
    },
    slideChange () {
      this.$store.commit('gallery/setIndexActive', {
        galleryIndex: this.indexActive,
        imageIndex: this.$refs.mySwiper.$swiper.activeIndex
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.gallery
  size 100vw 100vh
.gallery-items
  z-index 3
  color #fff
  display flex
  size 100% 100vh
  position relative
.gallery-item
  width 100%
  display flex
  cursor pointer
  overflow hidden
  user-select none
  position relative
  align-items center
  justify-content center
  background no-repeat center/cover
  transition width .9s ease-in-out
  &:hover .gallery-item__icon
    background-color #f6ac6d
    svg
      fill #1f252f
  &--hide
    width 0
  &:after
    size 100%
    content ''
    absolute left 0 top 0
    background-color rgba(31, 37, 47, .83)
  &__title
    font-weight 700
    line-height 1.2
    min-height 48px
    margin-bottom 10px
    font-size rem(20px)
    text-transform uppercase
    letter-spacing rem(4.4px)
    font-family 'Heading Pro Wide'
    +below(1360px)
      min-height 40px
      font-size rem(16px)
  &__icon
    margin 0 auto
  &__wrapper
    z-index 1
    padding 30px
    text-align center
    position relative
.slider
  size 100vw 100vh
  absolute left 0 top 0
  &:before, &:after
    z-index 2
    content ''
    absolute left 0
    size 100% 240px
    background linear-gradient(180deg, rgba(31, 37, 47, .75) 0%, rgba(31, 37, 47, 0) 100%)
  &:before
    top 0
  &:after
    bottom 0
    transform scale(-1)
.swiper-container
  margin 0
  size 100%
  z-index auto
  &:before, &:after
    z-index 2
    content ''
    absolute top 0
    size 140px 100%
    background linear-gradient(90deg, rgba(31, 37, 47, .5) 0%, rgba(31, 37, 47, 0) 100%)
  &:before
    left 0
  &:after
    right 0
    transform scale(-1)
.swiper-slide
  background no-repeat center/cover
.slider-button
  z-index 3
  outline none
  cursor pointer
  size 84px 60px
  position absolute
  top calc(50% - 30px)
  &--prev
    left 20px
  &--next
    right 20px
    transform scale(-1)
  &.swiper-button-disabled
    display none
.slider-pagination
  z-index 101
  display flex
  position absolute
  align-items center
  left 50%!important
  bottom 65px!important
  width fit-content!important
  transform translate(-50%, 0)
  +below(1650px)
    bottom 55px!important
  & >>> .swiper-pagination-bullet
    size 3px
    opacity 1
    outline none
    margin 0 8px
    position relative
    border-radius 10px
    background-color #fff
    transition width .25s ease-in-out
    +below(1290px)
      margin 0 5px
    &:before
      size 0
      content ''
      border-radius 10px
      border 0 solid #f6ac6d
      absolute left 50% top 50%
      transform translate(-50% ,-50%)
      transition width .25s ease-in-out, height .25s ease-in-out, border-width .25s ease-in-out
    &-active
      size 2px
      &:before
        size 8px
        border-width 1px
.bottom-tabs
  z-index 101
  display flex
  color #f6ac6d
  line-height 1.2
  font-weight 700
  user-select none
  font-size rem(10px)
  text-transform uppercase
  letter-spacing rem(2.2px)
  font-family 'Heading Pro Wide'
  absolute right 200px bottom 28px
.bottom-tab
  cursor pointer
  &--active
    color #afafaf
    cursor default
  & + &
    margin-left 40px
.close-btn
  z-index 101
  absolute left 35px bottom 55px
  +below(1800px)
    bottom 85px
</style>
