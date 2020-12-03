/*
 * @Author: your name
 * @Date: 2020-09-08 14:13:32
 * @LastEditTime: 2020-10-29 15:06:44
 * @LastEditors: zhangyuge
 * @Description: In User Settings Edit
 * @FilePath: \partd:\huanbo\backmananger\src\utils\mixins.js
 */
import {
  formatCurrency
} from "@/utils/index.js"
import {
  formatNumberYuan,
  ossImgFilter,
} from "@/filters/index.js"
export default {
  data() {
    return {
      formRules: {
        required: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }]
      }
    }
  },
  filters: {},
  created() {},
  methods: {
    isTrue(val) {
      if (val === '' || val === null || val === undefined || val == 'undefined' || val == 'null') {
        return false
      } else {
        return true
      }
    },
    getParams(obj) {
      const params = new FormData()
      console.log(obj);
      for (let key in obj) {
        if (this.isTrue(obj[key])) {
          params.append(key, obj[key])
        } else {
          params.append(key, '')
        }
      }
      return params
    },
    getSelectTypeNameEvent(list, value, type) {
      let itrem = list.find(item => {
        return item[type] == value
      })
      return itrem
    },
    getSafariTime(time) {
      return time && time.toString().replace(/\//gi, '-')
    },
    getRenovation(type, list = []) {
      const findItem = list.find(item => {
        return item.value === type
      })
      return findItem && findItem['label']
    },
    camelCase(s) {
      return s.replace(/_([a-z])/g, function(all, letter) {
        return letter.toUpperCase();
      });
    },
    //讲下划线参数转为驼峰
    cameObj(formDatas) {
      const obj = {}
      if (typeof formDatas == 'object') {
        for (let key in formDatas) {
          let Keys = this.camelCase(key)
          obj[Keys] = formDatas[key]
        }
      }
      return obj
    },
    deepCopy(obj) {
      // 只拷贝对象
      if (typeof obj !== 'object') return;
      // 根据obj的类型判断是新建一个数组还是一个对象
      var newObj = obj instanceof Array ? [] : {};
      for (var key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
          // 判断属性值的类型，如果是对象递归调用深拷贝
          newObj[key] = typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key];
        }
      }
      return newObj;
    },
    formatCurrency(num, status = true) {
      return formatCurrency(Number(num), status)
    },
    //返回千分符号
    formatNumberYuan(num) {
      const _num = formatNumberYuan(Number(num));
      return _num
    },
    //传值*100符号
    postFormatNumberYuan(num, r = 100) {
      const _num = Number(num * r)
      return _num
    },
    //图片
    //获取过滤方法
    ossImgFilter(imgSrc, imgW = 200, imgH = 200) {
    	return ossImgFilter(imgSrc, imgW, imgH)
    }
  }
}
