<template>
  <div class="home">
    <div id="modal-step-nav" v-if="isShowMeau" :class="{'system-meau-hidden': !systemMeau, 'system-meau': systemMeau,'system-meau-max': mainMin,'system-meau-min':!mainMin}" @mouseover="systemMeau=true" @mouseleave="systemMeau=false">
      <system-meau
        @routeJump="handleJump">
      </system-meau>
    </div>
    <div class="right" @scroll="handleScroll">
      <system-header
        @on-refresh="handleRefrsh"
        @zoom="handleZoom"></system-header>
      <system-tabs @routeJump="handleJump">
        <keep-alive v-if="!loading" slot="content">
          <div class="main" v-show="$route.name=='home'">
            <home-page :scrollTop="scrollTop"></home-page>
          </div>
          <router-view :scrollTop="scrollTop" @routeJump="handleJump" class="main" :class="[leavingName,inName]"></router-view>
        </keep-alive>
      </system-tabs>
    </div>
    <allLoading :loading="loading"></allLoading>
  </div>
</template>

<script>
import systemHeader from '@/components/header/systemHeader';
import systemMeau from '@/components/meau/systemMeau';
import systemTabs from '@/components/tabs/systemTabs';
import allLoading  from '~/allLoading';
import homePage from '@/components/home/index';
import { sessionFetch, sessionSave, tabsKey } from "^/storage"
// import { mapGetters } from 'vuex';
export default {
  components: {
    "system-header": systemHeader,
    "system-meau": systemMeau,
    "system-tabs": systemTabs,
    "home-page": homePage,
    "allLoading": allLoading
  },
  data() {
    return {
      "mainMin": true,
      "loading": false,
      "leaving": false,
      "in": false,
      "scrollTop": 0,
      "systemMeau": false
    }
  },
  computed: {
    // ...mapGetters(['nowRoute', 'tabs', 'userInfo']),
    nowRoute() {
      return this.$store.getters.nowRoute
    },
    tabs() {
      return this.$store.getters.tabs
    },
    userInfo() {
      return this.$store.getters.userInfo
    },
    leavingName() {
      if(this.leaving) return 'leaving'
      else return ''
    },
    inName() {
      if(this.in) return 'in'
      else return ''
    },
    isShowMeau() {
      // console.log(this.userInfo);
      if(this.userInfo.indexes) {
        if(this.userInfo.indexes.length > 0) return true
        else return false
      }
      else return false
    }
  },
  methods: {
    handleZoom(state) {
      this.mainMin = !state
    },
    jump(routeName) {
      sessionSave(tabsKey, this.$store.state.home.tabs)
      for(let item of this.tabs) {
        if(item.name == routeName) {
          if(item.params) {
            var params = {};
            params[item.paramsKey] = item.params
          }
          this.$router.push(
            {
              name: routeName,
              params
            }
          )
          this.in = true
          setTimeout(()=>{
            this.in = false
          }, 100)
          return
        }
      }
    },
    handleJump(routeName, params) {
      this.leaving = true
      setTimeout(()=>{
        this.leaving = false
        this.jump(routeName)
      }, 100)
    },
    handleRefrsh() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    handleScroll(data) {
      this.scrollTop = document.getElementsByClassName('right')[0].scrollTop
    }
  },
  mounted() {
    if(this.$route.path.split('/')[2]) {
      this.$store.commit("SET_nowRoute", this.$route.path.split('/')[2])
    }
  },
  watch: {
    "$route.path": function(curVal, oldVal) {
      if(curVal.split("/").length>1){
        if (curVal.split("/")[1] != this.nowRoute) {
          this.$store.commit("SET_nowRoute", curVal.split("/")[2])
          this.in = true
          // setTimeout(()=>{
            this.in = false
          // }, 100)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index";

.home{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: hidden;
  padding-bottom: $base-margin;
  .right{
    overflow-x: hidden;
    width: 100%;
  }
}

.main{
  position: relative;
  transition: 0.1s;
  flex: 1;
  width: 99%;
  padding-right: $base-padding;
  min-height: 6.50rem;
  // background: $body-background;
  // height: 80%;
  padding-left: $base-padding
}

.leaving{
  transform: translateX(1%);
  opacity: 0
}
.in{
  opacity: 0;
  transform: translateX(-1%)
}

.tabs{
  position: relative;
  float: left;
  transition: 0.2s; 
  z-index: 1000;
}

.system-meau-hidden{
  height: 100vh;
  overflow: hidden;
  transition: 0.3s;
  background: rgb(51, 65, 84);
}
.system-meau{
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: 0.3s;
  background: rgb(51, 65, 84);
  // &:hover{
  //   height: 100%;
  //   width: 100%;
  //   overflow: auto;
      &::-webkit-scrollbar {
      width: 8px; /*对垂直流动条有效*/
      // height: 10px; /*对水平流动条有效*/
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    &::-webkit-scrollbar-track{
      box-shadow: inset 0 0 6px rgb(51, 65, 84);
      -webkit-box-shadow: inset 0 0 6px rgb(51, 65, 84);
      background-color: rgb(51, 65, 84);
      border-radius: 3px;
    }

    /*定义滑块颜色、内阴影及圆角*/
    &::-webkit-scrollbar-thumb{
      border-radius: 7px;
      box-shadow: inset 0 0 6px rgb(51, 65, 84);
      -webkit-box-shadow: inset 0 0 6px rgb(51, 65, 84);
      background-color: rgba(232, 232, 232, 0.205);
    }

    /*定义两端按钮的样式*/
    &::-webkit-scrollbar-button {
      background-color:rgb(51, 65, 84);
    }

    /*定义右下角汇合处的样式*/
    &::-webkit-scrollbar-corner {
      background:#fff;
    }
  // }
}
.system-meau-max{
  width: 230px;
}
.system-meau-min{
  width: 80px;
}
</style>
