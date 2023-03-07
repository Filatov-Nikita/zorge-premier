<template lang="pug">
  form(@submit.prevent="submit" style="max-width: 340px; margin: 0 auto")
    .custom-form__title {{ success ? 'Спасибо! Ваша заявка отправлена' : theme }}
    .row(:style="{ opacity: success ? 0 : 1}")
      .col-md-12.form-group
        label.custom-form__label(for="name") Ваше имя
        .position-relative: input.form-control.custom-form__control(
          type="text"
          name="name"
          id="name"
          v-model="form.name"
          required
        )
      .col-md-12.form-group
        label.custom-form__label(for="cellphone") Номер телефона
        .position-relative: input.form-control.custom-form__control(
          type="tel"
          placeholder="+7"
          v-model="form.phone"
          v-mask="'+7 (9##) ###-##-##'"
          minlength="18"
          id="cellphone"
        )
    .row(:style="{ opacity: success ? 0 : 1}")
      .col-md-12(style="margin-top: 14px")
        proposed-page(@click="1" type="submit" style="margin: 0 auto; max-width: 300px; width: 100%") Забронировать
      .col-md-12.d-flex.align-items-center(style="margin-top: 40px; margin-left: auto; margin-right: auto; max-width: 300px")
        .custom-form__agree Я согласен с&nbsp;
          a(href="javascript:void(0)" @click="openAgree") условиями обработки моих персональных данных
</template>

<script>
import ProposedPage from './ProposedPage'
import { mapGetters } from 'vuex';
import { book } from '@/api/flats';
import { mask } from 'vue-the-mask';

export default {
  props: {
    theme: {
      required: true,
      type: String
    }
  },
  components: { ProposedPage },
  directives: { mask },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: ''
      },
      success: false
    }
  },
  computed: {
    ...mapGetters('agreePrivatePolice', ['agreement']),
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    async submit() {
      try {
        if(this.form.phone.length !== 18) return alert('Номер телефона должен быть заполнен полностью!')
        this.loaderShow();
        await book({
          client_id: '1',
          client_secret: 'SEcVU6PJlq68ZS4GzPPOltJprNazjw1Xl4sJ5Pk0',

          email_ids: [1],
          theme: this.theme,

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
          message: this.theme,
        });

        this.$VKGoal('lead');

        this.loaderHide();
        setTimeout(() => {
          this.form.name = '';
          this.form.phone = '';
          this.success = true;
        }, 450)
      } catch(e) {
        this.loaderHide();
        setTimeout(() => {
          alert('Произошла ошибка на сервере')
        }, 450);
      }
    },
    openAgree () {
      $.fancybox.open(`<div class="container">${this.agreement}</div>`)
    }
  }
}
</script>
<style lang="stylus">
.custom-modal
  z-index: 999 !important
</style>
<style lang="stylus" scoped>
.custom-form
  padding 20px
  overflow initial
  user-select none
  position relative
  background-color #151c27
  border-top 8px solid #1f252f
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
    color: #fff
    font-family: 'Heading Pro Wide';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-bottom: 40px
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
    font-size .75rem
    padding-left 20px
    position relative
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
