import { sessionSave, tabsKey } from "^/storage"

//带参数页面跳转
export const paramRouteJump = {
  methods: {
    paramRouteJump(routeName ,title, id) {
      this.$store.commit('PUSH_tabs', {
        'name': routeName,
        'title': title,
        'params': id
      })
      sessionSave(tabsKey, this.$store.state.home.tabs)
      this.$store.commit('SET_nowRoute', routeName)
      this.$router.push({
        name: routeName,
        params: {
          id: id
        }
      })
    }
  }
}

//webSocket
import SockJS from "sockjs-client";
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
}
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
  //之前项目的一个引导配置例子，可以作为参考
    // driverHome() {
    //   let driver = this.createDriver()
    //   driver.defineSteps([
    //     {
    //       element: '#modal-step-nav',
    //       popover: {
    //         title: '菜单',
    //         description: '您可以在菜单栏选择相应的功能,菜单栏可以收缩和展开',
    //         position: 'right',
    //         offset: 20
    //       }
    //     },
    //     {
    //       element: '#modal-step-numbers',
    //       popover: {
    //         title: '数据统计',
    //         description: '数据统计栏是展示当年您的科研成果,包括当年当前的积分和总业绩数,意思您在部门中的排名',
    //         position: 'top',
    //         offset: 20
    //       }
    //     },
    //     {
    //       element: '#modal-step-notice',
    //       popover: {
    //         title: '通知',
    //         description: '通知栏是显示关于科研教研最新通知咨询的地方,您可以点击每一个通知查看具体信息',
    //         position: 'left',
    //         offset: 100
    //       }
    //     },
    //     {
    //       element: '#model-step-score-statistics',
    //       popover: {
    //         title: '积分统计',
    //         description: '积分统计栏是显示您当年上传所有业绩的组成和您的积分占系内所有成员的占比',
    //         position: 'left',
    //         offset: 100
    //       }
    //     }
    //   ])
    //   driver.start()
    // }
  }
}