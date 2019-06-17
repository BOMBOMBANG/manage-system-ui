<template>
  <div class="notice-item">
    <img class="notice-icon" :src="noticeIcon">
    <div class="msg">
      <p class="title">{{notice.noticeTitle}}</p>
      <p class="msger">{{notice.noticeRemark}}</p>
    </div>
    <div class="date">{{notice.createTime}}</div>
  </div>
</template>

<script>
export default {
  props: {
    notice: {
      type: Object,
      default() {
        return {
          noticeTitle: '',
          noticeRemark: '',
          createTime
        }
      }
    }
  },
  data() {
    return {
      noticeIcon: require('assets/home/log.png')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/index';
.notice-item{
  @include flex($content: flex-start);
  padding: 0.15rem;
  .notice-icon{
    width: 0.3rem*1.8;
    height: 0.3rem*1.8;
  }
  .msg{
    width: 60%;
    height: 0.3rem*1.8;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 0.1rem;
    .title{
      font-size: 0.15rem;
      color: $text-color;
      font-weight: 600
    }
    .msger{
      font-size: 0.13rem;
      color: $text-color-light;
    }
  }
  .date{
    @include flex($items: flex-end);
    font-size: 0.12rem;
    height: 0.33rem*1.8;
    @include ellipsis
  }
}
</style>
