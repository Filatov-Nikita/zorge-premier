<template lang="pug"> .scroll-page: smooth-scrollbar(ref="scrollbar")
  .first-section(:style="style")
    Logo
    .container(v-if="pageTitle")
      h1 {{ pageTitle }}
      slot(name="first")
    next-section(@click="nextBlock")
  .main-section
    slot
    Footer(:static="true")
</template>

<script>
import Logo from './Logo'
import Footer from './Footer'
import NextSection from './NextSection'
import {mapGetters} from 'vuex'
export default {
  props: [ 'title', 'backgroundImage' ],
  components: { Logo, Footer, NextSection },
  computed: {
    ...mapGetters({scrollPageOffsetY: 'variables/scrollPageOffsetY'}),
    scrollbar () {
      return this.$refs.scrollbar.scrollbar
    },
    pageTitle () {
      return this.title || this.$route.meta.title
    },
    style () {
      return this.backgroundImage
        ? { backgroundImage: `url(${this.backgroundImage})` }
        : null
    },
    isBack () {
      return this.$route.params.isBack
    }
  },
  mounted () {
    if (this.scrollPageOffsetY.hasOwnProperty(this.$route.path) && this.isBack) {
      this.scrollbar.scrollTop = this.scrollPageOffsetY[this.$route.path]
    }
    this.scrollbar.addListener(({offset}) => {
      this.$store.commit('variables/setScrollPageOffsetY', {
        offset: offset.y,
        path: this.$route.path
      })
    })
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
.scroll-page
  height 100vh
.title
  line-height 1.2
  font-weight 700
  margin-bottom 30px
  font-size rem(20px)
  text-transform uppercase
  letter-spacing rem(4.4px)
  font-family 'Heading Pro Wide'
.first-section
  display flex
  height 100vh
  position relative
  padding-bottom 60px
  align-items flex-end
  background no-repeat center/cover
  +below(1800px)
    padding-bottom 75px
  .container
    z-index 1
    position relative
    +below(1340px)
      padding 0 35px
  &:before
    content ''
    size 100% 366px
    absolute left 0 bottom 0
    transform rotate(-180deg)
    background linear-gradient(180deg, #1F252F 0%, rgba(31, 37, 47, 0) 100%)
.main-section
  color #fff
  overflow hidden
  padding 100px 0 0
  background-color #1F252F
</style>
