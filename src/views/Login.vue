<template>
  <div class="login">
  <img src="../assets/login_bg.jpg" class="bg">
  <div>
  <p class="topInfo">Welcome</p>
  <h1 class="LogTitle">XX管理系统</h1>
  </div>

  <Card class="login_msg" :bordered="false">
  <div style="text-align:center">
  <Form class="form" ref="loginMsg" :model="loginMsg" :rules="ruleLoginMsg">

  <FormItem class="form-item" prop="name">
    <Input class="input-large" placeholder="请输入工号" @on-enter='handleSubmit' v-model="loginMsg.name"  size="large" >
    <Icon type="ios-contact-outline" slot="prefix" size="24"/>
    </Input>
  </FormItem>

  <FormItem class="form-item" prop="password">
    <Input class="input-large" type="password" @on-enter='handleSubmit' placeholder="请输入密码" v-model="loginMsg.password" size="large" >
    <Icon type="ios-unlock" slot="prefix" size="24"/>
    </Input>
  </FormItem>

  <!-- <FormItem style="margin-left: 3.6rem; margin-top: -0.1rem;">
    <Checkbox v-model="loginMsg.remember" @on-enter='handleSubmit' ></Checkbox>
    <span style="font-size:0.14rem;">记住密码</span>
  </FormItem> -->

  <FormItem class="form-item">
    <Button class="login-button" type="primary" @click="handleSubmit" :loading="isloading">登录</Button>
  </FormItem>

  </Form>
  </div>
  </Card>

  <div class="logFoot">
  <!-- <img src="../assets/logo.png" alt="logo"> -->
  <p class='uppower'>@WYF</p>
  </div>
  </div>
</template>

<script>
import {
  sessionRemove,
  tabsKey
  } from '^/storage'
import axios from '^/axios'

export default {
  data() {
    const validateName= (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入账号'));
    }else callback()
    }
    const validatePassword= (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请输入密码'));
      }else callback()
    }
    return{
      loginMsg: {
        name: '',
        password: '',
        verifyCode: '',
        remember: false
      },
      ruleLoginMsg: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      loading: false,
      code: '',
      tokens: {},
      changeVerify: true,
      isloading: false
    }
  },
  methods: {
    getUserInfo(params) {

    },
    async handleSubmit() {
      //登录
      // this.$router.push({
      //   name: 'home'
      // })
      try{
        this.isloading = true
        // console.log('home');
        if (this.$route.params.path) {
          this.$router.push(this.$route.params.path)
        } else {
          this.$router.push('/home')
        }
        this.isloading = false
       }catch(e) {
        this.isloading = false
        // console.log(e,'catch');
      }
    }
  },
  mounted() {
    // console.log(this.$route.params);
    sessionRemove(tabsKey)
  }
}
</script>

<style scoped lang="scss">
@import "../styles/index";

.login{
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: $full-width;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.topInfo {
  position: absolute;
  top: 9%;
  left: 50%;
  height: 0.60rem;
  font-size: 0.55rem;
  color: #fff;
  transform: translate(-50%);
}
.LogTitle {
  position: absolute;
  top: 25%;
  left: 50%;
  height: 0.40rem;
  font-size: 0.30rem;
  color: #fff;
  transform: translate(-50%);
}
.login_msg{
  position: absolute;
  @include flex;
  padding-top: 20px;
  background-color: rgba(255, 255, 255, .7);
  width: 400px;
  height: 300px;
  top: 32%;
  left: 50%;
  transform: translate(-50%);
  border-radius: 0.1rem;
  z-index: 10;
}
.logFoot img {
  position: absolute;
  left: 50%;
  bottom: -0.25rem;
  transform: translate(-50%) scale(0.6);
}
.uppower{
  position: absolute;
  bottom: 0.10rem;
  right: 0.20rem
}

.form{
  @include flex;
  flex-direction: column;
  width: 400px;
  &-item{
    @include flex;
    width: 350px;
    .input-large{
      width: 350px
    }
    .input-small{
      width: 150px;
      margin-left: auto
    }
    .code{
      height: 34px;
      width: 120px;
      margin-right: auto
    }
    .login-button{
      margin-top: 40px;
      height: 40px;
      @include flex;
      width: 350px;
      font-size: 20px
    }
  }
}
</style>
