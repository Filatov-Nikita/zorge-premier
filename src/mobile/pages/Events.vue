<template lang="pug"> .events
  title-circle Новости <br>и акции
  .years: .year(v-for="year in years"
    :class="{'year--active':year === yearActive}"
    @click="$store.commit('events/setYearActive', year)"
  ) {{ year }}
  .news
    .news__item(v-for="item in items" @click="$router.push('/events/' + item.id)")
      .news__item__icon: svg: use(:xlink:href="`/static/sprite.svg#${item.tag}`")
      .news__item__title {{ item.title }}
</template>

<script>
import TitleCircle from '../components/TitleCircle'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {TitleCircle},
  computed: {
    ...mapGetters({items: 'events/items'}),
    ...mapGetters({years: 'events/years'}),
    ...mapGetters({yearActive: 'events/yearActive'})
  },
  async mounted () {
    await this.getData()
    this.loaderHide()
  },
  methods: mapActions({getData: 'events/getData'})
}
</script>

<style scoped lang="stylus">
.events
  padding 90px 20px 30px
.years
  z-index 1
  display flex
  margin 25px 0
  position relative
  justify-content center
.year
  color #fff
  margin 0 10px
  line-height 1
  cursor pointer
  font-size 14px
  font-weight 600
  letter-spacing .22em
  text-transform uppercase
  font-family 'Heading Pro Wide'
  &--active
    color #F6AC6D
.news
  z-index 1
  position relative
  padding-bottom 15px
  &__item
    display flex
    margin-top 30px
    align-items center
    &__icon
      size 62px
      display flex
      min_size 62px
      margin-right 20px
      align-items center
      border-radius 62px
      justify-content center
      background-color #F6AC6D
      svg
        size 30px
        fill #1F252F
    &__title
      color #fff
      font-size 10px
      font-weight 600
      line-height 1.4
      letter-spacing .1em
      text-transform uppercase
      font-family 'Heading Pro Wide'
</style>
