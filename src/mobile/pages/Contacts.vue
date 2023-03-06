<template lang="pug"> .contacts
  .map: yandex-map(
          v-if="showedMap"
          :coords="coords"
          zoom="18"
          :controls="['zoomControl']"
          :scroll-zoom="false"
          style="position: absolute; inset: 0; z-index: 0"
        )
          ymap-marker(
            :coords="coords"
            :marker-id="1"
            :balloon-template="`<p>${address} - офис продаж</p>`"
          )
  title-circle Контакты
  .content
    .second-title Офис продаж:
    .address(v-if="address" v-html="address") {{ address }}
    .content-phone.comagic_phone(v-if="phone")
      a(:href="`tel:${phone}`") {{ phone }}
    .email(v-if="email")
      a(:href="`mailto:${email}`") {{ email }}
    back-to(:buttonDisable="true")
</template>

<script>
import {mapGetters} from 'vuex'
import BackTo from '../components/BackTo'
import TitleCircle from '../components/TitleCircle'
export default {
  components: {TitleCircle, BackTo},
  data: () => ({
    mapWidth: 0,
    showedMap: false
  }),
  mounted () {
    this.loaderHide()
    this.showedMap = true;
  },
  computed: {
    ...mapGetters({
      options: 'map/options',
      address: 'contacts/address',
      phone: 'contacts/phone',
      email: 'contacts/email',
      position: 'contacts/position'
    }),
    coords() {
      return Object.values(this.position);
    }
  },
}
</script>

<style scoped lang="stylus">
.map
  position relative
  size 100% 295px
.title-circle
  margin-bottom 15px
.content
  color #fff
  font-size 14px
  line-height 1.8
  text-align center
  padding-bottom 20px
  position relative
  z-index: 3
</style>
