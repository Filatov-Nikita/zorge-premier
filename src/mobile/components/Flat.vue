<template lang="pug"> .flat
  template(v-if="flat && storey")
    .flat-number(ref="number") Квартира №{{flat.number}}
    //- swiper(:options="swiperOptions"
    //-   @touchStart="touchStart"
    //-   @touchEnd="touchEnd"
    //-   v-if="dataMore.image3d || false"
    //- )
      //- swiper-slide.flat-image: img(alt :src="dataMore.image2d")
      //- swiper-slide.flat-image(v-if="dataMore.image3d"): img(alt :src="dataMore.image3d")
      <!--      swiper-slide.flat-image-->
      <!--        a.flat-image__clip-path-3d(href="javascript:void(0);")-->
      <!--          .event-button-->
      <!--            svg.icon-3d: use(xlink:href="/static/sprite.svg#3d-box")-->
      <!--            | 3D тур-->
    //-   .slider-bottom(slot="pagination")
    //-     .slider-button.slider-button--prev: svg: use(xlink:href="/static/sprite.svg#prev")
    //-     .slider-pagination
    //-     .slider-button.slider-button--next: svg: use(xlink:href="/static/sprite.svg#prev")
    //- .flat-image(v-else style="margin-bottom:30px;"): img(alt :src="dataMore.image2d")
    .flat-attrs
      .flat-attr
        .flat-attr__value {{ $store.state.filter.houses[flat.house] }}
        .flat-attr__name литер
      .flat-attr
        .flat-attr__value {{ flat.storey_number }}
        .flat-attr__name этаж
      .flat-attr
        .flat-attr__value {{ flat.rooms_number }}
        .flat-attr__name комнаты
      .flat-attr
        .flat-attr__value {{ flat.total_area }}
        .flat-attr__name м2, площадь
    .flat-attrs(v-if="flat.status !== 'sold'")
      .flat-attr
        .flat-attr__value {{ flat.price.split('.')[0].match(/.{1,3}(?=(.{3})*$)/g).join(' ') }}
        .flat-attr__name руб, стоимость
    .flat-image: .flat-image__wrapper: img(:src="storey.image_maps[0] && storey.image_maps[0].path" style="max-width: 100%")
    .flat-storey-wind-rose
      .flat-storey
        img(v-if="flat.images" alt :src="flat.images[0]" style="max-width: 100%")
      .flat-wind-rose
        .wind-rose: img(alt src="../assets/images/wind-rose.svg" :style="compassStyles")
        .flat-attr
          p(:style="{'font-weight': 'bold', 'margin-top': '8px', 'text-align': 'center', color: statusColors[flat.status]}") {{ statusText[flat.status] }}
        a.flat-pdf(href="#" @click.prevent="uploadPlan")
          .icon-bg: svg: use(xlink:href="/static/sprite.svg#pdf")
          .flat-pdf__text Скачать планировку
    .flat-circle-links
      router-link.flat-circle-link.flat-circle-link--1(to="/gallery/interiors") Интерьер
      back-to(to="/parking" icon="parking" style="margin-bottom: 20px") Выбрать паркинг
      div(style="padding-left: 51px;" v-if="flat.status === 'free'")
        back-to(icon="arrow-horizontal-small" removeBack @click="$refs.modal.open()") Забронировать
      div(style="padding-left: 51px;" v-if="flat.status !== 'free'" )
        back-to(to="/filter" icon="filter" removeBack) Подбор по параметрам
      Modal(ref="modal" className="custom-form" :options="{touch: false, baseClass: 'custom-modal'}")
        form(@submit.prevent="submit")
          .custom-form__title Забронировать квартиру №{{ flat.number }}
          .row
            .col-md-6.form-group
              label.custom-form__label(for="name") Ваше имя
              .position-relative: input.form-control.custom-form__control(
                type="text"
                name="name"
                id="name"
                v-model="form.name"
                required
              )
            .col-md-6.form-group
              label.custom-form__label(for="cellphone") Номер телефона
              .position-relative: input.form-control.custom-form__control(
                type="tel"
                placeholder="+7"
                v-model="form.phone"
                v-mask="'+7 (9##) ###-##-##'"
                minlength="18"
                id="cellphone"
              )
          .row
            .col-md-6.d-flex.align-items-center
              .custom-form__agree Я согласен с&nbsp;
                a(href="javascript:void(0)" @click="openAgree") условиями обработки моих персональных данных
            .col-md-6
              button.btn.custom-form__btn(type="submit") Отправить
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import BackTo from './BackTo'
import axios from 'axios'
import { show, book } from '@/api/flats';
import { show as showStorey } from '@/api/storeys';
import { pdf } from '@/api/flats';
import Modal from '@/components/Modal'
import { mask } from 'vue-the-mask'
const md5 = require('md5')
export default {
  props: {
    flatId: {
      required: true,
      type: Number
    }
  },
  directives: { mask },
  components: {BackTo, Modal},
  data: () => ({
    statusText: {
      free: 'Свободна',
      booked: 'Забронирована',
      sold: 'Продана'
    },
    statusColors: {
      free: 'green',
      booked: 'orange',
      sold: 'red'
    },
    typeImage: 'image2d',
    flat: null,
    storey: null,
    storeyData: null,
    swiperOptions: {
      pagination: {
        el: '.slider-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.slider-button--next',
        prevEl: '.slider-button--prev'
      }
    },
    form: {
      name: '',
      phone: '',
      email: ''
    }
  }),
  computed: {
    ...mapGetters({
      mobileMenuContext: 'menu/mobileMenuContext',
      agreement: 'agreePrivatePolice/agreement'
    }),
    compassStyles() {
      if(!this.flat) return '';
      return `transform: rotate(45deg)`
    }
  },
  async created() {
    this.loaderShow();
    await this.getFlat();
    await this.getStorey();
    this.loaderHide();
    this.$refs.number.scrollIntoView();
  },
  //   flatId () {
  //     return this.dataFlat ? Number(this.dataFlat.id) : Number(this.$route.params.flatId)
  //   },
  //   data () {
  //     return this.getFlat(this.flatId)
  //   }
  // },
  // asyncComputed: {
  //   async storeyId () {
  //     const data = await this.dataJoins
  //     if (data) {
  //       return Number(data.storey)
  //     }
  //   },
  //   async dataOriginal () {
  //     const data = await this.data
  //     this.loaderHide()
  //     if (data.original.id) {
  //       return data.original
  //     } else {
  //       this.hardClose()
  //     }
  //   },
  //   async dataJoins () {
  //     const data = await this.data
  //     if (data.joins.id) {
  //       return data.joins
  //     } else {
  //       this.hardClose()
  //     }
  //   },
  //   dataStorey () {
  //     const storey = this.getStorey({storey: this.storeyId})
  //     if (storey) {
  //       return storey
  //     }
  //   },
  //   storeyPath () {
  //     if (this.dataStorey) {
  //       const result = this.dataStorey.svg.paths.filter(({id}) => id === this.flatId).pop()
  //       if (result) {
  //         return result.d
  //       }
  //     }
  //   },
  //   async pdfLink () {
  //     if (this.dataStorey) {
  //       const data = {
  //         image: this.dataMore.image2d,
  //         width: this.dataStorey.svg.viewBox.width,
  //         height: this.dataStorey.svg.viewBox.height,
  //         storey_image: this.dataStorey.svg.image,
  //         number: this.number,
  //         liter: this.liter,
  //         polygon: this.storeyPath,
  //         total_area: this.dataOriginal.total_area,
  //         rooms_number: this.dataOriginal.rooms_number,
  //         storey_number: this.dataOriginal.storey_number
  //       }
  //       letflat. status = true
  //       $.each(data, (key, item) => {
  //         if (!item) {
  //           status = false
  //         }
  //       })
  //       if (status) {
  //         const md5key = md5(JSON.stringify(data))
  //         let value = await this.blobPdf({key: md5key})
  //         if (!value) {
  //           const pdf = await axios.get(location.origin + '/pdf?' + $.param(data), {
  //             responseType: 'blob'
  //           })
  //           const blob = URL.createObjectURL(new Blob([pdf.data], {type: 'application/pdf'}))
  //           value = await this.blobPdf({key: md5key, value: blob})
  //         }
  //         return value
  //       }
  //     }
  //   },
  //   number () {
  //     const flat = this.dataOriginal
  //     if (flat) {
  //       return flat.number
  //     }
  //   },
  //   liter () {
  //     const liter = this.dataJoins
  //     if (liter) {
  //       return liter.liter
  //     }
  //   },
  //   status () {
  //     const status = this.dataJoins
  //     if (status) {
  //       return status.status
  //     }
  //   },
  //   totalArea () {
  //     const totalArea = this.dataOriginal
  //     if (totalArea) {
  //       return totalArea.total_area
  //     }
  //   },
  //   roomsNumber () {
  //     const roomsNumber = this.dataOriginal
  //     if (roomsNumber) {
  //       return roomsNumber.rooms_number
  //     }
  //   },
  //   storeyNumber () {
  //     const storeyNumber = this.dataOriginal
  //     if (storeyNumber) {
  //       return storeyNumber.storey_number
  //     }
  //   },
  //   dataMore () {
  //     const data = this.getFlatMore(this.flatId)
  //     if (data) {
  //       return data
  //     }
  //   }
  // },
  methods: {
    ...mapActions({
      getFlat: 'flat/getFlat',
      getStorey: 'house/getStorey',
      getFlatMore: 'flat/getFlatMore',
      blobPdf: 'flat/blobPdf'
    }),
    async submit() {
      try {
        if(this.form.phone.length !== 18) return alert('Номер телефона должен быть заполнен полностью!')
        this.loaderShow();
        const theme = `Забронировать квартиру №${ this.flat.number }`;
        await book({
          client_id: '1',
          client_secret: 'SEcVU6PJlq68ZS4GzPPOltJprNazjw1Xl4sJ5Pk0',

          email_ids: [1],
          theme,

          crm_lead: 0,

          user_name: this.form.name,
          user_phone: this.form.phone,

          _dictionary: {
            user_name: 'Имя пользователя',
            user_email: 'Электронная почта',
            user_phone2: 'Мобильный'
          }
        });

        ym(91348334,'reachGoal','zayavka');

        Comagic.addOfflineRequest({
          name: this.form.name,
          phone: this.form.phone,
          message: theme,
        });

        this.$VKGoal('lead');

        this.loaderHide();
        setTimeout(() => {
          alert('Ваша заявка успешно отправлена')
        }, 450)
      } catch(e) {
        this.loaderHide();
        setTimeout(() => {
          alert('Произошла ошибка на сервере')
        }, 450);
      }
    },
    async getFlat() {
      const { data: { data } } = await show(this.flatId);
      this.flat = data;
    },
    async getStorey() {
      const { data: { data } } = await showStorey(this.flat.storey);
      this.storey = data;
    },
    async uploadPlan() {
     const path = await pdf({
        client_id: '1',
        client_secret: 'SEcVU6PJlq68ZS4GzPPOltJprNazjw1Xl4sJ5Pk0',
        header_logo_image: 'http://yes-idea.ru/jsi.png',
        header_site: 'https://js-invest.ru/',
        header_tel_prefix: '+7 (347)',
        header_tel: '289-90-05',
        pdf_info_rooms_count: this.flat.rooms_number,
        pdf_info_kv_num: this.flat.number,
        pdf_info_kv_etazh: this.flat.storey_number,
        pdf_info_kompleks: this.flat.house_name,
        pdf_info_kv_sq: this.flat.total_area,
        pdf_info_price: this.flat.status === 'sold' ? 'Продана' : this.flat.price,
        pdf_info_image: this.flat.images[0].replace('/flats/', '/flats_old/'),
      });

      let a = document.createElement("a");
      a.style = "display: none";
      a.href = path.data;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    isLoaded (image) {
      const img = new Image()
      img.src = image
      return img.src
    },
    touchStart () {
      this.mobileMenuContext.lock = true
    },
    touchEnd () {
      this.mobileMenuContext.lock = false
    },
    openAgree () {
      $.fancybox.open(`<div class="container">${this.agreement}</div>`)
    }
  }
}
</script>
<style lang="stylus">
.clip-path
  clip-path url(#mask)
.custom-modal .fancybox-slide--html
  padding 0
.custom-modal
  z-index: 9999 !important
</style>
<style scoped lang="stylus">
.back-to
  position static!important
.event-button
  absolute left 50% top 50%
  transform translate(-50%, -50%)
.icon-3d
  width 20px!important
  height 22px!important
.flat-wind-rose
  display flex
  padding-bottom 15px
  flex-direction column
  justify-content space-between
.flat-pdf
  display flex
  align-items center
  .icon-bg
    size 28px
    min_size 28px
    margin-right 10px
    svg
      size 14px
  &__text
    margin 0
    color #F6AC6D
    font-size 8px
    font-weight 500
    line-height 1.6
    text-transform uppercase
    text-decoration underline
    font-family 'Heading Pro Wide'
.flat
  padding-bottom 15px
.flat-attrs
  display flex
  text-align center
  padding 0 20px 50px
  justify-content space-between
.flat-attr
  color #fff
  line-height 1
  &__value
    font-size 20px
    font-weight 700
    margin-bottom 5px
    text-transform uppercase
    font-family 'Heading Pro Wide'
  &__name
    font-size 12px
.flat-number
  color #fff
  line-height 1
  font-size 14px
  padding 25px 20px
  text-transform uppercase
  font-family 'Heading Pro Wide'
.flat-image
  padding 0 20px 20px
  img
    max-width 100%
  &__clip-path-3d
    width 100%
    margin 0 auto
    display block
    max-width 266px
    mask-size contain
    position relative
    mask-position center
    mask-repeat no-repeat
    mask-image url('../assets/images/mask.svg')
    background url('../assets/images/clip-path-3d.jpg') no-repeat center/cover
    &:before
      size 100%
      content ''
      display block
      padding-top 100%
      background-color rgba(31, 37, 47, .6)
.wind-rose
  margin-bottom 5px
.flat-storey-wind-rose
  display flex
  padding 0 20px 35px
  justify-content space-between
.flat-storey
  display flex
  max-height auto
  padding-right 25px
  flex-direction column
  &__street
    color #fff
    line-height 1
    font-size 8px
    padding 5px 0 2px
    text-align center
  &__path
    fill transparent
    &.active
      fill rgba(183, 135, 91, .8)
.swiper-slide
  height auto
  display flex
  align-items center
  justify-content center
.swiper-container
  margin-bottom 30px
.slider-bottom
  display flex
  align-items center
  justify-content center
.slider-button
  outline none
  display block
  svg
    fill #fff
    display block
    size 34px 14px
  &--next
    transform scaleX(-1)
>>> .slider-pagination
  display flex
  margin 0 10px
>>> .swiper-pagination-bullet
  size 6px
  opacity 1
  margin 0 4px
  outline none
  background none
  border 1px solid #f6ac6d
  &-active
    background-color #f6ac6d
.flat-circle-link
  display block
  color #f6ac6d
  line-height 1
  cursor pointer
  font-size 10px
  min-width 154px
  font-weight 700
  margin 35px auto
  width fit-content
  text-align center
  padding-top 170px
  letter-spacing 2.2px
  text-transform uppercase
  text-decoration underline
  font-family 'Heading Pro Wide'
  background no-repeat center top/154px
  &--1
    background-image url('../assets/images/flat-circle-link-1.png')
  &--2
    background-image url('../assets/images/flat-circle-link-2.png')
.custom-form
  size 100%
  padding 20px
  overflow initial
  user-select none
  position relative
  background-color #151c27
  border-top 8px solid #1f252f
  .form-group
    margin-bottom 30px
  & >>> .alert
    margin 0
    border 0
    width 100%
    line-height 1
    border-radius 0
    padding 20px 20px 15px
    absolute left 0 bottom 100%
    &-warning
      color #151c27
      background-color #f6ac6d
  &__title
    color #fff
    line-height 1
    font-weight 700
    font-size 1.375rem
    padding-right 30px
    margin-bottom 1.5rem
  &__label
    display block
    margin-bottom 0
    font-weight 300
    font-size .85rem
    line-height 1.375rem
    color rgba(255, 255, 255, .6)
  &__control
    border 0
    width 100%
    color #fff
    box-shadow none
    border-radius 0
    background none
    font-weight 300
    position relative
    font-size .875rem
    padding .375rem 0
    line-height 1.375rem
    border-bottom .063rem solid hsla(0, 0%, 100%, .13)
    transition background-color .15s ease-in-out, border-color .15s ease-in-out
  &__agree
    line-height 1
    font-weight 300
    margin-top 10px
    font-size .75rem
    padding-left 20px
    position relative
    margin-bottom 30px
    color rgba(255, 255, 255, .75)
    a
      color #f6ac6d
    &:before
      size 13px
      content ''
      absolute left 0 top 0
      border 1px solid rgba(255, 255, 255, .7)
    &:after
      content ''
      size 4px 8px
      transform rotate(45deg)
      absolute left 5px top 2px
      border-right 2px solid #f6ac6d
      border-bottom 2px solid #f6ac6d
  &__btn
    width 100%
    outline none
    line-height 1
    color #1f252f
    cursor pointer
    font-weight 700
    font-size .75rem
    border-radius 62px
    letter-spacing .165rem
    padding 11px 12px 10px
    border 3px solid #f6ac6d
    text-transform uppercase
    background-color #f6ac6d
    box-shadow none!important
    font-family 'Heading Pro Wide'
    transition background-color .15s ease-in-out, color .15s ease-in-out
    &:hover
      color #fff
      text-decoration none
      background-color transparent
  & >>> .fancybox-button
    padding 5px
    svg path
      fill #fff
  & >>> .invalid-feedback
    width 100%
    display flex
    align-items center
    absolute left 0 top 0
    height calc(100% - 5px)
    background-color #151c27
</style>
