<template lang="pug"> .building: ScrollPage(backgroundImage="/static/gallery/architecture/progress.jpg")
  .container
    .photos(v-if="building")
      .photos-years
        .photos-year(
          v-for="year in years"
          :class="{'photos-year--active':year === activeYear}"
          @click="$store.commit('building/setActiveYear', year)"
        ) {{ year }}
      .photos-months
        .photos-month(
          v-for="month in months"
          :class="{'photos-month--active':month === activeMonth}"
          @click="$store.commit('building/setActiveMonth', month)"
        ) {{ month }}
      .row
        .col-md-3(v-for="(image,i) in building"): .photos-image(
          @click="openImage(i)"
          :style="{backgroundImage:`url(${image})`}"
        )
    .video(v-if="streaming")
      .title-video Он-лайн трансляция
      .video-frame: iframe(
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        allowfullscreen="allowfullscreen"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        :src="streaming"
      )
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ScrollPage from '../components/ScrollPage'
export default {
  components: { ScrollPage },
  computed: mapGetters({
    building: 'building/building',
    years: 'building/years',
    months: 'building/months',
    activeYear: 'building/activeYear',
    activeMonth: 'building/activeMonth',
    streaming: 'building/streaming'
  }),
  beforeDestroy () {
    this.$store.commit('variables/footerShow', true)
  },
  async mounted () {
    this.$store.commit('variables/footerShow', false)
    await this.getData()
    this.loaderHide()
  },
  methods: {
    ...mapActions({getData: 'building/getData'}),
    openImage (index) {
      $.fancybox.open(
        this.building.map(image => ({src: image, thumb: image})),
        {
          loop: false,
          thumbs: {
            autoStart: true
          }
        },
        index
      )
    }
  }
}
</script>

<style scoped lang="stylus">
.building >>> .first-section
  background-position bottom center!important
.photos
  line-height 1.2
  font-weight 700
  user-select none
  margin-bottom 60px
  text-transform uppercase
  font-family 'Heading Pro Wide'
.photos-years
  display flex
  margin-bottom 20px
.photos-year
  cursor pointer
  margin-right 35px
  font-size rem(32px)
  letter-spacing rem(7.04px)
  &--active
    color #f6ac6d
.photos-months
  display flex
  margin-bottom 35px
.photos-month
  cursor pointer
  margin-right 20px
  font-size rem(15px)
  letter-spacing rem(1.45px)
  &--active
    color #f6ac6d
.photos-image
  display block
  cursor pointer
  padding-top 100%
  margin-bottom 30px
  background no-repeat center/cover
.video
  margin-bottom 60px
.title-video
  color #fff
  line-height 1.2
  margin-bottom 35px
  font-size rem(32px)
  text-transform uppercase
  letter-spacing rem(7.04px)
  font-family 'Heading Pro Wide'
.video-frame
  position relative
  &:before
    content ''
    display block
    padding-top 56.221%
  iframe
    size 100%
    absolute left 0 top 0
</style>
