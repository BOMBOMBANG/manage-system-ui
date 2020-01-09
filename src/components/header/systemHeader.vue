<template>
  <header>
    <div id="modal-step-header" class="top">
      <div @click="handleZoom()" class="option">
        <Icon :class="iconName" type="md-menu" />
      </div>

      <div class="breadcrumbItem">
        <Breadcrumb>
          <BreadcrumbItem
            :to="item.to"
            v-for="(item,index) in routePath"
            :key="`ROUTE_PATH_${index}`"
          >
            <span style="color: #fff">{{item.name}}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div class="refresh">
        <Button icon="md-refresh" type="text" @click="handleRefresh">刷新</Button>
      </div>
      <el-dropdown @command="handelChangeDro" class="personal">
        <div class="avatar">
          <Icon type="md-person" />
          <p>{{$store.state.home.userInfo.nickname}}</p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Info">个人信息</el-dropdown-item>
          <el-dropdown-item command="PSW">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <Button
        id="modal-step-button"
        @click.prevent.stop="handleOpenDriver()"
        class="button"
        icon="md-help"
        shape="circle"
        style="margin:0 10px"
        type="primary"
      ></Button>
    </div>

    <Modal v-model="changePSW" width="450">
      <p slot="header" style="text-align:center">
        <span style="text-align:20px">修改密码</span>
      </p>
      <div style="text-align:center;">
        <Form
          :model="form"
          :rules="rules"
          ref="formPassword"
          label-position="right"
          :label-width="100"
        >
          <FormItem prop="oldPassword" label="原密码">
            <Input
              type="password"
              v-model.trim="form.oldPassword"
              placeholder="请输入旧密码"
              style="width: 260px"
            />
          </FormItem>
          <FormItem prop="newPassword" label="新密码">
            <Input
              type="password"
              v-model.trim="form.newPassword"
              placeholder="请输入新密码"
              style="width: 260px"
            />
          </FormItem>
          <FormItem prop="checkPassword" label="确认密码">
            <Input
              type="password"
              v-model.trim="form.checkPassword"
              placeholder="请再次输入新密码"
              style="width: 260px"
            />
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="changePassword('formPassword')" style="width:60px">修改</Button>
        <Button type="default" @click="changePSW=false" style="width:60px">取消</Button>
      </div>
    </Modal>

    <Modal v-model="personalInfo" title="个人信息">
      <div class="form">
        <div class="form-item" v-for="(item,key) of userInfoForm" :key="key">
          <p class="title">{{item}}：</p>
          <Input class="input" disabled :value="personalInfoObj[key]" placeholder="暂无"></Input>
        </div>
      </div>
    </Modal>
  </header>
</template>

<script>
// import { mapGetters } from 'vuex';
import { storageFetch, sessionFetch, userInfoKey } from "^/storage";
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";
import { token } from "^/cookies";
import { createDriver, openDriver } from "@/mixins";
import CookieUtils from "^/cookies";
export default {
  components: {
    "el-dropdown": Dropdown,
    "el-dropdown-menu": DropdownMenu,
    "el-dropdown-item": DropdownItem
  },
  mixins: [createDriver, openDriver],
  data() {
    const validatePassword = (rules, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        checkPassword: ""
      },
      rules: {
        oldPassword: [
          { require: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        checkPassword: [{ validator: validatePassword, trigger: "blur" }]
      },
      changePSW: false,
      personalInfo: false,
      personalInfoObj: {},
      userInfoForm: {
        age: "年龄",
        email: "电子邮箱",
        nickname: "姓名",
        searchTeamName: "科研团队名称",
        teacherType: "老师类型",
        userDepName: "系别",
        userLevel: "职位级别",
        userPhone: "手机号",
        username: "账号"
      },
      // isCollapse: false,
      navgation: [],
      logo: require("@/assets/logo.png"),
      defaultActive: "route1"
    };
  },
  computed: {
    routePath() {
      // console.log(this.$router);
      var arr = this.$route.path.split("/");
      var _arr = [];
      for (let item of arr) {
        if (item == "home")
          _arr.push({
            to: "/home",
            name: item
          });
        else
          _arr.push({
            to: "/home/" + item,
            name: item
          });
        if (_arr.length == 3) break;
      }
      return _arr;
    },
    // ...mapGetters(['userInfo', 'nowRoute','isCollapse', 'stepNum']),
    userInfo() {
      return this.$store.getters.userInfo;
    },
    nowRoute() {
      return this.$store.getters.nowRoute;
    },
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
    stepNum() {
      return this.$store.getters.stepNum;
    },
    isFristLogin() {
      return this.$store.getters.isFristLogin;
    },
    iconName() {
      if (!this.isCollapse) {
        return "transiform_collapse";
      } else return "transiform";
    }
  },
  methods: {
    changePassword(name) {
      this.$refs[name].validate(valid => {
        //修改密码
      });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleZoom() {
      this.$store.commit("SET_isCollapse", !this.isCollapse);
      this.$emit("zoom", this.isCollapse);
    },
    handleSelect(index, indexPath) {
      this.$store.commit("SET_nowRoute", index);
      this.$emit("routeJump", index);
      if (indexPath.length > 1) {
        for (
          let i = 0;
          i < this.navgation[indexPath[0] - 1].children.length;
          i++
        ) {
          if (this.navgation[indexPath[0] - 1].children[i].routeName == index) {
            this.$store.commit("PUSH_tabs", {
              name: index,
              title: this.navgation[indexPath[0] - 1].children[i].name
            });
            return;
          }
        }
      } else {
        for (let i = 0; i < this.navgation.length; i++) {
          if (this.navgation[i].routeName == index) {
            this.$store.commit("PUSH_tabs", {
              name: index,
              title: this.navgation[i].name
            });
            return;
          }
        }
      }
    },
    handelChangeDro(command) {
      switch (command) {
        case "PSW":
          this.changePSW = true;
          break;
        case "Info":
          this.personalInfo = true;
          this.handleGetPersonalInfo();
          break;
        case "exit":
          this.$store.commit("SET_tabs", []);
          CookieUtils.remove(token);
          this.$router.push("/");
      }
    },
    handleRefresh() {
      this.$emit("on-refresh");
    },
    handleGetPersonalInfo() {
      //获取用户信息
    },
    handleOpenDriver() {
      // console.log(this.nowRoute);
      switch (this.nowRoute) {
        case "home":
          this.driverHome();
          // console.log('home');
          break;
        case undefined:
          this.driverHome();
          // console.log('home');
          break;
        case "0":
          this.driverHome();
          // console.log('home');
          break;
        case "uploadAchievement":
          this.handleUploadOpenDriver();
          break;
        default:
          this.$Message.warning("该页面没有引导");
      }
    }
  },
  mounted() {
    if (this.userInfo == "") {
      this.$store.commit("SET_userInfo", storageFetch(userInfoKey));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/index";
$header-height: 50px;

header {
  .button {
    &:hover {
      position: relative;
      &::after {
        background: #fff;
        @include flex;
        width: 60px;
        height: 30px;
        border-radius: 5px;
        box-shadow: 0 0 5px #666;
        position: absolute;
        color: #000;
        content: "打开引导";
        font-size: 12px;
        top: 25px;
        left: -55px;
      }
    }
  }
  position: relative;
  width: 100%;
  height: 50px;
  background: $primary-color;
  // @include flex;
  font-size: $font-size-base;
  color: $title-color;
}
.top {
  width: 100%;
  position: absolute;
  height: 50px;
  line-height: 50px;
  background: $primary-color;
  color: #ffffff;
  .option {
    cursor: pointer;
    float: left;
    @include flex;
    width: 80px;
    font-size: 25px;
    .transiform_collapse,
    .transiform {
      transition: 0.2s;
    }
    .transiform {
      transform: rotateZ(90deg);
    }
  }
  .breadcrumbItem {
    max-width: 300px;
    float: left;
  }
  .refresh {
    float: right;
    button {
      color: #fff;
      &:hover {
        background: $primary-color;
        color: #dddddd;
      }
    }
    margin-left: $base-margin;
    font-size: 15px;
  }
  .personal {
    width: 60px;
    float: right;
    margin-left: auto;
    margin-right: $base-margin * 1.5;
    .avatar {
      font-size: 20px;
      cursor: pointer;
      @include flex;
      color: #fff;
      // p{
      //   font-size: 25px
      // }
    }
  }
}
.form {
  @include flex;
  flex-direction: column;
  &-item {
    margin: $base-margin * 0.5 auto;
    @include flex;
    width: 100%;
    p {
      width: 120px;
    }
    .input {
      flex: 1;
    }
  }
}
</style>
