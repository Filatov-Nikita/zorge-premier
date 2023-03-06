<template lang="pug"> .gallery
  .gallery-items(v-if="galleryShow")
    .gallery-item(
      v-for="(item, index) in gallery"
      :key="item.key"
      :style="{backgroundImage:`url(${item.images[item.indexActive]})`}"
      :class="{'gallery-item--active':index === indexActive, 'gallery-item--hide':index !== indexActive && indexActive !== null}"
      @click="openGalleryImage(index)"
    )
      .gallery-item__wrapper: .gallery-item__main-wrapper
        .gallery-item__icon.icon-border: svg: use(:xlink:href="'/static/sprite.svg#' + item.key")
        .gallery-item__content
          .gallery-item__title {{ item.name }}
          .gallery-item__count {{ item.images.length }} фото
  .slider(v-if="sliderShow")
    .slider-top
      .icon-border: svg: use(:xlink:href="'/static/sprite.svg#' + gallery[indexActive].key")
      | {{ gallery[indexActive].name }}
    .slider__items:  .slider__item(
      v-for="(image,index) in images"
      :style="{backgroundImage:`url('${image}')`}"
      @click="openImage(index)"
    )
  back-to(:buttonDisable="true")
</template>

<script>
import {mapGetters} from 'vuex'
import BackTo from '../components/BackTo'
export default {
  components: {BackTo},
  data: () => ({
    indexActive: null,
    sliderShow: false,
    galleryShow: true
  }),
  computed: {
    ...mapGetters({
      gallery: 'gallery/gallery',
      mobileMenuContext: 'menu/mobileMenuContext'
    }),
    images () {
      if (this.gallery[this.indexActive].imagesMobile) {
        return this.gallery[this.indexActive].imagesMobile
      } else {
        return this.gallery[this.indexActive].images
      }
    }
  },
  mounted () {
    if (this.$route.params.category) {
      const index = this.getIndexGallery(this.$route.params.category)
      if (index !== undefined) {
        this.selectGallery(index)
      }
    }
    this.loaderHide()
  },
  beforeDestroy () {
    this.mobileMenuContext.lock = false
  },
  methods: {
    openGalleryImage (index) {
      this.indexActive = index
      this.openImage(0)
    },
    openImage (index) {
      $.fancybox.open(
        this.images.map(image => ({src: image, thumb: image})),
        {
          hash: 'opened',
          loop: false,
          thumbs: {autoStart: true}
        },
        index
      )
    },
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
    selectGallery (index) {
      this.mobileMenuContext.lock = true
      this.sliderShow = true
      this.indexActive = index
      this.galleryShow = false
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped lang="stylus">
.gallery
  padding-bottom 20px
.gallery-items
  margin-bottom 20px
.gallery-item
  overflow hidden
  position relative
  background no-repeat center/cover
  transition height .15s ease-in-out
  &:before
    content ''
    display block
    padding-top 55.556%
  &--hide
    //height 0
  &--active
    //height calc(100vh - 89px)
  &__wrapper
    size 100%
    padding 20px
    absolute left 0 top 0
    background-color rgba(49, 60, 79, .75)
  &__main-wrapper
    display flex
    align-items center
  &__icon
    size 41px
    margin-right 17px
    svg
      size 19px
  &__content
    margin 0
    line-height 1
  &__title
    color #fff
    font-size 14px
    text-transform uppercase
    font-family 'Heading Pro Wide'
  &__count
    font-size 12px
    margin-top 3px
    overflow hidden
    color rgba(255, 255, 255, .56)
.slider
  width 100%
  padding-bottom 20px
  &__item
    background no-repeat center/cover
    &:before
      content ''
      display block
      padding-top 55.556%
.slider-count-number
  z-index 1
  color #fff
  line-height 1
  font-size 12px
  absolute right 90px bottom 40px
.slider-top
  z-index 2
  color #fff
  display flex
  display none
  line-height 1
  font-size 14px
  align-items center
  text-transform uppercase
  absolute top 20px left 20px
  font-family 'Heading Pro Wide'
  .icon-border
    size 41px
    margin-right 17px
    svg
      size 19px
</style>
