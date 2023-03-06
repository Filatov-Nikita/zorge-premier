<template lang="pug"> .developer
  title-circle «Жилстрой-<br>инвест»
  .content(v-html="content") {{ content }}
  .items
    .items-wrapper: .item(
      v-for="item in items"
      :style="{backgroundImage:`url(${item.image})`}"
    ): .item__name {{ item.name }}
    back-to(@click="jsOpen" icon="arrow-horizontal-small") {{ link.text }}
</template>

<script>
import {mapGetters} from 'vuex'
import BackTo from '../components/BackTo'
import TitleCircle from '../components/TitleCircle'
export default {
  components: {TitleCircle, BackTo},
  computed: mapGetters({
    content: 'developer/content',
    link: 'developer/link',
    items: 'developer/items'
  }),
  mounted () {
    this.loaderHide()
  },
  methods: {
    jsOpen () {
      open(this.link.href, '_blank')
    }
  }
}
</script>

<style scoped lang="stylus">
.developer
  padding-bottom 20px
.title-circle
  line-height 1.4
  margin 15px 0!important
.content
  color #fff
  font-size 12px
  padding 0 20px
  line-height 14px
  & > *:last-child
    margin-bottom 0
.items
  margin-top 20px
.items-wrapper
  padding-bottom 20px
.item
  size 100% 170px
  position relative
  background no-repeat center/cover
  &__name
    size 100%
    color #FFF
    padding 20px
    line-height 1
    font-size 10px
    font-weight 600
    text-align right
    letter-spacing .1em
    absolute left 0 top 0
    text-transform uppercase
    font-family 'Heading Pro Wide'
    background-color rgba(31, 37, 47, .7)
</style>
