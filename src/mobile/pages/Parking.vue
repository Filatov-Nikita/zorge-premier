<template lang="pug">
  section(style="height: calc(100vh - 237px); padding-top: 40px")
    FormUserData(theme="Отправить заявку на бронь машиноместа" style="margin-bottom: 30px")
    back-to(:buttonDisable="true")
</template>

<script>
import FormUserData from '@/desktop/components/FormUserData'
import BackTo from '../components/BackTo'

export default {
  mounted() {
    this.loaderHide();
  },
  components: {
    FormUserData,
    BackTo
  }
}
</script>

<style>

</style>
