<template lang="pug"> .event(v-if="data")
  .date {{ data.dateFormat.day }} {{ data.dateFormat.month_text }} {{ data.dateFormat.year }}
  h1 {{ data.name }}
  img.image(v-if="data.bodyImageUrl" :src="data.bodyImageUrl" alt)
  img.image(v-else-if="data.previewImageUrl" :src="data.previewImageUrl" alt)
  .content(v-html="data.body") {{ data.body }}
  back-to(:buttonDisable="true" icon="filter") Подбор на фасаде
</template>

<script>
import {mapActions} from 'vuex'
import BackTo from '../components/BackTo'
export default {
  components: {BackTo},
  data: () => ({
    data: null
  }),
  async mounted () {
    this.data = await this.getData(this.$route.params.id)
    this.loaderHide()
    setTimeout(() => {
      document.title = this.data.name + ' | ' + document.title
    }, 200)
  },
  methods: mapActions({getData: 'event/getData'})
}
</script>

<style scoped lang="stylus">
.event
  padding 30px 0 20px
.date
  color #fff
  line-height 1
  padding 0 20px
  font-size 12px
  margin-bottom 20px
h1
  color #fff
  padding 0 20px
  font-size 10px
  font-weight 600
  line-height 1.8
  margin-bottom 15px
  text-transform uppercase
  font-family 'Heading Pro Wide'
.image
  max-width 100%
  margin-bottom 10px
.content
  color #fff
  padding 20px
  font-size 12px
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
</style>
