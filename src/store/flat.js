/* eslint-disable */
const flat2dImageDir = '/static/flats/2d/'
const flat3dImageDir = '/static/flats/3d/'

const uniqueness = {
  view: 'Вид на лес',
  private: '1 квартира \nна этаже',
  //ceilings: 'Высокие потолки',
  //conditioning: 'Центральное \nкондиционирование',
  //window: 'Крупноформатные \nокна',
  guest: 'Гостевые и приватные \nпространства',
  pantry: 'Кладовые рядом \nс кухней',
  //repairs: 'Ремонт на стадии \nстроительства',
  //redevelopment: 'Перепланировка на \nстадии строительства'
}

export default {
  namespaced: true,
  state: {
    uniqueness,
    more: [
      {
        ids: [3544],
        uniqueness: ['redevelopment', 'conditioning', 'window', 'ceilings'],
        image2d: 'Zor_1A_F02_8518.png'
      },
      {
        ids: [3543],
        uniqueness: ['guest', 'ceilings', 'window', 'conditioning'],
        image2d: 'Zor_1A_F02_9838.png'
      },
      {
        ids: [3545],
        uniqueness: ['pantry', 'guest', 'conditioning', 'ceilings'],
        image2d: 'Zor_1A_F02_11230.png'
      },
      {
        ids: [3203, 3213, 3223, 3233, 3243, 3253, 3263, 3273, 3283, 3293, 3303, 3313, 3323],
        uniqueness: ['conditioning', 'ceilings', 'redevelopment', 'window'],
        image2d: 'Zor_1A_F03_4397.png'
      },
      {
        ids: [3205, 3215, 3225, 3235, 3245, 3255, 3265, 3275, 3285, 3295, 3305, 3315, 3325],
        uniqueness: ['conditioning', 'ceilings', 'redevelopment', 'window'],
        image2d: 'Zor_1A_F03_4710.png'
      },
      {
        ids: [3204, 3214, 3224, 3234, 3244, 3254, 3264, 3274, 3284, 3294, 3304, 3314, 3324],
        uniqueness: ['conditioning', 'ceilings', 'redevelopment', 'window'],
        image2d: 'Zor_1A_F03_4744.png',
        image3d: '47.44.png'
      },
      {
        ids: [3202, 3212, 3222, 3232, 3242, 3252, 3262, 3272, 3282, 3292, 3302, 3312, 3322],
        uniqueness: ['guest', 'ceilings', 'conditioning', 'redevelopment'],
        image2d: 'Zor_1A_F03_6369.png'
      },
      {
        ids: [3206, 3216, 3226, 3236, 3246, 3256, 3266, 3276, 3286, 3296, 3306, 3316, 3326],
        uniqueness: ['redevelopment', 'conditioning', 'ceilings', 'window'],
        image2d: 'Zor_1A_F03_6906.png'
      },
      {
        ids: [3201, 3211, 3221, 3231, 3241, 3251, 3261, 3271, 3281, 3291, 3301, 3311, 3321],
        uniqueness: ['guest', 'ceilings', 'conditioning', 'redevelopment'],
        image2d: 'Zor_1A_F03_7322.png'
      },
      {
        ids: [3207, 3217, 3227, 3237, 3247, 3257, 3267, 3277, 3287, 3297, 3307, 3317, 3327],
        uniqueness: ['guest', 'redevelopment', 'conditioning', 'ceilings'],
        image2d: 'Zor_1A_F03_7525.png'
      },
      {
        ids: [3199, 3209, 3219, 3229, 3239, 3249, 3259, 3269, 3279, 3289, 3299, 3309, 3319],
        uniqueness: ['guest', 'ceilings', 'window', 'conditioning'],
        image2d: 'Zor_1A_F03_8507.png',
        image3d: '85.07.png'
      },
      {
        ids: [3200],
        uniqueness: ['guest', 'ceilings', 'window', 'conditioning'],
        image2d: 'Zor_1A_F03_9831.png'
      },
      {
        ids: [3198, 3208, 3218, 3228, 3238, 3248, 3258, 3268, 3278, 3288, 3298, 3308, 3318],
        uniqueness: ['guest', 'ceilings', 'window', 'conditioning'],
        image2d: 'Zor_1A_F03_11761.png',
        image3d: '117.61.png'
      },
      {
        ids: [3210, 3220, 3230, 3240, 3250, 3260, 3270, 3280, 3290, 3300, 3310, 3320],
        uniqueness: ['guest', 'ceilings', 'window', 'conditioning'],
        image2d: 'Zor_1A_F04_9841.png'
      },
      {
        ids: [3333],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F02_4641.png'
      },
      {
        ids: [3332],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs', 'pantry'],
        image2d: 'Zor_1B_F02_5915.png'
      },
      {
        ids: [3335],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F02_6803.png'
      },
      {
        ids: [3334],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F02_8374.png'
      },
      {
        ids: [3329],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F02_9177.png'
      },
      {
        ids: [3330],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs', 'pantry'],
        image2d: 'Zor_1B_F02_9835.png'
      },
      {
        ids: [3331],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F02_10328.png'
      },
      {
        ids: [3328],
        uniqueness: ['ceilings', 'window', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F02_10755.png'
      },
      {
        ids: [3336, 3346, 3356, 3366, 3376, 3386],
        uniqueness: ['ceilings', 'conditioning', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F03_4127.png'
      },
      {
        ids: [3343, 3353, 3363, 3373, 3383, 3393, 3402, 3411, 3420, 3429, 3438],
        uniqueness: ['conditioning', 'redevelopment', 'window'],
        image2d: 'Zor_1B_F03_4626.png'
      },
      {
        ids: [3342, 3352, 3362, 3372, 3382, 3392, 3401, 3410, 3419, 3428, 3437],
        uniqueness: ['pantry', 'window', 'conditioning', 'ceilings'],
        image2d: 'Zor_1B_F03_5901.png'
      },
      {
        ids: [3345, 3355, 3365, 3375, 3385],
        uniqueness: ['ceilings', 'conditioning', 'redevelopment', 'repairs'],
        image2d: 'Zor_1B_F03_6747.png'
      },
      {
        ids: [3344, 3354, 3364, 3374, 3384, 3394, 3403, 3412, 3421, 3430, 3439],
        uniqueness: ['guest', 'conditioning', 'window'],
        image2d: 'Zor_1B_F03_8278.png'
      },
      {
        ids: [3338, 3348, 3358, 3368, 3378, 3388, 3397, 3406, 3415, 3424, 3433],
        uniqueness: ['view', 'guest', 'conditioning', 'window'],
        image2d: 'Zor_1B_F03_9097.png'
      },
      {
        ids: [3341, 3351, 3361, 3371, 3381, 3391, 3400, 3409, 3418, 3427, 3436],
        uniqueness: ['guest', 'conditioning', 'window', 'repairs'],
        image2d: 'Zor_1B_F03_9469.png'
      },
      {
        ids: [3339, 3349, 3359, 3369, 3379, 3389, 3398, 3407, 3416, 3425, 3434],
        uniqueness: ['view', 'guest', 'pantry'],
        image2d: 'Zor_1B_F03_9779.png',
        image3d: '97.79.png'
      },
      {
        ids: [3337, 3347, 3357, 3367, 3377, 3387, 3396, 3405, 3414, 3423, 3432],
        uniqueness: ['view', 'guest', 'window'],
        image2d: 'Zor_1B_F03_10654.png'
      },
      {
        ids: [3340, 3350, 3360, 3370, 3380, 3390, 3399, 3408, 3417, 3426, 3435],
        uniqueness: ['view', 'guest', 'window'],
        image2d: 'Zor_1B_F03_13435.png',
        image3d: '134.35.png'
      },
      {
        ids: [3395, 3404, 3413, 3422, 3431, 3440],
        uniqueness: ['guest', 'window', 'ceilings'],
        image2d: 'Zor_1B_F08_12803.png',
        image3d: '128.03.png'
      },
      {
        ids: [3442],
        uniqueness: ['ceilings', 'conditioning', 'window', 'redevelopment', 'guest'],
        image2d: 'Zor_1G_F03_4997.png'
      },
      {
        ids: [3441, 3443, 3445, 3447, 3449, 3451, 3453, 3455, 3457, 3459, 3461],
        uniqueness: ['ceilings', 'conditioning', 'window', 'redevelopment', 'guest'],
        image2d: 'Zor_1G_F03_6961.png'
      },
      {
        ids: [3444, 3446, 3448, 3450, 3452, 3454, 3456, 3458, 3460, 3462],
        uniqueness: ['ceilings', 'conditioning', 'window', 'redevelopment', 'guest'],
        image2d: 'Zor_1G_F04_6961.png'
      },
      {
        ids: [3463],
        uniqueness: ['view', 'guest', 'private'],
        image2d: 'Zor_1G_F14_14047.png'
      },
      {
        ids: [3464, 3465, 3466, 3467, 3468, 3469, 3470, 3471, 3472],
        uniqueness: ['view', 'guest', 'private'],
        image2d: 'Zor_1G_F15_14594.png',
        image3d: '145.94.png'
      }
    ],
    blobPdf: {}
  },
  actions: {
    async getFlat ({dispatch}, flat = null) {
      let result = {}
      if (flat) {
        const flats = await dispatch('filter/getData', null, {root: true})
        result = {
          original: flats.original.filter(({id}) => id === flat).pop(),
          joins: flats.joins.filter(({id}) => id === flat).pop()
        }
      }
      return result
    },
    getFlatMore ({getters}, flat = null) {
      if (flat) {
        const data = getters.more.filter(({ids}) => ids.includes(flat)).pop()
        if (data) {
          if (data.image2d && !data.image2d.includes(flat2dImageDir)) {
            data.image2d = flat2dImageDir + data.image2d
          }
          if (data.image3d && !data.image3d.includes(flat3dImageDir)) {
            data.image3d = flat3dImageDir + data.image3d
          }
        }
        return data
      }
    },
    blobPdf ({getters, commit}, {key, value}) {
      if (!getters.blobPdf.hasOwnProperty(key) && value) {
        commit('setBlobPdf', {[key]: value})
      }
      return getters.blobPdf[key]
    }
  },
  mutations: {
    setBlobPdf (state, payload) {
      state.blobPdf = Object.assign(state.blobPdf, payload)
    }
  },
  getters: {
    more: ({more}) => more.map(item => {
      item.uniqueness = item.uniqueness.filter(uniq => uniqueness.hasOwnProperty(uniq))
      return item
    }),
    blobPdf: ({blobPdf}) => blobPdf,
    uniqueness: ({uniqueness}) => uniqueness
  }
}
