<template lang="pug">
.flat
  ModalRightToLeft(
    ref="rightModal"
    @afterClose="hideFlat"
    @close="$emit('close')"
    :title="`Квартира №${flat && flat.number}`"
  ): .flat__wrapper(v-if="flat && storey")
    .flat__body
      .flat__left
        .flat__attr
          .flat__attr__value {{ $store.state.filter.houses[flat.house] }}
          .flat__attr__title литер
        .flat__attr
          .flat__attr__value {{ flat.rooms_number }}
          .flat__attr__title комнаты
        .flat__attr
          .flat__attr__value {{ flat.storey_number }}
          .flat__attr__title Этаж
        .flat__attr
          .flat__attr__value {{ flat.total_area }}
          .flat__attr__title м2, площадь
        .flat__attr(v-if="flat.status !== 'sold'")
          div
            div(:style="{'font-weight': '600', 'margin-top': '20px', 'font-size': '30px', 'text-transform': 'uppercase'}") {{ flat.price.split('.')[0].match(/.{1,3}(?=(.{3})*$)/g).join(' ') }}
            div(:style="{ 'font-size': '14px', 'font-weight': 500, 'margin-top': '2px' }") руб, стоимость
        .flat__attr
          div(:style="{'font-weight': '600', 'margin-top': '20px', 'font-size': '30px', 'text-transform': 'uppercase'}")
            span {{ statusText[flat.status] }}
        wind-rose.flat__wind-rose(v-if="storey.image_maps")
        .flat-storey(v-if="storey.image_maps[0]")
          img(:width="storey.image_maps[0].width" :height="storey.image_maps[0].height" :src="storey.image_maps[0].path" style="max-width: 100%; height: auto")
          .flat-storey__street ул. Зорге
      .flat-image: .flat-image__wrapper: img(v-if="flat.images" alt :src="flat.images[0]")
      .flat-right
        a.flat-circle(href="#" @click="$refs.modalInt.open()")
          img(alt src="../assets/images/flat-circle-interior.png")
          .flat-circle__title Интерьеры
        a.flat-circle(href="#" v-if='flat && flat.comments' @click="$refs.walk3d.open()")
          img(alt src="../assets/images/flat-circle-walk3d.png")
          .flat-circle__title 3D-прогулка
    .flat__footer
      .flat-button-booked(@click="$refs.modal.open()" :style="{visibility:[flat.status === 'free' ? 'visible' : 'hidden']}")
        svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")
        | Забронировать
      .flat-tabs
        .flat-tab(:class="{'active':typeImage==='image2d'}") 2D планировка
        a.flat-tab(v-if="flat.video_clip" href="#" @click="$refs.planer.open()") 3D планировка
        div.flat-tab(@click="uploadPlan") Скачать планировку
    ModalCallback(ref="modal" :theme="`Забронировать квартиру №${flat.number}`")
  ModalRightToLeft(title='Интерьеры' ref="modalInt")
    .modal-wrapper
      swiper(:options="swiperOpts")
        swiper-slide(
          v-for="i in 16"
          :key="i"
        )
          img(
            style="width: 100%; height: 100%"
            alt
            :src="`/static/158/${i}.jpg`"
          )
        .slider-button.slider-button--prev(slot="button-prev"): img(alt src="@/assets/svg/button-prev.svg")
        .slider-button.slider-button--next(slot="button-next"): img(alt src="@/assets/svg/button-prev.svg")
        .slider-pagination(slot="pagination")
  ModalRightToLeft(v-if="flat && flat.comments" title='3D-прогулка' ref="walk3d")
    iframe(:src='flat.comments'  width="100%" height="100%" frameborder='0')
  ModalRightToLeft(
    v-if="flat && flat.video_clip"
    ref="planer"
    title="3D планировка"
  ): iframe(:src="flat.video_clip" width="100%" height="100%")
</template>

<script>
import { mapActions } from 'vuex';
import { show } from '@/api/flats';
import { show as showStorey } from '@/api/storeys';
import { pdf } from '@/api/flats';
import WindRose from './WindRose'
import ModalRightToLeft from './ModalRightToLeft'
import ModalCallback from './ModalCallback'

export default {
  components: { WindRose, ModalRightToLeft, ModalCallback },
  props: {
    flatId: {
      required: true,
      type: Number
    }
  },
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
    swiperOpts: {
      pagination: {
        el: '.slider-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.slider-button--next',
        prevEl: '.slider-button--prev'
      }
    },
  }),
  // computed: {
  //   // flatId () {
  //   //   return this.dataFlat ? Number(this.dataFlat.id) : Number(this.$route.params.flatId)
  //   // },
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
  //   async dataStorey () {
  //     // eslint-disable-next-line
  //     return await this.getStorey({storey: this.storeyId})
  //   },
  //   dataMore () {
  //     return this.getFlatMore(this.flatId)
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
  //       let status = true
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
  //   }
  // },
  beforeDestroy () {
    this.$store.commit('variables/yesideaIndex102', true)
  },
  async mounted () {
    this.$refs.rightModal.open();

    // if (this.dataFlat) {
    //   this.$store.commit('variables/yesideaIndex102', false)
    // } else {
    //   if (this.flatId) {
    //     this.$store.commit('variables/yesideaIndex102', false)
    //     setTimeout(() => {
    //     }, 1000)
    //   } else {
    //     this.hardClose()
    //   }
    // }
  },
  async created() {
    this.loaderShow();
    await this.getFlat();
    await this.getStorey();
    this.loaderHide();
  },
  computed: {
    compassStyles() {
      if(!this.flat) return '';
      return `transform: rotate(${this.flat.compass}deg)`
    },
  },
  methods: {
    ...mapActions({
      getFlat: 'flat/getFlat',
      getFlatMore: 'flat/getFlatMore',
      getStorey: 'house/getStorey',
      blobPdf: 'flat/blobPdf'
    }),
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
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    hardClose () {
      this.$parent.flatShowed = null
      this.back()
      this.loaderHide()
    },
    back () {
      if (!this.dataFlat) {
        this.$router.push('/select/' + this.storeyId)
      }
    },
    hideFlat () {
      if (this.storeyId && !this.dataFlat) {
        this.back()
        // document.querySelector('.vld-overlay').remove()
      }
      setTimeout(() => {
        this.$parent.flatShowed = null;
      }, 100)
    },
    changeTypeImage (type) {
      this.typeImage = type
    },
    isLoaded (image) {
      const img = new Image()
      img.src = image
      img.onload = () => {
        this.$refs.rightModal.open()
      }
      return img.src
    }
  }
}
</script>
<style scoped lang="stylus">
.flat-right
  padding-top 100px
  > a + a
    margin-top: 24px

.flat-circle
  display: block
  cursor pointer
  text-align center

  &__title
    color #f6ac6d
    margin-top 10px
    font-weight 700
    font-size rem(10px)
    line-height rem(19.7px)
    text-transform uppercase
    letter-spacing rem(2.2px)
    text-decoration underline
    font-family 'Heading Pro Wide'
    @media(max-height 790px)
      font-size rem(9px)
  img
    @media(max-height 790px)
      size 125px
.flat-image
  flex-basis 100%
  padding-left 50px
  padding-right 150px
  @media(max-height 830px)
    max-height fit-content
  &__wrapper
    size 100%
    position relative
    &:before
      content ''
      display block
      padding-top 50.8%
  img
    max_size 100%
    absolute left 50% top 0
    transform translateX(-50%)
.flat-storey
  width 142px
  position relative
  &__svg
    size 100%
    absolute left 0 top 0
  &__path
    fill transparent
    &.active
      fill rgba(183, 135, 91, .8)
  &__street
    width 100%
    color #fff
    line-height 1
    font-size .8rem
    text-align center
    absolute left 0 bottom -20px
.flat
  &__wrapper
    size 100%
    display flex
    padding-top 60px
    flex-direction column
    +below(1440px)
      padding-top 15px
  &__body
    display flex
    flex-basis 100%
    margin-bottom 70px
    justify-content space-between
    @media(max-height 830px)
      margin-bottom 30px
  &__wind-rose
    margin 0 auto
  &__left
    display flex
    flex-direction column
    justify-content space-between
    +below(1440px)
      padding-bottom 50px
  &__attr
    color #fff
    line-height 1
    text-align center
    &__value
      font-weight 700
      font-size rem(30px)
      font-family 'Heading Pro Wide'
    &__title
      font-weight 500
      font-size rem(14px)
  &__footer
    display flex
    align-items center
    justify-content space-between
.flat-tabs
  display flex
  flex-basis 100%
  padding-right 120px
  justify-content center
.flat-tab
  margin 0 30px
  color #f6ac6d
  cursor pointer
  font-weight 700
  font-size rem(10px)
  line-height rem(19.7px)
  text-transform uppercase
  letter-spacing rem(2.2px)
  text-decoration underline
  font-family 'Heading Pro Wide'
  &.active
    color #afafaf
    cursor default
    text-decoration none
.flat-button-booked
  display flex
  line-height 1
  color #1f252f
  cursor pointer
  font-weight 700
  user-select none
  width fit-content
  align-items center
  border-radius 62px
  font-size rem(12px)
  padding 11px 12px 10px
  border 3px solid #f6ac6d
  text-transform uppercase
  background-color #f6ac6d
  letter-spacing rem(2.64px)
  font-family 'Heading Pro Wide'
  transition background-color 0.15s ease-in-out, color 0.15s ease-in-out
  &:hover
    color #fff
    text-decoration none
    background-color transparent
  svg
    fill #1F252F
    size 43px 18px
    margin-right 15px
    transition fill 0.15s ease-in-out
  &:hover svg
    fill #fff
>>> .scroll-content, >>> .scroll-content .content
  height 100%
>>> .scroll-content .content
  display flex
  flex-direction column
</style>
<style scoped lang="stylus">
.slider
  size 100vw 100vh
  absolute left 0 top 0
  &:before, &:after
    z-index 2
    content ''
    absolute left 0
    size 100% 240px
    background linear-gradient(180deg, rgba(31, 37, 47, .75) 0%, rgba(31, 37, 47, 0) 100%)
  &:before
    top 0
  &:after
    bottom 0
    transform scale(-1)
.swiper-container
  margin 0
  size 100%
  z-index auto
  &:before, &:after
    z-index 2
    content ''
    absolute top 0
    size 140px 100%
    background linear-gradient(90deg, rgba(31, 37, 47, .5) 0%, rgba(31, 37, 47, 0) 100%)
  &:before
    left 0
  &:after
    right 0
    transform scale(-1)
.swiper-slide
  background no-repeat center/cover
.slider-button
  z-index 3
  outline none
  cursor pointer
  size 84px 60px
  position absolute
  top calc(50% - 30px)
  &--prev
    left 20px
  &--next
    right 20px
    transform scale(-1)
  &.swiper-button-disabled
    display none
.slider-pagination
  z-index 101
  display flex
  position absolute
  align-items center
  left 50%!important
  bottom 65px!important
  width fit-content!important
  transform translate(-50%, 0)
  +below(1650px)
    bottom 55px!important
  & >>> .swiper-pagination-bullet
    size 3px
    opacity 1
    outline none
    margin 0 8px
    position relative
    border-radius 10px
    background-color #fff
    transition width .25s ease-in-out
    +below(1290px)
      margin 0 5px
    &:before
      size 0
      content ''
      border-radius 10px
      border 0 solid #f6ac6d
      absolute left 50% top 50%
      transform translate(-50% ,-50%)
      transition width .25s ease-in-out, height .25s ease-in-out, border-width .25s ease-in-out
    &-active
      size 2px
      &:before
        size 8px
        border-width 1px
.bottom-tabs
  z-index 101
  display flex
  color #f6ac6d
  line-height 1.2
  font-weight 700
  user-select none
  font-size rem(10px)
  text-transform uppercase
  letter-spacing rem(2.2px)
  font-family 'Heading Pro Wide'
  absolute right 200px bottom 28px
.bottom-tab
  cursor pointer
  &--active
    color #afafaf
    cursor default
  & + &
    margin-left 40px
.close-btn
  z-index 101
  absolute left 35px bottom 55px
  +below(1800px)
    bottom 85px
</style>
