<template lang="pug"> .title-circle
  .title-circle__text: slot
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus">
.title-circle
  display flex
  color #f6ac6d
  size 100% 90px
  font-size 23px
  line-height 1.4
  font-weight 700
  margin-top -45px
  text-align center
  position relative
  margin-bottom 5px
  align-items center
  letter-spacing 2.19px
  justify-content center
  text-transform uppercase
  font-family 'Heading Pro Wide'
  &:before
    z-index 1
    content ''
    size 289px 337px
    margin-left -240px
    absolute left 50% top 0
    background url('../assets/images/title-location-bg.png') no-repeat center/289px 337px
  &:after
    content ''
    size 100% 25px
    absolute left 0 bottom 45px
    background linear-gradient(0, #181f29 0%, rgba(31, 37, 47, 0) 100%)
  &__text
    z-index 1
    position relative
</style>
