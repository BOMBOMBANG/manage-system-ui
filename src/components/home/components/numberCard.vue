<template>
  <div class="number-card">
    <img class="number-card-bg" v-if="color==='bule'" :src="background.bule">
    <img class="number-card-bg" v-if="color==='green'" :src="background.green">
    <img class="number-card-bg" v-if="color==='orange'" :src="background.orange">
    <div class="header">
      <div class="title">
        <div class="title-icon">
          <slot name="title-icon">
            icon
          </slot>
        </div>
        <div class="title-msg">
          <slot name="title-msg">
            msg
          </slot>
        </div>
      </div>
    </div>
    <div class="body">
      <slot name="body">
        body
      </slot>
      <slot>
        <div class="number">
          <countTo :startVal="0" :end="number"></countTo>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import countTo from '@/iview-admin/components/count-to/count-to'
export default {
  components: {
    countTo
  },
  props: {
    color: {
      type: String,
      default: 'bule'
    },
    number: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      background: {
        bule: require('assets/home/number_card_bg_bule.png'),
        green: require('assets/home/number_card_bg_green.png'),
        orange: require('assets/home/number_card_bg_orange.png')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/index';
.number-card{
  color: #fff;
  width: 2.46rem*2;
  height: 1.22rem*2;
  position: relative;
  @include flex($content: flex-start);
  flex-direction: column;
  &-bg{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0
  }
  .header{
    @include flex;
    position: relative;
    z-index: 100;
    width: 100%;
    height: 0.3rem*2;
    border-bottom: 1px solid #fff;
    .title{
      width: 85%;
      height: 100%;
      font-size: 0.15rem;
      @include flex(
        $content: space-between
      );
      &-icon{
        @include flex($content: flex-start);
        height: 100%;
        width: 40%;
        border-right: 1px solid #fff
      }
      &-msg{
        flex: 1;
        @include flex;
        margin-left: 0.2rem
      }
    }
  }
  .body{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 100;
    flex: 1;
    width: 85%;
    padding: $base-padding*1.5 0;
    margin-top: 0.05rem;
    .number{
      font-size: 0.2rem;
      @include flex($content:flex-start)
    }
  }
}
</style>