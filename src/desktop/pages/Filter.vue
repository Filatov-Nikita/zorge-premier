<template lang="pug"> div
  div
    top-buttons
    Logo
    .container: .filter-container
      proposed-page(to="/select") Подбор на фасаде
      .filter-panel
        .filter-panel__line
          .filter-panel__left
            .row
              .col-md-7: .filter-panel__rooms
                .filter-panel__room(
                  :class="{ 'filter-panel__room--active': filter.rooms_min === i && filter.rooms_max === i }"
                  v-for="i in 4"
                  @click="setFilterRooms(i)"
                ) {{ i }}
                .filter-panel__rooms__title.title Комнат
              .col-md-5
                proposed-page(v-show="filter.house_id" :to="{ name: 'parking', query: { houseId: filter.house_id } }" icon="parking" style="margin: 0;") выбрать паркинг
            .row
              .col-md-5
                .slider
                  .slider__name Площадь
                  vue-slider(:value="values.square" @change="setFilterSquare" lazy :min="41" :max="146" :tooltip="'always'")
              .col-md-2
              .col-md-5
                .slider
                  .slider__name Этаж
                  vue-slider(:value="values.storey" @change="setFilterStorey" lazy :min="2" :max="23" :tooltip="'always'")
          .filter-panel__right
            .filter-panel__right__title.title Литер
            liters-mini(v-model="filter.house_id")
        .filter-panel__line.align-items-center
          .filter-panel__left
            .filter-panel__result Найдено:&nbsp;
              span {{ flats ? flats.length : 0 }} квартир
              svg: use(xlink:href="/static/sprite.svg#arrow-small")
          .filter-panel__right
            .filter-reset(@click="resetFilter")
              svg: use(xlink:href="/static/sprite.svg#close")
              | сбросить фильтр
    .filter-white: .filter-white__container: .container: .row
      .col-md-9: filter-table(v-if="flats" :items="flats" @update:flat="onUpdateFlat")
      .col-md-3
        router-link(to="/concepts").filter-picture
          img(alt src="./../assets/images/about-picture-8.png")
          .filter-picture__name Подробнее о <br>преимуществах
        router-link(to="/engineering").filter-picture
          img(alt src="./../assets/images/about-picture-16.png")
          .filter-picture__name Инженерия
    Footer(:static="true")
  Flat(v-if="flatShowed" :flatId="flatShowed.id")
</template>

<script>
import Logo from '../components/Logo';
import VueSlider from 'vue-slider-component';
import FilterTable from '../components/FilterTable';
import TopButtons from '../components/TopButtons';
import Footer from '../components/Footer';
import ProposedPage from '../components/ProposedPage';
import LitersMini from '../components/LitersMini';
import Flat from '../components/Flat';
import Multiselect from 'vue-multiselect';
import { list } from '@/api/flats';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'vue-slider-component/theme/antd.css';

function filterInit() {
  return {
      rooms_min: null,
      rooms_max: null,
      house_id: null,
      storey_min: null,
      storey_max: null,
      total_area_min: null,
      total_area_max: null,
      status: 'free'
    }
}

function filterTemplateValuesInit() {
  return {
    storey: [2, 23],
    square: [41, 146]
  }
}

export default {
  components: {
    Logo,
    VueSlider,
    FilterTable,
    TopButtons,
    Footer,
    ProposedPage,
    LitersMini,
    Flat,
    Multiselect,
  },
  async created() {
    await this.getFlats();
    this.loaderHide();
  },
  data: () => ({
    flatShowed: null,
    flats: null,
    filter: filterInit(),
    values: filterTemplateValuesInit()
  }),
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
    isBack() {
      return this.$route.params.isBack;
    },
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
    resetFilter() {
      this.filter = filterInit();
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
      this.flats = data.data.filter(flat => flat.rooms_number !== 0);
    },
    onUpdateFlat(flat) {
      this.flatShowed = flat;
    },
  },
};
</script>

<style scoped lang="stylus">
>>> .multiselect__option--selected.multiselect__option--highlight:after {
  content: attr(data-selected);
}

.multiselect {
  &, & >>> &__select, & >>> &__tags {
    height: 58px;
  }

  & >>> &__content {
    width: 100%;
  }

  & >>> &__content-wrapper {
    border: 0;
    border-radius: 0;
    position: absolute !important;
  }

  & >>> &__tag {
    color: #1f252f;
    line-height: 1;
    border-radius: 0;
    margin-bottom: 0;
    padding: 7px 35px 5px 5px;
    background-color: #f6ac6d;
  }

  & >>> &__tags {
    border: 0;
    display: flex;
    cursor: pointer;
    border-radius: 0;
    background: none;
    padding: 0 40px 0 0;
    align-items: center;
    border-bottom: 3px solid #f6ac6d;

    +below(1345px) {
      padding: 15px 25px 15px 0;
    }
  }

  & >>> &__placeholder {
    margin: 0;
    color: #fff;
    line-height: 1;
    font-size: 16px;
    letter-spacing: 0.25px;
    font-family: 'Heading Pro Wide';

    +below(1345px) {
      font-size: 14px;
    }
  }

  &--active >>> &__placeholder {
    display: block;
  }

  & >>> &__tags-wrap {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    width: calc(100% - 50px);
    absolute: left 0 top 15px;
  }

  & >>> &__select {
    padding: 0;
    width: fit-content;

    &:before {
      top: 55%;
      color: #fff;
      border-width: 5px 6px 0;
      border-color: #fff transparent transparent;
    }
  }

  & >>> &__option {
    display: flex;
    cursor: pointer;
    align-items: center;
    padding: 12px 75px 12px 10px;

    &__value {
      white-space: pre-line;
    }

    img {
      size: 30px;
      margin-right: 10px;
    }

    &:before {
      top: 55%;
      color: #fff;
      border-width: 6px 7px 0;
      border-color: #fff transparent transparent;
    }

    &:after {
      top: 50%;
      padding: 0;
      right: 20px;
      color: #40464d;
      line-height: 1;
      transform: translateY(-50%);
    }

    &--highlight {
      color: #fff;
      background-color: rgba(31, 38, 46, 0.85);

      &:after {
        color: #fff;
        background: none;
      }
    }

    &--selected {
      font-weight: normal;
    }
  }

  & >>> &__tag-icon {
    width: 28px;
    border-radius: 0;
    line-height: 28px;
    background-color: #a67042;

    &:hover {
      background-color: rgba(166, 112, 66, 0.85);
    }

    &:after {
      color: #000;
      font-size: 18px;
    }
  }
}

.filter-picture {
  display: block;
  color: #2e3541;
  max-width: 187px;
  margin-left: auto;
  user-select: none;
  text-align: center;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  & + & {
    margin-top: 40px;
  }

  img {
    max-width: 100%;
    margin-bottom: 20px;
  }

  &__name {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 2px;
    font-size: rem(13px);
    text-transform: uppercase;
    font-family: 'Heading Pro Wide';
  }
}

.filter {
  height: 100vh;
}

.filter-white {
  background-color: #fff;

  &__container {
    padding: 35px 0;
  }
}

.filter-reset {
  color: #fff;
  display: flex;
  cursor: pointer;
  line-height: 0.5;
  user-select: none;
  margin-left: auto;
  width: fit-content;
  align-items: center;
  text-decoration: underline;

  svg {
    size: 15px;
    fill: #fff;
    margin-right: 10px;
  }
}

.slider {
  position: relative;

  &__name {
    z-index: 2;
    color: #fff;
    padding: 0 25px;
    font-weight: 700;
    font-size: rem(16px);
    absolute: left 50% top 0;
    background-color: #1f252f;
    text-transform: uppercase;
    transform: translateX(-50%);
    letter-spacing: rem(3.52px);
    font-family: 'Heading Pro Wide';

    +below(1440px) {
      font-size: rem(14px);
    }
  }

  & >>> {
    .vue-slider {
      height: 2px !important;
      padding: 10px 25px !important;

      +below(1440px) {
        padding: 10px 20px !important;
      }

      &:before {
        content: '';
        size: 100% 2px;
        absolute: left 0 top 50%;
        background-color: #535150;
        transform: translateY(-50%);
      }
    }

    .vue-slider-rail {
      border-radius: 0;
      background-color: #535150 !important;
    }

    .vue-slider-process {
      background-color: #f6ac6d !important;
    }

    .vue-slider-dot {
      width: 50px !important;
      height: 50px !important;

      +below(1440px) {
        width: 40px !important;
        height: 40px !important;
      }

      &-handle {
        border: 0;
        box-shadow: none;

        &:after {
          size: 22px;
          content: '';
          border-radius: 22px;
          background-color: #a67042;
          absolute: left 50% top 50%;
          transform: translate(-50%, -50%);

          +below(1440px) {
            size: 16px;
          }
        }

        &:before {
          size: 50px;
          content: '';
          border-radius: 50px;
          background-color: #1f262e;
          border: 2px solid #f6ac6d;
          absolute: left 50% top 50%;
          transform: translate(-50%, -50%);

          +below(1440px) {
            size: 40px;
          }
        }
      }
    }

    .vue-slider-dot-tooltip {
      top: 100%;
      cursor: pointer;
      transform: translate(-50%, 0);
    }

    .vue-slider-dot-tooltip-inner {
      padding: 0;
      color: #fff;
      line-height: 1;
      background: none;
      font-weight: 700;
      margin-top: 10px;
      font-size: rem(16px);
      text-transform: uppercase;
      font-family: 'Heading Pro Wide';

      &:after {
        display: none;
      }
    }
  }
}

.title {
  color: #fff;
  line-height: 1;
  font-weight: 700;
  font-size: rem(20px);
  text-transform: uppercase;
  letter-spacing: rem(4.4px);
  font-family: 'Heading Pro Wide';

  +below(1340px) {
    font-size: rem(18px);
  }
}

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
    margin-bottom: 75px;
    align-items: center;

    +below(1440px) {
      margin-bottom: 50px;
    }

    &__title {
      margin-left: 20px;
    }
  }

  &__room {
    size: 58px;
    color: #fff;
    display: flex;
    min_size: 58px;
    line-height: 1;
    cursor: pointer;
    font-weight: 700;
    user-select: none;
    align-items: center;
    border-radius: 68px;
    font-size: rem(18px);
    justify-content: center;
    text-transform: uppercase;
    border: 3px solid transparent;
    font-family: 'Heading Pro Wide';
    background-origin: border-box;
    background-clip: content-box, border-box;
    background-image: linear-gradient(#1f252f, #1f252f), linear-gradient(to top, #764419, #f5ab6c);

    +below(1440px) {
      size: 50px;
      min_size: 50px;
      font-size: rem(18px);
    }

    +below(1340px) {
      size: 42px;
      min_size: 42px;
      border-width: 2px;
      font-size: rem(16px);
    }

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

.filter-container {
  padding: 25px 0;
}

.multi-select {
  color: #fff;
  size: 100% 50px;
  border: 3px solid #f6ac6d;
  padding: 10px 30px 10px 10px;

  &__value {
    size: 100%;
    font-size: 18px;
    font-weight: 300;
    position: relative;

    &__wrapper {
      size: 100%;
      overflow: hidden;
      white-space: nowrap;
      absolute: left 0 top 0;
      text-overflow: ellipsis;
    }
  }

  &__items {
    size: 100%;
  }
}
</style>
