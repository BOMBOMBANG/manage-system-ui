import { sessionSave, tabsKey } from "^/storage"

//带参数页面跳转
export const paramRouteJump = {
  methods: {
    /**
     * @param {*} routeName //路由name
     * @param {*} title     //tab栏显示的名字
     * @param {*} id        //动态路由参数
     * @param {*} idKey     //动态路由参数key，默认为id
     */
    paramRouteJump(routeName, title, id, idKey = "id") {
      this.$store.commit('PUSH_tabs', {
        'name': routeName,
        'title': title,
        'params': id,
        'paramsKey': idKey
      })
      sessionSave(tabsKey, this.$store.state.home.tabs)
      this.$store.commit('SET_nowRoute', routeName)
      const params = {}
      params[idKey] = id
      this.$router.push({
        name: routeName,
        params
        // params: {
        //   id: id
        // }
      })
    }
  }
}

//webSocket
/*import SockJS from "sockjs-client";
import Stomp from "stompjs";
export const webSocket = {
data(){
  return {
    stompClient:'',
    timer:''
  }
},
methods:{
    initWebSocket() {
      this.connection();
      let that= this;
    },  
    connection() {
        // 建立连接对象
      let socket = new SockJS(this.$store.state.home.hostname+'/websocket');
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 定义客户端的认证信息,按需求配置
      let headers = {
        Authorization:''
      }
      // 向服务器发起websocket连接
      this.stompClient.connect(headers,() => {
        this.stompClient.subscribe('/topic/pullMessage', (msg) => { // 订阅服务端提供的某个topic
          // console.log('广播成功')
          // console.log(msg);  // msg.body存放的是服务端发送给我们的信息
          let res = JSON.parse(msg.body)
          this.$store.commit('SET_socketData', res)
          // console.log(res, 'res');
        },headers)
      }, (err) => {
        // 连接发生错误时的处理函数
        // console.log('失败')
        // console.log(err);
      })
    },    //连接 后台
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    }  // 断开连接
  }
}**/

//引导
export const createDriver = {
  methods: {
    createDriver() {
      return new Driver({
        closeBtnText: '关闭引导',            // Text on the close button for this step
        stageBackground: '#ffffff',       // Background color for the staged behind highlighted element
        nextBtnText: '下一步',              // Next button text for this step
        prevBtnText: '上一步',
        doneBtnText: '完成',
        onReset: () => {
          this.driving = false
        }
      })
    }
  }
}

//各个页面引导的配置
export const openDriver = {
  methods: {
    driverHome() {
      let driver = this.createDriver()
      driver.defineSteps([
        {
          element: '#modal-step-nav',
          popover: {
            title: '菜单',
            description: '您可以在菜单栏选择相应的功能,菜单栏可以收缩和展开',
            position: 'right',
            offset: 20
          }
        },
        {
          element: '#modal-step-header',
          popover: {
            title: 'header',
            description: '头',
            position: 'bottom',
            offset: 20
          }
        },
        {
          element: '#modal-step-tabs',
          popover: {
            title: 'tabs',
            description: '历史路由tabs',
            position: 'left',
            offset: 100
          }
        }
      ])
      driver.start()
    }
  }
}