<template lang="pug"> .concepts
  .top-bg
  title-circle Концепции <br>квартир
  .item(v-for="(item,i) in items")
    .item__image(:style="{backgroundImage:`url('/static/concepts/concepts-circle-${i + 1}.png')`}")
    .item__title(v-html="item.title")
    .item__desc(v-html="item.content")
</template>

<script>
import {mapGetters} from 'vuex'
import TitleCircle from '../components/TitleCircle'
export default {
  components: { TitleCircle },
  computed: mapGetters({items: 'concepts/items'}),
  mounted () {
    this.loaderHide()
  }
}
</script>

<style scoped lang="stylus">
.top-bg
  size 100% 328px
  background url('../assets/images/concepts-bg.jpg') no-repeat center bottom/cover
.item
  z-index 1
  padding 0 20px
  margin-top 30px
  position relative
  text-align center
  margin-bottom 50px
  &__image
    size 100% 294px
    margin-bottom 27px
    background no-repeat center/294px
  &__title
    color #FFF
    font-size 14px
    line-height 1.4
    font-weight 500
    text-align center
    margin-bottom 15px
    text-transform uppercase
    font-family 'Heading Pro Wide'
  &__desc
    color #B9B9B9
    font-size 12px
    line-height 1.2
    text-align center
</style>
