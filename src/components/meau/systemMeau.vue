<template>
<nav class="nav" id="modal-step-nav">
  <div class="logo">
    <img :src="logo">
    <p :class="{'keyan': isCollapse}">管理系统</p>
  </div>
  <el-menu
    unique-opened
    show-timeout="200"
    hide-timeout="200"
    class="el-menu-vertical-demo"
    background-color="#334154"
    text-color="#c1cbd7"
    active-text-color="#fff"
    :class="{'navgtion_min': !isCollapse}"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    :collapse="isCollapse"
    :default-active="$store.getters.nowRoute">
  <div v-for="(submenu,index) in navgation" :key="`nav_${index}`">
    <el-submenu v-if="submenu.children" :index="submenu.index">
      <template slot="title">
        <Icon class="icon" :type="`${submenu.icon}`"></Icon>
        <span class="title" v-show="!isCollapse">{{submenu.name}}</span>
      </template>
      <el-menu-item-group v-for="(item,idx) in submenu.children" :key="`nav_${idx}`">
        <el-menu-item :index="item.routeName">
          <Icon class="icon" :type="`${item.icon}`"></Icon>
          {{item.name}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item v-else :index="submenu.routeName">
      <Icon class="icon" :type="`${submenu.icon}`"></Icon>
      <span slot="title">{{submenu.name}}</span>
    </el-menu-item>
  </div>
  </el-menu>
</nav>
</template>

<script>
import { getNav } from './navgation.js'
// import { mapGetters } from 'vuex';
import { storageFetch, sessionFetch, userInfoKey } from "^/storage"
import axios from '^/axios'

export default {
  data() {
    const validatePassword = (rules, value, callback) => {
    if (value == '') {
      callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入的密码不一致"))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [{require: true, message: '旧密码不能为空', trigger: 'blur'}],
        newPassword: [{required: true, message: '新密码不能为空', trigger: 'blur'}],
        checkPassword: [{validator: validatePassword, trigger: 'blur'}]
      },
      changePSW: false,
      // isCollapse: false,
      navgation: [],
      logo: require("@/assets/logo.png"),
      defaultActive: 'route1'
    }
  },
  computed: {
    routePath() {
      // console.log(this.$userInfo);
      return this.$route.path.split("/");
    },
    // ...mapGetters(['userInfo', 'nowRoute', 'isCollapse']),
    userInfo() {
      return this.$store.getters.userInfo
    },
    nowRoute() {
      return this.$store.getters.nowRoute
    },
    isCollapse() {
      return this.$store.getters.isCollapse
    },
    iconName() {
      if(!this.isCollapse) {
        return
      }else return 'transiform'
    }
  },
  methods: {
    changePassword(name) {
      //修改密码
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleZoom() {
      this.$emit('zoom', this.isCollapse)
    },
    handleSelect(index, indexPath) {
      if(indexPath.length>1) {
        for(let item of this.navgation) {
          if(item.index == indexPath[0]) {
            for(let itemChild of item.children) {
              if(itemChild.routeName == index) {
                this.$store.commit('PUSH_tabs', {
                  'name': index,
                  'title': itemChild.name
                })
                break
              }
            }
            break
          }
        }
      }else {
        for(let i = 0; i<this.navgation.length; i++) {
          if(this.navgation[i].routeName == index) {
            this.$store.commit('PUSH_tabs', {
              'name': index,
              'title': this.navgation[i].name
            })
            break
          }
        }
      }
      this.$store.commit('SET_nowRoute', index)
      this.$emit('routeJump', index)
    },
    handelChangeDro(command) {
      if(command == "PSW") {
        this.changePSW = true
      }
    },
    handleRefresh() {
      this.$emit('on-refresh')
    }
  },
  mounted () {
    if(this.userInfo == '') {
      this.$store.commit("SET_userInfo", storageFetch(userInfoKey))
    }
    getNav().then( navgation => {
      for(let item of this.userInfo.indexes) {
        var _item = item.split('-')
        if(_item.length == 1) {
          this.navgation.push(navgation[_item[0]-1])
        }else if(_item.length == 2) {
          let flag = true
          for(let i of this.navgation) {
            if(i.index == _item[0]) {
              i.children.push(navgation[_item[0]-1].children[_item[1]-1])
              flag = false
              break;
            }
          }
          if(flag) {
            let item_nav = {
              name: navgation[_item[0]-1].name,
              index: navgation[_item[0]-1].index,
              icon: navgation[_item[0]-1].icon,
              children: []
            }
            item_nav.children.push(navgation[_item[0]-1].children[_item[1]-1])
            this.navgation.push(item_nav)
          }
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/index";
.nav{
  background: #334154;
  position: relative;
  height: 100%
  // border-right: 2px #dddddd solid;
}
.navgtion_min{
}

.logo{
  transition: 0.2s;
  height: 50px;
  @include flex();
  max-width: 180px;
  font-size: $font-size-mid;
  font-weight: $font-weight-large;
  overflow: hidden;
  img{
    width: 30px;
    height: 30px;
  }
  p{
    transition: 0.2s;
    // width: 100px;
    color: #ffffff;
    font-size: 16px;
    @include ellipsis;
  }
  .keyan{
    // position: absolute;
    width: 0;
    // transform: scale(0);
    overflow: hidden;
  }
}
.form{
  @include flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  &-item{
    width: 100%;
    @include flex
  }
}

.el-menu-vertical-demo{
  position: relative;
  height: 100%;
  background: rgba(0,0,0,0);
  border: #334154 0px solid;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}
.icon{
  font-size: 20px;
  margin: 5px;
}
</style>
