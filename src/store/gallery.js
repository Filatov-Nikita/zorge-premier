/* eslint-disable */

const galleryDir = '/static/gallery/'

function newArray (count, prefix = 'render-') {
  return Array.apply(
    null,
    {length: count}
  ).map((a, i) => `${prefix}${i + 1}.jpg`)
}

export default {
  namespaced: true,
  state: {
    gallery: [
      {
        name: 'Архитектура',
        key: 'architecture',
        indexActive: 0,
        images: newArray(16, 'arc-')
      },
      {
        name: 'Общественные зоны',
        key: 'public-areas',
        indexActive: 0,
        images: newArray(14, 'pb-')
      },
      // eslint-disable-next-line
      /*{
        name: 'Окружение',
        key: 'environment',
        indexActive: 0,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },*/
      {
        name: 'Интерьеры',
        key: 'interiors',
        indexActive: 0,
        images: newArray(72, 'flat-')
        //imagesMobile: ['1m.jpg', '2m.jpg', '3m.jpg', '4m.jpg', '5m.jpg', '6m.jpg', 'flat1.jpg', 'flat2.jpg', 'flat3.jpg', 'flat4.jpg', 'flat5.jpg', 'flat6.jpg', 'flat7.jpg', 'flat8.jpg', 'flat9.jpg', 'flat10.jpg', 'flat11.jpg', 'flat12.jpg']
      }
    ]
  },
  mutations: {
    setIndexActive (state, {galleryIndex, imageIndex}) {
      state.gallery[galleryIndex].indexActive = imageIndex
    }
  },
  getters: {
    gallery: ({gallery}) => gallery.map(item => {
      item.images = item.images.map(image => galleryDir + item.key + '/' + image)
      if (item.imagesMobile) {
        item.imagesMobile = item.imagesMobile.map(image => galleryDir + item.key + '/' + image)
      }
      return item
    })
  }
}
