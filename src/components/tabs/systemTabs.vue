<template>
  <div>
    <div class="my-tabs">
      <Tag
        @on-change="$router.push({name: 'home'})"
        checkable
        class="home-tag"
        type="dot"
        :color="primary"
      >首页</Tag>
      <el-tabs
        v-model="$store.state.home.nowRoute"
        type="card"
        closable
        id="modal-step-tabs"
        style="width:90%"
        @tab-remove="removeTab"
        @tab-click="handleJump"
      >
        <el-tab-pane
          v-for="(item, index) in $store.state.home.tabs"
          :key="`item.name_${index}`"
          :label="item.title"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
import { sessionFetch, sessionSave, tabsKey } from "^/storage";
import { Tabs, TabPane } from "element-ui";
export default {
  components: {
    "el-tabs": Tabs,
    "el-tab-pane": TabPane
  },
  data() {
    return {
      editableTabs2: [
        {
          title: "label 1",
          name: "route path 1"
        },
        {
          title: "label 2",
          name: "route path 2"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.$store.state.home.tabs;
      let activeName = this.$store.state.home.nowRoute;
      if (activeName === targetName) {
        if (tabs.length > 1) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let _index = index;
              if (index !== 0) {
                this.$store.commit("SET_nowRoute", tabs[index - 1].name);
                _index--;
              } else {
                this.$store.commit("SET_nowRoute", tabs[index + 1].name);
                _index++;
              }
              console.log(this.$store.getters.nowRoute);
              if (this.$store.getters.tabs[_index].params) {
                var params = {};
                params[
                  this.$store.getters.tabs[_index].paramsKey
                ] = this.$store.getters.tabs[_index].params;
              }
              this.$router.push({
                name: this.$store.getters.tabs[_index].name,
                params
              });
            }
          });
        } else {
          this.$store.commit("SET_nowRoute", "home");
          this.$router.push("/home");
        }
      }
      this.$store.commit(
        "SET_tabs",
        this.$store.state.home.tabs.filter(tab => tab.name !== targetName)
      );
    },
    handleJump(tab) {
      this.$emit("routeJump", tab.name);
    }
  },
  computed: {
    primary() {
      if (
        !this.$store.state.home.nowRoute ||
        this.$store.state.home.nowRoute == 0
      )
        return "primary";
      else return "";
    }
  },
  mounted() {
    if (sessionFetch(tabsKey)) {
      this.$store.commit("SET_tabs", sessionFetch(tabsKey));
    }
  }
};
</script>

<style scoped lang="scss">
.my-tabs {
  display: flex;
  position: relative;
  height: 41px;
  white-space: nowrap;
  border-bottom: 1px solid #ddd;
  overflow-y: hidden;
}
.home-tag {
  height: 100%;
  margin-left: 3px;
  cursor: pointer;
  // margin-top: 4px
}
</style>
<style lang="scss">
.el-tabs__item {
  color: #999;
}
</style>