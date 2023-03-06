<template lang="pug"> ScrollPage(backgroundImage="/static/gallery/architecture/render-8.jpg")
  .container.mb-5: .row
    .col-md-6: .title-list Основные преимущества комфорта для современного горожанина
    .col-md-6: ul.list
      li(v-for="item in list") {{ item }}
  .map
    .container: .map__tabs
      .map__tab(
        :key="tab.key"
        v-for="(tab,i) in tabs"
        :class="{'map__tab--active': i === tabActive}"
        @click="tabSelect(i)"
      ) {{ tab.name }}
    //- GmapMap(
    //-   ref="map"
    //-   :center="{lat: 54.76445862215112, lng: 56.0111843281706}"
    //-   :zoom="14"
    //-   :options="options"
    //- )
    yandex-map(
        v-if="showedMap"
        :coords="points[0].position"
        zoom="17"
        :controls="['zoomControl']"
        :scroll-zoom="false"
        style="position: absolute; inset: 0; z-index: 10"
    )
      ymap-marker(
        v-for="(marker, i) in filteredPoints"
        :key="i"
        :coords="marker.position"
        :marker-id="i"
        :icon="marker.icon"
        :balloon-template="marker.balloon"
      )

  .container.mt-5
    .row.mb-5.align-items-center
      .col-md-7
        .long-title Транспортная доступность
        p Расположение комплекса идеально: тихий центр, рядом большой лесной массив, в шаговой доступности крупные городские магистрали. Добраться до работы или выехать из города не составит труда.
        <!--        .link-->
        <!--          svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")-->
        <!--          .link__text Тут будет Pop-up-->
      .col-md-5: .location-picture-1.location-picture: .sizer
        .line-1
      <!--    .row.mb-5.align-items-center-->
      <!--      .col-md-5: .location-picture-4.location-picture: .sizer-->
      <!--        .line-1-->
      <!--      .col-md-7-->
      <!--        .long-title Отличные виды-->
      <!--        p Из большинства квартир открываются чудесные виды на лес. Это ли не мечта?! Жить в сердце города, но с видом на парковую зону!-->
      <!--        router-link.link(to="/gallery" exact)-->
      <!--          svg.link__svg: use(xlink:href="/static/sprite.svg#arrow-horizontal-long")-->
      <!--          .link__text Подробнее-->
  .location-full-bg
</template>

<script>
import ScrollPage from '../components/ScrollPage'
import MarkerWithLabel from 'markerwithlabel'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { ScrollPage },
  data: () => ({
    map: null,
    tabActive: -1,
    markers: [],
    showedMap: false
  }),
  beforeDestroy () {
    this.$store.commit('variables/footerShow', true)
  },
  async mounted () {
    this.$store.commit('variables/footerShow', false)
    this.showedMap = true;
    // this.map = await this.getMap()
    this.loaderHide()
    // this.setLabelMarkers()
    // setTimeout(() => {
    //   this.tabSelect(0)
    // }, 100)
  },
  computed: {
    ...mapGetters({
      tabs: 'map/tabs',
      storeMarkers: 'map/markers',
      options: 'map/options',
      list: 'map/list'
    }),
    filteredPoints() {
      if(this.tabActive === -1) return this.points;

      return this.points.filter((point, i) => {
        return i === 0 || point.tab === this.tabs[this.tabActive].key;
      });
    },
    points() {
      const logoIcon = this.storeMarkers[0].icon;

      const markers = this.storeMarkers.map(point => {
        return {
          ...point,
          balloon: `
            <p>${point.address}</p>
            <p>${point.name || 'Жилой комплекс'}</p>
          `,
          icon: {
            layout: 'default#image',
            imageHref: '/static/markers/' + point.tab + '.svg',
            imageSize: point.size
          },
          position: Object.values(point.position)
        }
      });

      markers[0].icon = {
        layout: 'default#image',
        imageHref: logoIcon,
        imageSize: markers[0].size
      }

      return markers;
    }
  },
  methods: {
    ...mapActions({filterMarkers: 'map/filterMarkers'}),
    tabSelect (i) {
      this.tabActive = this.tabActive === i ? -1 : i
      this.filterMarkers({
        tab: this.tabs[this.tabActive],
        markers: this.markers
      })
    },
    getMap () {
      return this.$refs.map.$mapPromise.then(map => map)
    },
    setLabelMarkers () {
      const map = this.map
      const markers = this.markers
      const google = window.google
      const Marker = MarkerWithLabel(google.maps)
      map.addListener('click', () => markers.forEach((marker) => marker.infowindow.close()))
      this.storeMarkers.forEach((item, i) => {
        markers[i] = new Marker({
          map: map,
          zIndex: 1,
          position: item.position,
          icon: {
            url: item.icon,
            scaledSize: new google.maps.Size(item.size[0], item.size[1])
          },
          labelClass: 'map-marker',
          labelStyle: {
            height: item.size[1] + 'px',
            transform: `translate(${(item.size[0] / 2) + 10}px, -100%)`
          }
        })
        if (!markers[i].visible) {
          markers[i].labelClass = 'd-none'
        }
        markers[i].tab = item.tab
        // открытие балуна
        markers[i].infowindow = new google.maps.InfoWindow({
          content: item.address,
          pixelOffset: new google.maps.Size(3, 0)
        })
        markers[i].addListener('click', function () {
          if (this.infowindow.content) {
            if (this.infowindow.anchor) {
              this.infowindow.close()
            } else {
              markers.forEach(function (m) {
                m.infowindow.close()
              })
              this.infowindow.open(map, this)
            }
          }
        })
        markers[i].addListener('mouseover', function () {
          markers[i].setZIndex(2)
          if (item.name) {
            markers[i].set('labelContent', `<div>${item.name}</div>`)
          }
        })
        markers[i].addListener('mouseout', function () {
          markers[i].set('labelContent', '')
          markers[i].setZIndex(1)
        })
      })
    },
    centerConsole () {
      this.$refs.map.$on('center_changed', () => {
        // eslint-disable-next-line
        const center = this.map.getCenter()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.title-list
  line-height 1.2
  font-weight 700
  font-size rem(32px)
  text-transform uppercase
  letter-spacing rem(7.04px)
  font-family 'Heading Pro Wide'
  +below(1440px)
    font-size rem(28px)
  +below(1290px)
    font-size rem(24px)
    letter-spacing rem(5px)
.list
  margin 0
  padding 0
  list-style none
  font-weight 700
  line-height 1.2
  font-size rem(20px)
  text-transform uppercase
  letter-spacing rem(4.4px)
  font-family 'Heading Pro Wide'
  +below(1290px)
    font-size rem(16px)
    letter-spacing rem(2px)
  li
    position relative
    padding-left 90px
    &:before
      content ''
      size 60px 2px
      absolute left 0 top 10px
      background-color #f6ac6d
  li + li
    margin-top 30px
    +below(1290px)
      margin-top 20px
.map
  z-index 1
  size 100% 880px
  max-height 100vh
  position relative
  &__tabs
    z-index 10
    user-select none
    absolute top 45px
  &__tab
    cursor pointer
    line-height 1.2
    font-weight 700
    width fit-content
    position relative
    padding-right 5px
    margin-bottom 15px
    font-size rem(20px)
    text-transform uppercase
    letter-spacing rem(4.4px)
    color rgba(31, 37, 47, 1)
    font-family 'Heading Pro Wide'
    border-bottom 2px solid transparent
    transition color .15s ease-in-out, border-color .15s ease-in-out
    +below(1290px)
      font-size rem(18px)
      letter-spacing rem(2.5px)
    &--active
      border-color #f6ac6d
  & >>> .map-marker
    color #fff
    line-height 1
    font-size 14px
    font-weight 500
    user-select none
    font-family 'TT Commons'
    div
      size 100%
      display flex
      align-items center
      background-color #323845
  & >>> .gm-style-iw-d
    color #000
    line-height 1
    font-size 16px
    user-select none
    font-family 'TT Commons'
.vue-map-container
  size 100%

.location-picture-1
  size 522px
  margin-left 40px
  position relative
  &:after
    size 100%
    content ''
    absolute left 0 top 0
    border-radius: 50%;
    background url('./../assets/images/location-picture-1.jpg') no-repeat center/cover
    background-position: left;
  &:before
    content ''
    size 659px
    absolute right 220px bottom 40px
    background url('./../assets/images/location-picture-2.png') no-repeat center/cover
  .line-1
    size 1108px
    absolute right 50% top 100%
    background url('./../assets/images/location-picture-3.png') no-repeat center/cover

.location-picture-4
  size 522px
  margin-left -40px
  background url('./../assets/images/location-picture-4.png') no-repeat center/cover

.location-full-bg
  size 100% 625px
  position relative
  background url('/static/gallery/architecture/render-5.jpg') no-repeat center bottom/cover

.location-picture
  +below(1345px)
    size 100%
    background-size contain
.sizer
  +below(1345px)
    padding-top 100%
</style>
