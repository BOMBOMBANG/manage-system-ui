<template>
  <Spin fix class="detail-spin" v-show="loading">
    <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
    <div>加载中</div>
  </Spin>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scope>
@import '../styles/index';
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .detail-spin{
      background: #ffffff99;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      @include flex;
    }
</style>