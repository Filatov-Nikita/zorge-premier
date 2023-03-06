<template lang="pug"> .table
  .table-head
    .table-head__item(
      v-for="col in cols"
      :style="{'flex-basis':100/cols.length + '%'}"
      :class="[col.key]"
    ): .d-flex.align-items-center {{ col.name }}
      svg: use(xlink:href="/static/sprite.svg#triangle")
  .table-result: div
    .padding-line
    div(style="height: 600px; overflow-x:hidden"): .line(
      v-for="(item, i) in items"
      :key="i"
      :class="item.status"
      @click="$emit('update:flat', item)"
      :title="item.status === 'booked' ? 'Забронирована' : false"
    )
      .col(:style="{'flex-basis':100/cols.length + '%'}") {{ $store.state.filter.houses[item.house] }}
      .col(:style="{'flex-basis':100/cols.length + '%'}") {{ item.rooms_number }}
      .col(:style="{'flex-basis':100/cols.length + '%'}") {{ item.storey_number }}
      .col(:style="{'flex-basis':100/cols.length + '%'}") {{ item.total_area }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    items: {
      required: true,
      type: Array
    }
  },
  computed: {
    ...mapGetters({ cols: 'filter/cols' }),
  },
}
</script>

<style scoped lang="stylus">
.table-head
  display flex
  &__item
    display flex
    line-height 1
    color #1f252f
    font-weight 600
    user-select none
    font-size rem(14px)
    justify-content center
    text-transform lowercase
    div
      cursor pointer
    svg
      fill #cecece
      size 10px 6px
      margin-left 10px
    &--active svg
      fill #1f252f
    &--desc svg
      transform scale(-1)
    &.uniqueness
      div
        cursor default
      svg
        display none
.table-result
  height 80vh
  overflow hidden
  & >>> .smooth-scrollbar
    overflow visible!important
  & >>> .scroll-content
    padding-top 30px
.line
  display flex
  size 100% 56px
  cursor pointer
  padding 12px 0
  align-items center
  & + &
    border-top 1px solid #c5c5c5
  &.booked
    position relative
    &:before
      size 14px
      content ''
      margin-top -7px
      border-radius 14px
      absolute left 15px top 50%
      background-color #f6ac6d
.col
  display flex
  line-height 1
  color #1f252f
  font-weight 700
  user-select none
  font-size rem(20px)
  justify-content center
  font-family 'Heading Pro Wide'
  &__uniqueness
    display flex
    align-items center
    justify-content center
    text-transform lowercase
    &__wr
      position relative
    & >>> img
      size 30px
      display none
      margin-right -5px
      & + div
        padding 5px
        display none
        color #1F252F
        line-height 1
        font-size 8px
        min-width 75px
        font-weight 500
        margin-left -3px
        margin-bottom 5px
        text-align center
        border-radius 3px
        background #F6AC6D
        transform translateX(-75%)
        absolute left 50% bottom 100%
        &:before
          content ''
          absolute left 75% top 100%
          border-top 5px solid #F6AC6D
          border-left 5px solid transparent
          border-right 5px solid transparent
          border-bottom 5px solid transparent
      &:hover + div
        display block
      &[src]
        display block
</style>
