<template lang="pug">
.storey
  transition
    div.popup(v-if="hoverPath !== null" :style="{ left: popupCoords.left + 'px', top: popupCoords.top + 'px' }")
      div.popup__title квартира №{{popupCoords.flat.id}}
      div.popup__content
        div.popup__subtitle м2, площадь
        div.popup__value {{ popupCoords.flat.total_area }}
  Logo
  .storey__row(v-if="content")
    .storey__left: .storey__left__wrapper
      .proposed-page-wrap: proposed-page(to="/select") Подбор на фасаде
      .storey__left__row
        .storey__left__row__col-1
          .position-relative.h-100
            svg.storey__svg(v-if="content.image_maps" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1" width="100%" height="100%")
              image(:xlink:href="currentStorey.image_maps[0].path" width="100%")
              g
                path.storey__path(
                      v-for="(flat, i) in currentStorey.image_maps[0].flats"
                      :d="flat.polygon"
                      :fill-opacity="hoverPath === i ? 0.5 : 0" :class="['svg-flat', flat.status]"
                      @mousemove="pathHover($event, i, flat, 'over')"
                      @mouseout="pathHover($event, i, flat, 'out')"
                      @click="showFlat(flat.id)"
                    )
          .storey__street улица Рихарда Зорге
        .storey__left__row__col-2
          div
            .storey__attrs
              .storey__attr
                .storey__attr__title Литер
                .storey__attr__line
                .storey__attr__value {{ housesMap[houseId] }}
              .storey__attr
                .storey__attr__title Этаж
                .storey__attr__line
                .storey__attr__value {{ currentStorey.number }}
            .storey__liter-mini-wind-rose
              liters-mini(:value="houseId" @input="changeLiter")
              wind-rose.storey__wind-rose
            proposed-page(:to="{ name: 'parking', query: { houseId } }" icon="parking" style="width: 100%")
              span(style="font-size: 10px; letter-spacing: initial") выбрать паркинг
          //- div
          //-   .storey__status
          //-     .storey__status__circle.free
          //-     .storey__status__title В продаже
          //-   .storey__status
          //-     .storey__status__circle.booked
          //-     .storey__status__title Забронированно
          //-   .storey__status
          //-     .storey__status__circle.sold
          //-     .storey__status__title Продано
    .storey__right
      //- .storey-number-rooms
      //-   .storey-number-rooms__title Комнат
      //-   .storey-number-rooms__items: .storey-number-rooms__item(
      //-     v-for="number in 4"
      //-     :class="[checkedRooms.length && !checkRoomsClass(number) ? 'active' : '']"
      //-     @click="toggleCheckRooms(number)"
      //-   ) {{ number }}
      .storey-chess
        .storey-chess__col.pr-3
          .storey-chess__col__title Этаж
        .storey-chess__col
          .storey-chess__col__title Квартиры
      smooth-scrollbar: .storey-chess
        .storey-chess__col.pr-3
          .storey-chess__line(v-for="(storey) in content.storeys")
            .storey-chess__number-storey(
              @click="changeStorey(storey[1])"
              :class="{'active': storey[1] === id}"
            ) {{ storey[0] }}
        .storey-chess__col
          .storey-chess__line(v-for="storey in content.storeysDetailed")
            .storey-chess__flat(
              v-for="flat in storey.flats"
              :class="[flat.status]"
              @click="showFlat(flat)"
              ) {{ flat }}
  Flat(v-if="flatShow" :flatId="flatShow" @close="flatShow = null")
  //- checkRoomsClass(flat.rooms_number) ? 'hidden' : ''
</template>

<script>
import ProposedPage from '../components/ProposedPage'
import Logo from '../components/Logo'
import LitersMini from '../components/LitersMini'
import { mapGetters } from 'vuex'
import Flat from '../components/Flat'
import WindRose from '../components/WindRose';
import { show as showStorey } from '@/api/storeys';
import { show as showEntrance } from '@/api/entrances';
import { show as showFlat } from '@/api/flats';

export default {
  components: { Logo, ProposedPage, LitersMini, Flat, WindRose },
  data: () => ({
    svgImage: null,
    checkedRooms: [],
    storeyNumber: null,
    hoverPath: null,
    flatShow: null,
    content: null,
    currentStorey: null,
    popupCoords: {
      left: 0,
      top: 0
    }
  }),
  computed: {
    ...mapGetters('filter', { housesMap: 'houses' }),
    id () {
      return Number(this.$route.params.storeyId)
    },
    houseId () {
      return Number(this.$route.query.houseId)
    },
    viewBox() {
      if(this.houseId === 3 && this.id === 26) return '0 0 1599 2138';
      else if(this.houseId === 3) return '0 0 574 768';
      else return '0 0 1500 1206';
    }
  },
  watch: {
    async houseId(id) {
      this.loaderShow();
      const [ houseId, data ] = await this.getEntrance(id);
      if(data && data.storeys) this.$router.push(
        { params: { storeyId: Object.values(data.storeys)[0][1] }, query: { houseId } }
      )
    },
    async id(value) {
      this.load(value)
    }
  },
  beforeDestroy () {
    this.$store.commit('variables/yesidea', true)
    this.$store.commit('variables/phoneHidden', false)
    this.$store.commit('variables/yesideaIndex102', true)
  },
  async mounted () {
    window.router = this.$router;
    if (!this.id || !this.houseId) {
      this.$router.back()
      return false
    }

    this.$store.commit('variables/yesidea', false)
    this.$store.commit('variables/phoneHidden', true)
    this.$store.commit('variables/yesideaIndex102', false)
  },
  async created() {
    this.load(this.id)
  },
  methods: {
    async load(storeyId) {
      this.currentStorey = await this.getStorey(storeyId);
      await this.getData();
      this.loaderHide();
    },
    async getData() {
      const entries = await this.getEntrance(this.houseId);
      this.content = entries[1];
    },
    async getEntrances() {
      return Promise.all(Object.keys(this.housesMap).map(this.getEntrance));
    },
    async getStoreys(ids) {
      return Promise.all(Object.values(ids).map(this.getStorey));
    },
    async getStorey(storeyId) {
      const { data: { data } } = await showStorey(storeyId);
      // const flats = await this.getFlats(data.flats);
      // data.flatsDetailed = flats;
      return data;
    },
    async getEntrance(houseId) {
      const { data: { data } } = await showEntrance(houseId);
      const storeys = await this.getStoreys(data.storeys);
      data.storeys = Object.entries(data.storeys).sort((a, b) => b[0] - a[0]);
      data.storeysDetailed = storeys.reverse();
      return [ houseId, data ];
    },
    async getFlats(ids) {
      return Promise.all(Object.values(ids).map(this.getFlat));
    },
    async getFlat(flatId) {
      const { data: { data } } = await showFlat(flatId);
      return data;
    },
    async changeLiter (houseId) {
      this.$router.push({ query: { houseId }});
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
    showFlat (id) {
      this.flatShow = id
    },
    pathHover (e, i, flat, type) {
      if(type === 'over') {
        this.hoverPath = i;
      } else {
        this.hoverPath = null;
      }

      this.popupCoords = {
        left: e.clientX,
        top: e.clientY,
        flat
      }
    },
    changeStorey (storeyId) {
      this.$router.push({ params: { storeyId }, query: { houseId: this.houseId } })
    },
    isLoaded (image) {
      if (this.flatId) {
        return image
      } else {
        const img = new Image()
        img.src = image
        img.onload = () => {
          this.loaderHide()
        }
        return img.src
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.popup
  padding 35px 28px
  background #fff
  position absolute
  z-index 900
  transform: translateY(-120%) translateX(0%);
  font-family: 'Heading Pro Wide';
  &__title
    letter-spacing: 0.22em
    font-weight: 600
    font-size: 16px
    line-height: 22px
    text-align: center
    text-transform: uppercase
    color: #1F252F
    margin-bottom: 15px
  &__subtitle
    font-weight: 500
    font-size: 10px
    line-height: 16px
    color: #AFAFAF
    margin-bottom: 4px
  &__value
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    color: #2E3541;

.proposed-page-wrap
  padding-bottom 90px
  & >>> .proposed-page
    margin-bottom 0
.storey-chess
  display flex
  line-height 1
  overflow hidden
  &__line
    display flex
    margin-bottom 6px
  &__flat
    size 30px
    color #fff
    display flex
    cursor pointer
    padding-top 4px
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
      color #1f252f
      background-color #b7875b
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
.storey-number-rooms
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
    padding-top 4px
    margin-right 6px
    border-radius 30px
    align-items center
    justify-content center
    border 2px solid #f6ac6d
    &.active
      color #1f252f
      background-color #f6ac6d
.storey
  user-select none
  &__wind-rose
    flex-basis 45%
    text-align right
    padding-left 30px
  &__svg
    size 100%
    absolute left 0 top 0
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
      fill red
    &.free
      transition fill .15s ease-in-out
      &.hover
        fill #38404f
  &__attrs
    margin-bottom 60px
  &__attr
    display flex
    line-height 1
    font-weight 700
    margin-bottom 12px
    align-items center
    font-size rem(20px)
    letter-spacing 4.4px
    text-transform uppercase
    font-family 'Heading Pro Wide'
    justify-content space-between
    &__title
      color #fff
    &__value
      color #f6ac6d
    &__line
      margin 0 20px
      size 100% 1px
      flex-basis 100%
      background-color rgba(255, 255, 255, .11)
  &__liter-mini-wind-rose
    display flex
    align-items flex-start
    & >>> .liters-mini
      flex-basis 55%
  &__row
    display flex
    size 100% 100vh
  &__street
    width 100%
    line-height 1
    font-size 15px
    text-align center
    padding-right 50px
    color rgba(255,255,255,.7)
    absolute left 0 bottom 10px
  &__left
    flex-basis 100%
    background-color #151c27
    padding 25px 45px 75px 35px
    +below(1440px)
      padding 25px 25px 85px 35px
    &__wrapper
      size 100%
      display flex
      flex-direction column
    &__row
      size 100%
      display flex
      padding-bottom 50px
      &__col-1
        flex-basis 100%
        position relative
        padding-right 50px
        padding-bottom 45px
      &__col-2
        display flex
        min-width 290px
        flex-basis 290px
        flex-direction column
        justify-content space-between
        +below(1440px)
          min-width 230px
          flex-basis 230px
  &__right
    z-index 100
    display flex
    min-width 450px
    flex-basis 450px
    position relative
    flex-direction column
    padding 175px 25px 25px
    background-color #1f252f
  &__status
    display flex
    align-items center
    & + &
      margin-top 12px
    &__circle
      size 30px
      flex-basis 30px
      margin-right 12px
      border-radius 30px
      &.free
        background-color #2e3541
      &.booked
        background-color #b7875b
      &.sold
        opacity .5
        border 1px solid #f6ac6d
    &__title
      color #fff
      line-height 1

.svg-flat
  cursor pointer;
</style>
