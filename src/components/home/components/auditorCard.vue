<template>
  <div class="number-card" :style="backgroundColor">
    <div class="header">
      <slot name="header">
        <p class="title">{{title}}</p>
        <p class="subtitle"><countTo :startVal="0" :end="number"></countTo>{{unit}}</p>
      </slot>
    </div>
    <div class="body">
      <div class="icon">
        <slot name="icon">
          icon
        </slot>
      </div>
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
    title: {
      type: String,
      default: 'title'
    },
    number: {
      type: [String, Number],
      default: 0
    },
    background: {
      type: String,
      default: 'red, blue'
    },
    unit: {
      type: String,
      default: '项'
    }
  },
  computed: {
    backgroundColor() {
      return {
        background: 'linear-gradient(to bottom right, '+ this.background + ')'
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/index';
.number-card{
  color: #fff;
  // width: 2.46rem*1.47;
  width: 2.3rem;
  border-radius: 0.1rem;
  height: 0.9rem*2;
  position: relative;
  @include flex($content: flex-start);
  &-bg{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0
  }
  .header{
    padding: 0.2rem;
    position: relative;
    z-index: 100;
    width: 70%;
    display: flex;
    flex-direction: column;
    height: 100%;
    .title{
      @include ellipsis($overflow: none);
      font-size: 0.18rem
    }
    .subtitle{
      font-size: 0.2rem;
      @include flex($content: flex-start);
    }
    .type{
      font-size: 0.16rem;
      margin-bottom: $base-margin*1.5
    }
  }
  .body{
    padding: 0.15rem;
    position: relative;
    z-index: 100;
    width: 30%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end
  }
}
</style>