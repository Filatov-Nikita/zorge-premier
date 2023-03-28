<template lang="pug">

</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(
      {
        path: '/filter',
        query: { storeyId: to.params.storeyId, houseId: to.query.houseId }
      }
    );
  },
}
</script>
