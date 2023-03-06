<template lang="pug"> .home
  .wrapper(@wheel.prevent="mouseWheel")
    .curtains
      transition(name="fade-05"): .content(v-if="contentVisible.home && $parent.emptyHistory")
        .content__left: .left-text Клубные дома <br>у леса
        .content__center: img.logo-circle(alt src="@/assets/images/logo-circle.png")
        .content__right: svg.text-premiere: use(xlink:href="/static/sprite.svg#text-premiere")
      next-section(v-if="!menuShow && contentVisible.home && $parent.emptyHistory" @click="videoToAbout")
      .video-bg
        .video(
          v-if="!$parent.emptyHistory"
          style="background-image:url('/static/gallery/architecture/render-10(2).jpg');"
        )
        video.video(
          v-if="$parent.emptyHistory"
          playsinline muted
          src="./../assets/other/home-video-transition-to-about.mp4"
          poster="/static/gallery/architecture/render-10(2).jpg"
          :style="{opacity:videoVisible.toAbout ? '1' : '0'}"
          @loadedmetadata="videoLoaded('toAbout')"
          @playing="videoTransitionToAboutPlay"
          @pause="videoTransitionToAboutPause"
          ref="videoTransitionToAbout"
        )
        video.video(
          v-if="$parent.emptyHistory"
          loop playsinline muted autoplay
          src="./../assets/other/home-video-cycle.mp4"
          :style="{opacity:videoVisible.cycle ? '1' : '0'}"
          @loadedmetadata="videoLoaded('cycle')"
        )
    transition(name="fade-05"): About.about(v-if="contentVisible.about || !$parent.emptyHistory")
</template>

<script>
import About from '../components/About'
import NextSection from '../components/NextSection'
import { mapGetters } from 'vuex'
export default {
  components: { About, NextSection },
  data: () => ({
    videoStatusLoaded: {
      cycle: false,
      toAbout: false
    },
    pageComplete: false
  }),
  beforeDestroy () {
    this.$store.commit('variables/footerShow', true)
  },
  mounted () {
    if (!this.$parent.emptyHistory) {
      this.videoStatusLoaded.toAbout = true
      this.contentVisible.home = false
      this.contentVisible.about = true
      this.loaderHide()
    }
    this.$store.commit('variables/footerShow', false)
  },
  computed: mapGetters({
    menuShow: 'variables/menuShow',
    contentVisible: 'variables/homeContentVisible',
    videoVisible: 'variables/homeVideoVisible',
    transitionToAbout: 'variables/homeTransitionToAbout'
  }),
  methods: {
    videoLoaded (type) {
      this.videoStatusLoaded[type] = true
      let allLoaded = true
      Object.keys(this.videoStatusLoaded).map(key => {
        if (!this.videoStatusLoaded[key]) {
          allLoaded = false
        }
      })
      if (allLoaded) {
        this.loaderHide()
        this.pageComplete = true
      }
    },
    mouseWheel ({deltaY}) {
      if (!this.$parent.emptyHistory) {
        return false
      }
      if (!this.pageComplete) {
        return false
      }
      // переход с "штор" на "О компании"
      if (deltaY > 0 && !this.transitionToAbout) {
        this.videoToAbout()
      }
    },
    videoToAbout () {
      if (!this.$parent.emptyHistory) {
        return false
      }
      this.videoVisible.toAbout = true
      setTimeout(() => {
        this.videoVisible.cycle = false
      }, 700)
      this.$store.commit('variables/homeTransitionToAbout', true)
      const video = this.$refs.videoTransitionToAbout
      video.currentTime = 0
      video.playbackRate = 1.3
      video.play()
    },
    videoTransitionToAboutPlay () {
      if (!this.$parent.emptyHistory) {
        return false
      }
      this.contentVisible.home = false
    },
    videoTransitionToAboutPause () {
      if (!this.$parent.emptyHistory) {
        return false
      }
      this.contentVisible.about = true
    }
  }
}
</script>

<style scoped lang="stylus">
.video
  transition opacity 1s
.curtains
  size 100%
  fixed top 0 left 0
.content
  z-index 1
  display flex
  size 100% 100vh
  user-select none
  position relative
  align-items center
  absolute top 0 left 0
  justify-content center
  &__left, &__right
    flex-basis 100%
  &__left
    text-align right
  &__right
    text-align left
  &__center
    text-align center
.logo-circle
  size 340px
  margin 0 150px
  +below(1360px)
    margin 0 10vw
  +below(1320px)
    margin 0 8vw
.left-text
  color #fff
  font-weight 700
  font-size rem(20px)
  text-transform uppercase
  letter-spacing rem(4.4px)
  font-family 'Heading Pro Wide'
  +above(1540px)
    br
      display none
.text-premiere
  fill #fff
  size 330px 30px
.video-bg
  size 100vw 100vh
  absolute top 0 left 0
.video
  size 100vw 100vh
  object-fit cover
  absolute top 0 left 0
  background no-repeat center/cover
.about
  position relative
</style>
