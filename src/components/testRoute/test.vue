<template>
  <div :class="{'A': $route.name=='route1','B': $route.name=='route2'}">
    <p>test_{{this.$route.name}}</p>
    <litiBar></litiBar>
    <litiPie></litiPie>
    <Button @click="handleJump('route_4')" v-if="$route.name=='route3'" type="primary">路由传参</Button>
    <Button @click="paramRouteJump('route6', '路由6', 'route_6', 'idKey')" v-if="$route.name=='route5'" type="primary">路由传参EX</Button>
  </div>
</template>

<script>
import {paramRouteJump} from '@/mixins'
import litiBar from '../litiBar'
import litiPie from '../litiPie'
export default {
  mixins: [paramRouteJump],
  components: {
    litiBar,
    litiPie
  },
  methods: {
    handleJump(id) {
      this.paramRouteJump('route4', '路由4', id)
    }
  }
}
</script>

<style scoped>
.A{
background: rgb(6,42,38)
}
.B{
background: #ffffff
}
</style>
