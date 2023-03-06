<template lang="pug"> .event: .event-container: .container.h-100
  Logo
  .row.h-100(v-if="data")
    .col-md-7.h-100: smooth-scrollbar: .content-wrapper
      .date {{ data.dateFormat.day }} {{ data.dateFormat.month_text }} {{ data.dateFormat.year }}
      h1 {{ data.name }}
      .content(v-html="data.body") {{ data.body }}
    .col-md-5(v-if="data.bodyImageUrl").text-right: img.content-image(alt :src="data.bodyImageUrl")
    .col-md-5(v-else-if="data.previewImageUrl").text-right: img.content-image(alt :src="data.previewImageUrl")
</template>

<script>
import Logo from '../components/Logo'
import {mapActions} from 'vuex'
export default {
  data: () => ({
    data: null
  }),
  components: {Logo},
  async mounted () {
    this.data = await this.getData(this.$route.params.id)
    this.$store.commit('variables/footerBg', true)
    this.loaderHide()
    setTimeout(() => {
      document.title = this.data.name + ' | ' + document.title
    }, 200)
  },
  beforeDestroy () {
    this.$store.commit('variables/footerBg', false)
  },
  methods: mapActions({getData: 'event/getData'})
}
</script>

<style scoped lang="stylus">
.content-wrapper
  padding-right 30px
.event-container
  size 100%
  padding-bottom 100px
.content-image
  width 100%
  max-width 460px
.content
  color #fff
  font-size 14px
  line-height 1.2
  font-style normal
  font-weight normal
  font-family 'TT Commons'
  h1, h2, h3, h4, h5
    color #fff
    font-size 18px
    margin-top 30px
    line-height 1.2
    font-weight bold
    margin-bottom 10px
    text-transform none
    letter-spacing normal
    font-family 'TT Commons'
    &:last-child
      margin-bottom 0
  p, ul
    margin-bottom 15px
    &:last-child
      margin-bottom 0
.event
  size 100% 100vh
  padding-top 150px
  background url('../assets/images/events-bg.png') no-repeat center/cover
.date
  color #FFF
  line-height 1
  font-size 14px
  margin-bottom 15px
h1
  color #fff
  font-size 20px
  font-weight 600
  line-height 1.4
  max-width 780px
  margin-bottom 40px
  letter-spacing .22em
  text-transform uppercase
</style>
