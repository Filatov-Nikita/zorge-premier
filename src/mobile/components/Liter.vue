<template lang="pug"> .liter
  .liter-padding
    .liter-number-rooms
      .d-flex.justify-content-between
        .liter-number-rooms__title Комнат
        .liter-liter литер {{ literNumber }}
      .liter-number-rooms__items: .liter-number-rooms__item(
        v-for="number in rooms"
        :class="[checkedRooms.length && !checkRoomsClass(number) ? 'active' : '']"
        @click="toggleCheckRooms(number)"
      ) {{ number }}
    .liter-chess
      .liter-items-wrapper.liter-chess__col.pr-3
        .liter-chess__col__title Этаж
        .liter-chess__line(v-for="storey in dataStoreys")
          .liter-chess__number-storey(
            @click="changeStorey(storey.id)"
          ) {{ storey.number }}
      .liter-grid-wrapper
        .liter-chess__col__title Квартиры
        .liter-chess__col.liter-grid(ref="grid"): smooth-scrollbar: div
          .liter-chess__line(v-for="storey in dataStoreys")
            .liter-chess__flat(
              v-for="flat in storey.flats"
              @click="selectFlat(flat.id)"
              :class="[flat.status, checkRoomsClass(flat.rooms_number) ? 'hidden' : '']"
            ) {{ flat.rooms_number }}
  back-to(to="/filter" icon="filter") Подбор по параметрам
</template>

<script>
import BackTo from './BackTo'
export default {
  components: {BackTo},
  props: [
    'mobileMenuContext',
    'litersIdNumber',
    'id',
    'dataStoreys',
    'dataStorey',
    'literNumber',
    'rooms'
  ],
  data: () => ({
    checkedRooms: []
  }),
  watch: {
    dataStoreys () {
      this.loaderHide()
    }
  },
  mounted () {
    this.$refs.grid.addEventListener('touchstart', this.menuLock)
    this.$refs.grid.addEventListener('touchend', this.menuUnLock)
  },
  beforeDestroy () {
    this.$refs.grid.removeEventListener('touchstart', this.menuLock)
    this.$refs.grid.removeEventListener('touchend', this.menuUnLock)
  },
  methods: {
    changeStorey (id) {
      this.$router.push('/select/' + id)
      this.$emit('changeStorey')
    },
    menuLock () {
      this.mobileMenuContext.lock = true
    },
    menuUnLock () {
      this.mobileMenuContext.lock = false
    },
    checkRoomsClass (number) {
      if (this.checkedRooms.length && !this.checkedRooms.includes(number)) {
        return true
      }
    },
    toggleCheckRooms (number) {
      if (this.checkedRooms.includes(number)) {
        this.checkedRooms = this.checkedRooms.filter(n => n !== number)
      } else {
        this.checkedRooms.push(number)
      }
    },
    selectFlat (id) {
      this.$router.push('/select/' + this.id + '/' + id)
    }
  }
}
</script>

<style scoped lang="stylus">
.liter
  padding-bottom 20px
.back-to
  padding-top 0!important
.liter-items-wrapper
  padding-top 15px
.liter-grid-wrapper
  overflow hidden
  padding-top 15px
  position relative
.liter-grid, .liter-grid-wrapper
  width 100%
.liter-padding
  padding 20px
.liter-number-rooms
  color #fff
  margin-bottom 30px
  font-size rem(14px)
  &__title
    margin-bottom 6px
  &__items
    display flex
    flex-wrap wrap
  &__item
    size 30px
    display flex
    cursor pointer
    margin-top 6px
    font-weight 700
    margin-right 6px
    border-radius 30px
    align-items center
    justify-content center
    border 2px solid #f6ac6d
    &.active
      color #1f252f
      background-color #f6ac6d
.liter-chess
  width 100%
  display flex
  line-height 1
  &__line
    display flex
    margin-bottom 6px
    &:last-child
      margin-bottom 0
  &__flat
    size 30px
    color #fff
    display flex
    min_size 30px
    cursor pointer
    margin-right 6px
    border-radius 30px
    align-items center
    justify-content center
    background-color #2e3541
    border 1px solid transparent
    &.sold
      opacity .5
      background none
      border-color #f6ac6d
    &.hidden
      opacity .05
    &.booked
      color #2e3541
      background-color #f6ac6d
  &__col
    &__title
      color #fff
      margin-bottom 8px
      font-size rem(14px)
  &__number-storey
    color #fff
    display flex
    cursor pointer
    size 100% 30px
    font-weight 700
    align-items center
    font-size rem(20px)
    justify-content center
    font-family 'Heading Pro Wide'
    &.active
      color #f6ac6d
.liter-liter
  color #fff
  line-height 1
  font-size 14px
  padding-top 5px
  text-transform uppercase
  font-family 'Heading Pro Wide'
</style>
