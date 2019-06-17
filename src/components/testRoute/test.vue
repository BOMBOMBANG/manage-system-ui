<template>
  <div :class="{'A': $route.name=='route1','B': $route.name=='route2'}">
    <p>test_{{this.$route.name}}</p>
    <Button @click="handleJump('route_4')" v-if="$route.name=='route3'" type="primary">路由传参</Button>
  </div>
</template>

<script>
import {paramRouteJump} from '@/mixins'
export default {
  mixins: [paramRouteJump],
  methods: {
    handleJump(id) {
      this.paramRouteJump('route4', '路由4', id)
    }
  }
}
</script>

<style scoped>
.A{
background: #cccc
}
.B{
background: #ffffff
}
</style>
