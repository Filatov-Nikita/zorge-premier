<template lang="pug"> .contacts
  Logo
  .container
    h1 Контакты
    .content(ref="content")
      .title Офис продаж:
      div(v-if="address" v-html="address") {{ address }}
      div.comagic_phone(v-if="phone" @click="$VKGoal('contact')")
        a(:href="`tel:${phone}`") {{ phone }}
      div(v-if="email")
        a(:href="`mailto:${email}`") {{ email }}
  .map(:style="{width:mapWidth ? mapWidth + 'px' : ''}")
    yandex-map(
        v-if="showedMap"
        :coords="coords"
        zoom="17"
        :controls="['zoomControl']"
        :scroll-zoom="false"
        style="position: absolute; inset: 0; z-index: 10"
    )
      ymap-marker(
        :coords="coords"
        :marker-id="1"
        :balloon-template="`<p>${address} - офис продаж</p>`"
      )
</template>

<script>
import Logo from '../components/Logo'
import { mapGetters } from 'vuex'
export default {
  components: {Logo},
  data: () => ({
    mapWidth: 0,
    showedMap: false
  }),
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
  async mounted () {
    this.$store.commit('variables/yesidea', true)
    this.$store.commit('variables/footerBg', true)
    this.$store.commit('variables/footerShow', true)
    setTimeout(() => {
      addEventListener('resize', this.handleResize)
      this.handleResize()
      this.showedMap = true;
      this.loaderHide()
    }, 100)
  },
  beforeDestroy () {
    removeEventListener('resize', this.handleResize)
    this.$store.commit('variables/footerBg', false)
  },
  methods: {
    handleResize () {
      this.mapWidth = window.innerWidth - this.$refs.content.offsetLeft - this.$refs.content.clientWidth
    }
  }
}
</script>

<style scoped lang="stylus">
.map
  height 100%
  absolute right 0 top 0
h1
  z-index 1
  position relative
  margin-bottom 90px
.contacts
  size 100% 100vh
  padding-top 150px
  background url('../assets/images/events-bg.png') no-repeat center/cover
.content
  color #fff
  width 325px
  font-size 16px
  line-height 1.4
  padding-right 30px
.title
  font-size 20px
  font-weight 600
  margin-bottom 30px
  letter-spacing .22em
  text-transform uppercase
  font-family 'Heading Pro Wide'
</style>
