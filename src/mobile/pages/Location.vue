<template lang="pug"> .position-relative(style="padding-bottom:20px;")
  .location
    .location-top-bg
    title-circle Расположение
    .second-title Основные <br>преимущества комфорта <br>для современного <br>горожанина
    .location-list
      .location-list__item(v-for="item in list") {{ item }}
    //- GmapMap(
    //-   ref="map"
    //-   :center="{lat: 54.764854772847826, lng: 56.021054857345405}"
    //-   :zoom="13"
    //-   :options="options"
    //- )
    div(style="height: 350px; position: relative")
      yandex-map(
        v-if="showedMap"
        :coords="points[0].position"
        zoom="15"
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
    .map__tabs
      .map__tab(
        :key="tab.key"
        v-for="(tab,i) in tabs"
        :class="{'map__tab--active':i === tabActive}"
        @click="tabSelect(i)"
      ) {{ tab.name }}
    .location-circle
      .location-circle-image.location-circle-image--1
      .second-title Транспортная <br>доступность
      .location-circle__desc Расположение комплекса идеально: тихий центр, рядом большой лесной массив, в шаговой доступности крупные городские магистрали. Добраться до работы или выехать из города не составит труда.
      <!--  .location-circle-->
      <!--    .location-circle-image.location-circle-image&#45;&#45;2-->
      <!--    .second-title отличные виды-->
      <!--    .location-circle__desc Из большинства квартир открываются чудесные виды на лес. Это ли не мечта?! Жить в сердце города, но с видом на парковую зону!-->
  back-to(:buttonDisable="true")
</template>

<script>
import TitleCircle from '../components/TitleCircle'
import {mapActions, mapGetters} from 'vuex'
import MarkerWithLabel from 'markerwithlabel'
import BackTo from '../components/BackTo'
export default {
  components: { TitleCircle, BackTo },
  data: () => ({
    map: null,
    tabActive: -1,
    markers: [],
    showedMap: false

  }),
  computed: {
    ...mapGetters({
      mobileMenuContext: 'menu/mobileMenuContext',
      storeMarkers: 'map/markers',
      options: 'map/options',
      tabs: 'map/tabs',
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
  async mounted () {
    //- this.map = await this.getMap()
    this.loaderHide()
    this.showedMap = true;
    //- this.setLabelMarkers()
    //- setTimeout(() => {
    //-   this.tabSelect(0)
    //- }, 100)
    //- this.$refs.map.$el.addEventListener('touchstart', this.menuLock)
    //- this.$refs.map.$el.addEventListener('touchend', this.menuUnLock)
  },
  beforeDestroy () {
    this.$refs.map.$el.removeEventListener('touchstart', this.menuLock)
    this.$refs.map.$el.removeEventListener('touchend', this.menuUnLock)
  },
  methods: {
    ...mapActions({filterMarkers: 'map/filterMarkers'}),
    menuLock () {
      this.mobileMenuContext.lock = true
    },
    menuUnLock () {
      this.mobileMenuContext.lock = false
    },
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
          position: item.position,
          icon: {
            url: item.icon,
            scaledSize: new google.maps.Size(item.mobileSize[0], item.mobileSize[1])
          }
        })
        if (!markers[i].visible) {
          markers[i].labelClass = 'd-none'
        }
        markers[i].tab = item.tab
        // открытие балуна
        markers[i].infowindow = new google.maps.InfoWindow({
          content: `<div style="height:${item.mobileSize[1]}px;"><div class="wrapper" style="margin-left: -${Math.round(item.mobileSize[0] / 2)}px;">
            <img alt src="${item.icon}" style="width:${item.mobileSize[0]}px; height:${item.mobileSize[1]}px;" />
            <div class="text">${(item.name || item.address)}</div>
          </div></div>`,
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
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.event-button
  z-index 1
  position relative
.location
  overflow hidden
.location-top-bg
  size 100% 328px
  background url('../assets/images/location-bg.jpg') no-repeat center bottom/cover
.location-list
  color #b9b9b9
  line-height 1
  font-size 12px
  margin-bottom 15px
  padding-left 70px
  text-transform lowercase
  &__item
    padding-left 40px
    position relative
    &:before
      content ''
      size 28px 1px
      margin-top 1px
      absolute left 0 top 50%
      background-color #f6ac6d
.vue-map-container
  z-index 1
  size 100% 390px
  &:before, &:after
    z-index 2
    content ''
    size 100% 79px
    absolute left 0
  &:before
    top 0
    background linear-gradient(180deg, rgba(31, 37, 47, 0.8) 0%, rgba(31, 37, 47, 0) 100%)
  &:after
    bottom 0
    background linear-gradient(0, rgba(31, 37, 47, 0.8) 0%, rgba(31, 37, 47, 0) 100%)
  & >>> .gm-style
    &, [tabindex="0"]
      z-index auto!important
    .gm-style-iw-c
      padding 0
      border-radius 0
      background none
      box-shadow none
      overflow visible!important
      transform translate(0%, -100%)
      button
        display none!important
    .gm-style-iw-t
      right 0!important
      bottom 0!important
      &:after
        display none
    .gm-style-iw-d
      overflow visible!important
      & > div
        padding 0
        line-height 1
        color #1f252f
        font-size 12px
        font-weight 500
        font-family 'TT Commons'
        .wrapper
          display flex
          relative top 50%
          align-items center
          border-radius 20px
          background-color #f6ac6d
          transform translateY(-50%)
        .text
          padding 3px 6px 0 3px
.map
  &__tabs
    margin 0 auto -2px
    width fit-content
    padding 30px 20px 35px
    background url('../assets/images/location-line.png') no-repeat left top
  &__tab
    line-height 1
    font-size 14px
    width fit-content
    position relative
    padding-bottom 3px
    margin-bottom 10px
    text-transform uppercase
    color rgba(255, 255, 255, .4)
    font-family 'Heading Pro Wide'
    &--active
      color #fff
      &:before
        content ''
        size 100% 1px
        background-color #f6ac6d
        absolute left 0 bottom 0
.location-circle-image
  size 294px
  position relative
  margin 0 auto 15px
  background no-repeat center/cover
  &--1
    background-size cover
    background-position: left
    background-image url('../assets/images/location-circle-1.jpg')
    border-radius: 50%
    &:before
      size 189px
      content ''
      absolute right 50% top 100%
      background url('../assets/images/location-line-2.png') no-repeat
  &--2
    background-image url('../assets/images/location-circle-2.png')
    &:before
      size 189px
      content ''
      absolute right 50% top 100%
      background url('../assets/images/location-line-2.png') no-repeat
    &:after
      size 188px
      content ''
      absolute left 50% bottom 100%
      background url('../assets/images/location-line-3.png') no-repeat
.location-circle
  padding-bottom 20px
  &__desc
    color #b9b9b9
    font-size 12px
    padding 0 20px
    text-align center
    margin-bottom 30px
</style>
