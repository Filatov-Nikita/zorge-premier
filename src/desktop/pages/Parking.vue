<template lang="pug">
.storey
  transition
    div.popup(v-if="hoverPath !== null" :style="{ left: popupCoords.left + 'px', top: popupCoords.top + 'px' }")
      div.popup__title квартира №{{popupCoords.flat.id}}
      div.popup__content
        div.popup__subtitle м2, площадь
        div.popup__value {{ popupCoords.flat.total_area }}
  Logo
  .storey__row(v-if="true")
    .storey__left: .storey__left__wrapper
      .proposed-page-wrap: proposed-page(to="/select") Подбор на фасаде
      .storey__left__row
        .storey__left__row__col-1
          .position-relative.h-100
            svg(
              class="area"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1040 740"
              width="100%"
              height="100%"
            )
              template(v-if="levelData")
                image(:xlink:href="level === '-1' ? require('@/desktop/assets/images/-1.png') : require('@/desktop/assets/images/-2.png')")
                path(
                    v-for="flat in levelData.image_maps[0].flats"
                    class="place"
                    :class="{ 'place-active':  selected === flat.id}"
                    :d="flat.polygon"
                    :fill="flat.status === 'sold' ? 'red' : '#F6AC6D'"
                    @click="select(flat)"
                  )
        .storey__left__row__col-2
          div
            .storey__attrs
              .storey__attr
                .storey__attr__title Литер
                .storey__attr__line
                .storey__attr__value {{ housesMap[houseId] }}
              .storey__attr
                .storey__attr__title Уровень
                .storey__attr__line
                .storey__attr__value
                  .filter-panel__rooms
                    .filter-panel__room(
                      :class="{ 'filter-panel__room--active': i === level }"
                      v-for="i in ['-1', '-2']"
                      @click="level = i"
                    ) {{ i }}
            .storey__liter-mini-wind-rose
              liters-mini(:value="houseId" @input="changeLiter")
              wind-rose.storey__wind-rose

    .storey__right
      smooth-scrollbar
        FormUserData(:theme="`Забронировать машиноместо №${ (placeIdsMap && selected) ? placeIdsMap[selected] : 'XXX' }`")
</template>

<script>
import ProposedPage from '../components/ProposedPage'
import Logo from '../components/Logo'
import LitersMini from '../components/LitersMini'
import WindRose from '../components/WindRose';
import FormUserData from '../components/FormUserData.vue'
import { mapGetters } from 'vuex'
import * as StoreysAPI from '@/api/storeys';

export default {
  components: { Logo, ProposedPage, LitersMini, WindRose, FormUserData },
  data: () => ({
    level: '-1',
    levelStoreyId: {
      '-1': 48,
      '-2': 47
    },
    selected: null,
    levelData: null,
    hoverPath: null,
    popupCoords: {
      left: 0,
      top: 0
    }
  }),
  computed: {
    ...mapGetters('filter', { housesMap: 'houses' }),
    houseId () {
      return Number(this.$route.query.houseId)
    },
    placeIdsMap() {
      if(!this.levelData) return null;
      return Object.entries(this.levelData.flats).reduce((acc, item) => {
        acc[item[1]] = item[0];
        return acc;
      }, {})
    }
  },
  watch: {
    async level(val) {
      this.getStorey(this.levelStoreyId[val]);
    }
  },
  beforeDestroy () {
    this.$store.commit('variables/yesidea', true)
    this.$store.commit('variables/phoneHidden', false)
    this.$store.commit('variables/yesideaIndex102', true)
  },
  async mounted () {
    if (!this.houseId) {
      this.$router.back()
      return false
    }

    this.loaderHide();

    this.$store.commit('variables/yesidea', false)
    this.$store.commit('variables/phoneHidden', true)
    this.$store.commit('variables/yesideaIndex102', false)
  },
  async created() {
    this.getStorey(this.levelStoreyId[this.level])
   },
  methods: {
    async changeLiter(houseId) {
      this.$router.push({ query: { houseId }})
    },
    async getStorey(id) {
      this.levelData = null;
      this.selected = null;
      const { data: { data } } = await StoreysAPI.show(id);
      this.levelData = data;
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
    select(flat) {
      if(flat.status === 'sold') {
        this.selected = null;
        return this.$notify({ type: 'error', text: 'Место уже продано' });
      }

      if(this.selected === flat.id) return this.selected = null;
      this.selected = flat.id;
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
        padding-right 30px
        padding-bottom: 86px
      &__col-2
        display flex
        min-width 290px
        flex-basis 290px
        flex-direction column
        justify-content space-between
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

.filter-panel {
  user-select: none;

  &__result {
    color: #fff;
    font-weight: 700;
    font-size: rem(20px);
    text-transform: uppercase;
    letter-spacing: rem(4.4px);
    font-family: 'Heading Pro Wide';

    span {
      color: #f6ac6d;
    }

    svg {
      fill: #f6ac6d;
      size: 18px 25px;
      margin-left: 20px;
    }
  }

  &__line {
    width: 100%;
    display: flex;
  }

  &__left {
    padding-right: 100px;
    flex-basis: calc(100% - 200px);
  }

  &__right {
    flex-basis: 200px;

    +below(1440px) {
      flex-basis: 150px;
    }

    &__title {
      display: flex;
      size: 100% 68px;
      align-items: center;

      +below(1440px) {
        height: 50px;
      }
    }
  }

  &__rooms {
    display: flex;
    align-items: center;

    &__title {
      margin-left: 20px;
    }
  }

  &__room {
    size: 40px;
    color: #fff;
    line-height: 1;
    cursor: pointer;
    letter-spacing: initial;
    font-weight: 600;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid transparent;
    border-radius: 50%;
    font-size: 16px;
    font-family: 'Heading Pro Wide';
    background-origin: border-box;
    background-clip: content-box, border-box;
    background-image: linear-gradient(#1f252f, #1f252f), linear-gradient(to top, #764419, #f5ab6c);

    &--active {
      color: #1f252f;
      background-color: #f6ac6d;
      background-image: linear-gradient(#f6ac6d, #f6ac6d), linear-gradient(#f6ac6d, #f6ac6d);
    }

    & + & {
      margin-left: 15px;
    }
  }
}

.place
  opacity 0
  cursor: pointer
  &:hover
    opacity 0.3
  &-active {
    opacity: 0.5 !important
  }

.area {
  width: 120%;
  height: 110%;
  max-width: 1200px;
  min-width: 475px
  margin-top: -50px;
  margin-left: -60px;
}
</style>
