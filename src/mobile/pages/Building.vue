<template lang="pug"> .building
  .top-bg
  title-circle Ход <br>строительства
  .panel(v-if="activeMonth")
    .select
      .select-value {{ activeMonth }}
      select(@change="$store.commit('building/setActiveMonth', $event.target.value)")
        option(v-for="month in months" :selected="month === activeMonth") {{ month }}
    .select
      .select-value {{ activeYear }}
      select(@change="$store.commit('building/setActiveYear', $event.target.value)")
        option(v-for="year in years" :selected="year === activeYear") {{ year }}
  .images(v-if="building"): img.image(v-for="(image,i) in building" alt :src="image" @click="openImage(i)")
  back-to(icon="play" @click="openCamera" :buttonDisable="!streaming") Онлайн камера
</template>

<script>
import TitleCircle from '../components/TitleCircle'
import BackTo from '../components/BackTo'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {TitleCircle, BackTo},
  computed: mapGetters({
    building: 'building/building',
    years: 'building/years',
    months: 'building/months',
    activeYear: 'building/activeYear',
    activeMonth: 'building/activeMonth',
    streaming: 'building/streaming'
  }),
  async mounted () {
    await this.getData()
    this.loaderHide()
  },
  methods: {
    ...mapActions({getData: 'building/getData'}),
    openCamera () {
      $.fancybox.open({
        type: 'iframe',
        src: this.streaming,
        baseClass: 'open-camera'
      })
    },
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

<style lang="stylus">
.open-camera .fancybox-slide--iframe
  padding 0
</style>
<style scoped lang="stylus">
.title-circle
  margin-bottom 20px!important
.select
  position relative
  padding-bottom 2px
  border-bottom 2px solid #f6ac6d
  select
    opacity 0
    absolute right 0 top 0
  &-value
    color #fff
    line-height 1
    font-size 16px
    font-weight 500
    text-transform uppercase
    font-family 'Heading Pro Wide'
.panel
  z-index 1
  display flex
  position relative
  align-items center
  padding 10px 20px 20px
  justify-content space-between
.building
  padding-bottom 20px
.top-bg
  size 100% 250px
  background url('../assets/images/building-bg.jpg') no-repeat center bottom/cover
.images
  z-index 1
  position relative
  padding-bottom 20px
.image
  max-width 100%
</style>
