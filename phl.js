// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

// //查询语句格式
// interface Query {
//   query?: object
//   condition?: object
//   mutation?: object
//   filters?: Array<string | object>
// }

// //查询所使用的json格式
// interface PhlJson {
//   [con]: Query | Array<Query>
// }

// //Phl 的构造器函数参数格式
// interface PhlConfig {
//   interfaces: object
//   error?: object
//   playground?: boolean
//   playgroundPath?: string
// }

const fs = require('fs')
const path = require('path')

let _this

class Phl {
  interfaceName = '' //查询所使用接口
  curQueryIfArray = [] //当前查询字段/字段数组
  curQuery = {} //当前查询字段
  interfaceData = {} //当前接口将要接收的数据

  //构造函数初始化
  constructor(config = {}) {
    _this = this
    this.interfaces = config.interfaces
    this.error = config.error || {
      errorMsg: 'This handler not exist!',
    }

    //是否开启测试页面
  } // end of constructor

  async playground() {
    const playgroundPath = path.join(__dirname, './dist/index.html')
    console.log(playgroundPath)
    const iphl = await fs.readFileSync(playgroundPath, 'utf-8')
    return iphl
  }

  iphl() {
    return 'hello'
  }

  //主处理函数
  async handler(originObj) {
    let responseData = {} //最终返回结果
    // let data = JSON.parse(originObj)
    let resultTemp
    let interfaceNameArray = Object.keys(originObj) // 获取原始数据中接口名称数组
    //遍历接口名称数组
    for (let i = 0; i < interfaceNameArray.length; i++) {
      _this.interfaceName = interfaceNameArray[i] //保持当前接口，以便其他方法调用
      _this.curQueryIfArray = originObj[_this.interfaceName] //保存当前查询字段

      //判断是否存在该接口
      if (!(_this.interfaceName in _this.interfaces)) {
        //不存在则抛出错误消息
        responseData = Object.assign(responseData, {
          [_this.interfaceName]: _this.error,
        })
        continue
      }

      //处理
      resultTemp = await _this.multipleQuery()

      //最终返回结果增加字段
      responseData = Object.assign(responseData, {
        [_this.interfaceName]: resultTemp,
      })
    }

    return responseData
  } //end of handler

  //是否多重查询
  async multipleQuery() {
    if (Array.isArray(_this.curQueryIfArray)) {
      let resArray = []
      for (let i = 0; i < _this.curQueryIfArray.length; i++) {
        _this.curQuery = _this.curQueryIfArray[i]
        const res = await _this.resolvQuery()
        resArray.push(res)
      }
      return resArray
    } else {
      _this.curQuery = _this.curQueryIfArray
      return await _this.resolvQuery()
    }
  } //end of multipleQuery

  //处理单次查询
  async resolvQuery() {
    let { filters } = _this.curQuery

    let dataBeforFilter

    _this.interfaceData = _this.curQuery

    dataBeforFilter = await _this.send()

    //对结果过滤
    if (filters) {
      return _this.filter(filters, dataBeforFilter)
    } else {
      return dataBeforFilter
    }
  } // end of resolvQuery

  //发送数据到控制器处理
  async send(data) {
    return await _this.interfaces[_this.interfaceName](_this.interfaceData)
  } //end of send

  //过滤器
  filter(filterArray, dataBeforFilter) {
    let result = {}
    //遍历
    for (let i = 0; i < filterArray.length; i++) {
      const attName = filterArray[i]

      //判断是否嵌套，类型为object即嵌套
      if (attName.constructor === Object) {
        let obj = Object.keys(attName)[0] //获取对象属性名，只能有一个值
        let objValue = attName[objAttName] //获取对象属性值
        // let dataBeforFilter[objAttName])

        if (!(objAttName in dataBeforFilter)) {
          result = Object.assign(result, { [objAttName]: 'does not exist' })
          continue
        }
        let temp = _this.filter(objValue, dataBeforFilter[objAttName])
        result = Object.assign(result, { [objAttName]: temp })
      } else {
        //非嵌套
        //判断attName在非对象情况下dataBeforFilter具有该值，
        // let dg = dataBeforFilter.hasOwnProperty("look")
        // console.log()

        if (attName in dataBeforFilter) {
          result = Object.assign(result, {
            [attName]: dataBeforFilter[attName],
          })
        } else {
          //不存在则抛出错误消息
          result = Object.assign(result, { [attName]: 'does not exist' })
          continue
        }
      }
    }
    return result
  } //end of filter
}

module.exports = Phl
