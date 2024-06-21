<template lang="pug">
.filter
  .box-wrapper
    .title Комнат
    .cirlce-boxes__items
      .cirlce-boxes__item(
        :class="{'cirlce-boxes__item--active': filter.rooms_min === number && filter.rooms_max === number}"
        v-for="number in 4"
        @click="setFilterRooms(number)"
      ): .cirlce-boxes__item__wrapper: .cirlce-boxes__item__wrapper__number {{ number }}
  .slider
    .slider__title.title Площадь
    vue-slider(
      :value="values.square" @change="setFilterSquare" lazy :min="41" :max="146" :tooltip="'always'"
    )
  .slider
    .slider__title.title Этаж
    vue-slider(
      :value="values.storey" @change="setFilterStorey" lazy :min="2" :max="23" :tooltip="'always'"
    )
  .box-wrapper
    .title Литер
    .cirlce-boxes__items
      .cirlce-boxes__item(
        :class="{'cirlce-boxes__item--active': filter.house_id === id}"
        v-for="(label, id) in housesMap"
        @click="filter.house_id = id"
      ): .cirlce-boxes__item__wrapper: .cirlce-boxes__item__wrapper__number {{ label }}
  back-to(to="/parking" icon="parking" removeBack style="position: static; margin-bottom: 20px") Выбрать паркинг
  .d-flex.justify-content-between.align-items-center(style="white-space:nowrap")
    .result(style="padding-right:0;")
      div Найдено:&nbsp;
        span {{ flats ? flats.length : 0 }} квартир
        <!--      svg: use(xlink:href="/static/sprite.svg#arrow-small")-->
    .filter-reset(@click="resetFilter")
      svg: use(xlink:href="/static/sprite.svg#close")
      | сбросить фильтр
  .table
    .table-head
      .table-head__item(
        v-for="col in cols"
        :style="{'flex-basis':100/(cols.length-1) + '%'}"
      ): .d-flex.align-items-center {{ col.name }}
        svg: use(xlink:href="/static/sprite.svg#triangle")
    .table-results: div(style="height: 600px; overflow-x:hidden")
      .table-results__item(v-for="item in flats" :class="item.status" @click="onUpdateFlat(item)")
        .col(:style="{'flex-basis':100/cols.length + '%'}") {{ $store.state.filter.houses[item.house] }}
        .col(:style="{'flex-basis':100/cols.length + '%'}") {{ item.rooms_number }}
        .col(:style="{'flex-basis':100/cols.length + '%'}") {{ item.storey_number }}
        .col(:style="{'flex-basis':100/cols.length + '%'}") {{ item.total_area }}
    back-to(to="/select" icon="filter") Подбор на фасаде
  Flat(v-if="showedFlatId" :flatId="showedFlatId" :key="showedFlatId")
</template>

<script>
import BackTo from '../components/BackTo'
import {mapGetters} from 'vuex'
import VueSlider from 'vue-slider-component'
import Flat from '../components/Flat.vue';
import { list } from '@/api/flats';
import { show as showStorey } from '@/api/storeys';

function filterTemplateValuesInit() {
  return {
    storey: [2, 23],
    square: [41, 146]
  }
}

export default {
  components: {VueSlider, BackTo, Flat},
  async created() {
    if(this.$route.query.storeyId) {
      try {
        const { data: { data: { number } } } = await showStorey(this.$route.query.storeyId);
        this.filter.storey_min = number;
        this.filter.storey_max = number;
        this.setFilterStorey([number, number]);
      } catch(e) {
        console.log(e);
      }
    } else {
      await this.getFlats();
    }
  },
  data() {
    return {
      flats: null,
      filter: this.filterInit(),
      values: filterTemplateValuesInit()
    }
  },
  beforeDestroy() {
    this.$store.commit('variables/footerShow', true);
    this.$store.commit('variables/phoneBlackMode', false);
    this.$store.commit('variables/topButtonsShow', true);
    this.$store.commit('variables/phoneTextVisible', true);
  },
  async mounted() {
    document.body.style['overflow'] = 'auto';
    this.$store.commit('variables/footerShow', false);
    this.$store.commit('variables/phoneBlackMode', true);
    this.$store.commit('variables/topButtonsShow', false);
    this.$store.commit('variables/phoneTextVisible', false);
  },
  computed: {
    ...mapGetters('filter', { housesMap: 'houses' }),
    ...mapGetters({ cols: 'filter/cols' }),
    isBack() {
      return this.$route.params.isBack;
    },
    showedFlatId: {
      get() {
        if(!this.$route.query.flatId) return null;
        return Number(this.$route.query.flatId);
      },
      set(value) {
        if(!value) value = undefined;
        this.$router.push({ query: { ...this.$route.query, flatId: value } });
      }
    }
  },
  watch: {
    filter: {
      handler() {
        this.getFlats();
      },
      deep: true,
    }
  },
  methods: {
    filterInit() {
      return {
        rooms_min: null,
        rooms_max: null,
        house_id:  this.$route.query.houseId || null,
        storey_min: null,
        storey_max: null,
        total_area_min: null,
        total_area_max: null,
        status: 'free'
      }
    },
    resetFilter() {
      this.filter = this.filterInit();
      this.values = filterTemplateValuesInit();
    },
    setFilterSquare(value) {
      this.values.square = value;
      this.filter.total_area_min = value[0];
      this.filter.total_area_max = value[1];
    },
    setFilterStorey(value) {
      this.values.storey = value;
      this.filter.storey_min = value[0];
      this.filter.storey_max = value[1];
    },
    setFilterRooms(count) {
      this.filter.rooms_min = count;
      this.filter.rooms_max = count;
    },
    notNullFilter(filter) {
      const values = Object.entries(filter).filter(entry => entry[1] !== null);
      return Object.fromEntries(values);
    },
    async getFlats() {
      const filter = this.notNullFilter(this.filter);
      const { data } = await list(filter);
      this.flats = data.data;
      this.loaderHide();
    },
    onUpdateFlat(flat) {
      // this.showedFlatId = null;
      this.showedFlatId = flat.id;
      // setTimeout(() => {
      // }, 0);
    },
  },
}
</script>

<style scoped lang="stylus">
.filter
  padding-top 25px
.filter-reset
  color #fff
  display flex
  line-height 1
  cursor pointer
  user-select none
  width fit-content
  align-items center
  font-size rem(12px)
  margin 0 20px 15px auto
  text-decoration underline
  svg
    size 9px
    fill #fff
    margin-top 2px
    margin-right 7px
.uniqueness
  position relative
  select
    size 100%
    opacity 0
    z-index 1
    absolute left 0 top 0
  &__value
    padding 0 20px 0
    margin-bottom 15px
    &__wrapper
      padding 10px
      color #181F29
      line-height 1
      font-size 10px
      font-weight 500
      position relative
      text-transform uppercase
      background-color #f6ac6d
      font-family Heading Pro Wide
      &:after
        content ''
        border-style solid
        border-width 5px 5px 0
        absolute right 10px top 13px
        border-color #181F29 transparent transparent
.box-wrapper
  display flex
  align-items center
  padding 0 20px 25px
.title
  color #fff
  width 70px
  line-height 1
  font-size 10px
  min-width 70px
  flex-basis 70px
  font-weight 500
  text-transform uppercase
  font-family Heading Pro Wide
.cirlce-boxes
  &__items
    width 100%
    display flex
    align-items center
  &__item
    width 25%
    color #fff
    display flex
    line-height 1
    cursor pointer
    font-weight 700
    user-select none
    padding-left 15px
    align-items center
    font-size rem(14px)
    justify-content flex-end
    text-transform uppercase
    font-family 'Heading Pro Wide'
    &__wrapper
      width 100%
      display flex
      max-width 45px
      position relative
      align-items center
      border-radius 40px
      justify-content center
      border 2px solid transparent
      background-origin border-box
      background-clip content-box, border-box
      background-image linear-gradient(#181f29, #181f29), linear-gradient(to top, #764419, #f5ab6c)
      &:before
        content ''
        display block
        padding-top 100%
      &__number
        absolute left 50% top 50%
        transform translate(-50%, -50%)
    &--active &__wrapper
      color #1f252f
      background-color #f6ac6d
      background-image linear-gradient(#f6ac6d, #f6ac6d), linear-gradient(#f6ac6d, #f6ac6d)
.slider
  position relative
  padding 10px 20px 45px
  & >>>
    .vue-slider
      height 2px!important
      padding 10px 13px!important
      &:before
        content ''
        size 100% 2px
        absolute left 0 top 50%
        background-color #535150
        transform translateY(-50%)
    .vue-slider-rail
      border-radius 0
      background-color #535150!important
    .vue-slider-process
      background-color #f6ac6d!important
    .vue-slider-dot
      width 25px!important
      height 25px!important
      &-handle
        border 0
        box-shadow none
        &:after
          size 10px
          content ''
          border-radius 10px
          background-color #a67042
          absolute left 50% top 50%
          transform translate(-50%, -50%)
        &:before
          size 25px
          content ''
          border-radius 25px
          background-color #1f262e
          border 2px solid #f6ac6d
          absolute left 50% top 50%
          transform translate(-50%, -50%)
    .vue-slider-dot-tooltip
      top 100%
      cursor pointer
      transform translate(-50%, 0)
    .vue-slider-dot-tooltip-inner
      padding 0
      color #fff
      line-height 1
      background none
      font-weight 700
      margin-top 10px
      font-size rem(12px)
      text-transform uppercase
      font-family 'Heading Pro Wide'
      &:after
        display none
  &__title
    z-index 2
    width auto
    padding 0 10px
    min-width auto
    flex-basis auto
    background-color #181f29
    absolute left 50% top 15px
    transform translateX(-50%)
.result
  color #fff
  display flex
  font-weight 500
  align-items center
  font-size rem(10px)
  padding 5px 20px 15px
  text-transform uppercase
  justify-content space-between
  font-family 'Heading Pro Wide'
  span
    color #f6ac6d
  svg
    fill #f6ac6d
    size 18px 22px
    margin-left 20px
.table
  padding-bottom 20px
  background-color #fff
  & >>> .icon-border
    background-color #1F252F
.table-head
  display flex
  padding 0 20px
  justify-content space-between
  &__item
    display flex
    line-height 1
    color #1f252f
    font-weight 600
    user-select none
    text-align center
    white-space nowrap
    font-size rem(14px)
    padding 15px 0 20px
    justify-content center
    text-transform lowercase
    div
      cursor pointer
    svg
      fill #cecece
      size 7px 4px
      margin-left 5px
    &--active svg
      fill #1f252f
    &--desc svg
      transform scale(-1)
.table-results
  padding-bottom 20px
  &__item
    display flex
    text-align center
    align-items center
    padding 16px 37px 13px 20px
    justify-content space-between
    & + &
      border-top 1px solid #C5C5C5
    &__col
      color #1F252F
      line-height 1
      font-size 16px
      font-weight 600
      font-family 'Heading Pro Wide'
    &.booked
      position relative
      &:before
        size 12px
        content ''
        margin-top -6px
        border-radius 12px
        absolute left 15px top 50%
        background-color #f6ac6d
</style>
