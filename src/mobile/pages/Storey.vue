<template lang="pug"> .storey
  Liter(
    v-if="isLiter"
    :mobileMenuContext="mobileMenuContext"
    :litersIdNumber="litersIdNumber"
    :id="id"
    :dataStoreys="dataStoreys"
    :dataStorey="dataStorey"
    :literNumber="literNumber"
    :rooms="rooms"
  )
  template(v-if="!isLiter && !flatId")
    .top
      .top__left
        .number-storey {{ storeyNumber }} этаж
        .storey-changer
          .storey-changer__btn(
            @click="changeStorey('up')"
            :class="{'storey-changer__btn--disable':!checkStoreyUp}"
          )
          .storey-changer__btn.storey-changer__btn--bottom(
            @click="changeStorey('down')"
            :class="{'storey-changer__btn--disable':!checkStoreyDown}"
          )
      .top__right Литер {{ literNumber }}
    .storey-svg-scroll(v-if="dataStorey" ref="svg"): smooth-scrollbar: .storey-svg-wrapper(
      :style="{width:`${dataStorey.svg.viewBox.width/2}px`}"
    )
      svg.storey__svg(xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${dataStorey.svg.viewBox.width} ${dataStorey.svg.viewBox.height}`" version="1.1" width="100%" height="100%" preserveAspectRatio="xMinYMin meet")
        g: path.storey__path(v-for="path in dataStorey.svg.paths" :d="path.d" :class="path.status")
        image(:xlink:href="isLoaded(dataStorey.svg.image)" width="100%" height="100%")
        g: path.storey__path-click(v-for="path in dataStorey.svg.paths" :d="path.d" :class="path.status" @click="selectFlat(path.id)")
    .storey-street улица Рихарда Зорге
    back-to(to="/filter" icon="filter") Подбор по параметрам
  Flat(v-if="flatId")
</template>

<script>
import Flat from './../components/Flat'
import Liter from './../components/Liter'
import BackTo from './../components/BackTo'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {Liter, Flat, BackTo},
  computed: {
    ...mapGetters({
      mobileMenuContext: 'menu/mobileMenuContext',
      litersIdNumber: 'filter/litersNumber',
      storeys: 'house/storeys'
    }),
    id () {
      let id = null
      if (this.isLiter) {
        const storey = this.storeys.filter(({houseId}) => Number(this.$route.params.storeyId) === houseId)
        if (storey.length) {
          id = storey[0].ids[0]
        }
      } else {
        id = this.$route.params.storeyId
      }
      return Number(id)
    },
    dataHouse () {
      return this.getHouseWithChessboard({storey: this.id})
    },
    isLiter () {
      return this.$route.query.mobile !== undefined && !this.$route.params.flatId
    },
    flatId () {
      return this.$route.params.flatId
    }
  },
  asyncComputed: {
    async dataStoreys () {
      const data = await this.dataHouse
      if (data.storeys) {
        const storeys = data.storeys.sort((a, b) => b.number - a.number)
        return storeys.map(storey => {
          storey.flats.sort((a, b) => a.number - b.number)
          return storey
        })
      } else {
        return []
      }
    },
    async dataStorey () {
      if (this.dataStoreys) {
        // eslint-disable-next-line
        return await this.getStorey({storey: this.id, data: this.dataStoreys})
      }
    },
    async literNumber () {
      const data = await this.dataStorey
      if (data) {
        return this.litersIdNumber[data.houseId]
      }
    },
    async storeyNumber () {
      const data = await this.dataStorey
      if (data) {
        return data.number
      }
    },
    async rooms () {
      const data = await this.dataHouse
      return data.roomsNumber.sort((a, b) => a - b)
    },
    checkStoreyUp () {
      if (this.dataStoreys) {
        return this.changeStorey('up', false)
      }
    },
    checkStoreyDown () {
      if (this.dataStoreys) {
        return this.changeStorey('down', false)
      }
    }
  },
  beforeDestroy () {
    if (this.$refs.svg) {
      this.$refs.svg.removeEventListener('touchstart', this.menuLock)
      this.$refs.svg.removeEventListener('touchend', this.menuUnLock)
    }
  },
  methods: {
    ...mapActions({
      getHouseWithChessboard: 'house/getHouseWithChessboard',
      getStorey: 'house/getStorey',
      getLiterIdByNumber: 'filter/getLiterIdByNumber'
    }),
    menuLock () {
      this.mobileMenuContext.lock = true
    },
    menuUnLock () {
      this.mobileMenuContext.lock = false
    },
    isLoaded (image) {
      if (this.flatId) {
        return image
      } else {
        const img = new Image()
        img.src = image
        img.onload = () => {
          this.$refs.svg.addEventListener('touchstart', this.menuLock)
          this.$refs.svg.addEventListener('touchend', this.menuUnLock)
          this.loaderHide()
        }
        return img.src
      }
    },
    changeStorey (type, redirect = true) {
      let status = false
      let currentNumber = this.storeyNumber
      if (type === 'up') {
        ++currentNumber
      } else if (type === 'down') {
        --currentNumber
      }
      this.dataStoreys.forEach(storey => {
        if (currentNumber === storey.number && this.storeyNumber !== currentNumber && storey.svg.image) {
          if (redirect) {
            this.$router.push('/select/' + storey.id)
            document.querySelector('.vld-overlay').remove()
          }
          status = true
        }
      })
      return status
    },
    selectFlat (id) {
      this.$router.push('/select/' + this.id + '/' + id)
    }
  }
}
</script>

<style scoped lang="stylus">
.storey
  padding-bottom 20px
.storey-street
  width 100%
  line-height 1
  font-size 14px
  text-align center
  padding-bottom 20px
  color rgba(255,255,255,.7)
.storey-svg-scroll
  width 100%
  overflow hidden
  padding 0 20px 20px
  & >>> .scrollbar-track-x
    top -22px
.number-storey
  color #f6ac6d
  line-height 1
  font-size 23px
  font-weight 700
  margin-right 10px
  letter-spacing 2.19px
  text-transform uppercase
  font-family 'Heading Pro Wide'
.top
  display flex
  padding 20px
  align-items center
  justify-content space-between
  &__left
    display flex
    align-items center
  &__right
    color #fff
    font-size 14px
    font-weight 400
    line-height 20.58px
    text-transform uppercase
    font-family 'Heading Pro Wide'
.storey-changer
  &__btn
    size 22px
    cursor pointer
    position relative
    border-radius 22px
    background-color #f6ac6d
    &:after
      size 6px
      content ''
      transform rotate(45deg)
      absolute left 8px top 9px
      border-top 1px solid #000
      border-left 1px solid #000
    &--bottom
      margin-top 5px
      &:after
        top 7px
        transform rotate(-135deg)
    &--disable
      opacity .15
.storey
  user-select none
  &__path-click
    cursor pointer
    fill transparent
    &.sold
      fill rgba(31, 37, 47, .5)
  &__path
    fill #2e3541
    &.booked
      fill #b7875b
    &.sold
      fill transparent
    &.free
      transition fill .15s ease-in-out
      &.hover
        fill #38404f
</style>
