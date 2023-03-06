<template lang="pug"> .events
  Logo
  .events-container: .container.h-100: .events-wrapper
    h1 Новости и акции
    .years(:style="{visibility:[years.length ? '' : 'hidden']}")
      .year(v-for="year in years"
        :class="{'year--active':year === yearActive}"
        @click="$store.commit('events/setYearActive', year)"
      ) {{ year }}
    .news: smooth-scrollbar: div
      .news__item(v-for="item in items" @click="$router.push('/events/' + item.id)")
        .news__item__icon: svg: use(:xlink:href="`/static/sprite.svg#${item.tag}`")
        .news__item__title {{ item.title }}
</template>

<script>
import Logo from '../components/Logo'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {Logo},
  computed: {
    ...mapGetters({items: 'events/items'}),
    ...mapGetters({years: 'events/years'}),
    ...mapGetters({yearActive: 'events/yearActive'})
  },
  async mounted () {
    this.$store.commit('variables/footerBg', true)
    await this.getData()
    this.loaderHide()
  },
  beforeDestroy () {
    this.$store.commit('variables/footerBg', false)
  },
  methods: mapActions({getData: 'events/getData'})
}
</script>

<style scoped lang="stylus">
h1
  margin-bottom 0
.events
  size 100% 100vh
  padding-top 150px
  background url('../assets/images/events-bg.png') no-repeat center/cover
.events-wrapper
  size 100%
  display flex
  flex-direction column
.events-container
  size 100%
  padding-bottom 120px
.years
  display flex
  padding-top 55px
  align-items center
.year
  color #fff
  line-height 1
  cursor pointer
  font-size 20px
  font-weight 600
  user-select none
  letter-spacing .22em
  text-transform uppercase
  font-family 'Heading Pro Wide'
  transition color .15s ease-in-out
  &:hover
    color rgba(255, 255, 255, .5)
  &--active
    cursor default
    color #F6AC6D!important
  & + &
    margin-left 40px
.news
  size 100%
  overflow hidden
  flex-basis 100%
  padding-top 60px
  & >>> .smooth-scrollbar
    padding-right 60px
  &__item
    display flex
    cursor pointer
    max-width 1000px
    user-select none
    align-items center
    & + &
      margin-top 70px
    &__icon
      size 100px
      display flex
      min_size 100px
      margin-right 60px
      align-items center
      border-radius 100px
      justify-content center
      background-color #F6AC6D
      border 5px solid #F6AC6D
      transition background-color .15s ease-in-out
      svg
        size 42px
        fill #1F252F
        transition fill .15s ease-in-out
    &:hover &__icon
      background-color rgba(246, 172, 109, 0)
    &:hover svg
      fill #fff
    &__title
      color #FFF
      font-size 20px
      font-weight 600
      line-height 1.4
      letter-spacing .22em
      text-transform uppercase
      font-family 'Heading Pro Wide'
</style>
