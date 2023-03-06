<template lang="pug">
  router-link.logo(to="/" exact): img(src="./../../assets/svg/logo.svg")
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus">
.logo
  z-index 100
  user-select none
  absolute left 35px top 30px
  img
    size 369px 99px
</style>
