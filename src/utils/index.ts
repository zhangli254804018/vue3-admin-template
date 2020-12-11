/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: string | number | Date, cFormat: string) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date: Date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        return value.toString().padStart(2, '0');
    });
    return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time: string | number | Date, option: string) {
    if (('' + time).length === 10) {
        time = Number(time) * 1000;
    } else {
        time = +time;
    }
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - Number(d)) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        );
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
    if (!search) {
        return {};
    }
    const obj = {};
    const searchArr = search.split('&');
    searchArr.forEach(v => {
        const index = v.indexOf('=');
        if (index !== -1) {
            const name = v.substring(0, index);
            const val = v.substring(index + 1, v.length);
            obj[name] = val;
        }
    });
    return obj;
}
/**
 * @param {Object} name value
 * @returns {Object}
 */
export function setLocalStorage(name: string, value: any) {
    interface dataObj {
        type: Object | string | number;
        data: Object | string | number;
    }
    const data: dataObj = {
        type: '',
        data: ''
    };
    if (typeof value === 'object') {
        data.type = 'object';
    } else if (typeof value === 'string') {
        data.type = 'string';
    } else if (typeof value === 'number') {
        data.type = 'number';
    }
    data.data = value;
    try {
        localStorage.setItem(name, JSON.stringify(data));
    } catch (err) {
        // 不支持localStorage
        setCookie(name, JSON.stringify(data));
    }
}
/**
 * @param {Object} name value
 * @returns {Object}
 */
export function getLocalStorage(name: string) {
    let res = '';
    try {
        res = localStorage.getItem(name);
        if (!res) {
            res = getCookie(name);
        }
    } catch (err) {
        // 不支持localStorage
        res = getCookie(name);
    }
    if (res) {
        res = JSON.parse(res);
        return res.data;
    }
    return null;
}
/**
 * @param {Object} name value Day
 * @returns {Object}
 */
export function setCookie(name: string, value: string, Day: number) {
    var Days = Day || 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie =
        name + '=' + escape(value) + ';expires=' + exp.toUTCString();
}
/**
 * @param {Object} name value Day
 * @returns {Object}
 */
export function getCookie(name: string) {
    var arr: string[];
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
/**
 * @param {Object} name value Day
 * @returns {Object}
 */
export function delCookie(name: string) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1); // 将date设置为过去的时间
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
    }
}

export const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(
    func: { apply: (arg0: any, arg1: any[]) => any },
    wait: number,
    immediate: any
) {
    let timeout: NodeJS.Timeout,
        args: any,
        context: any,
        timestamp: number,
        result: any;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function(...args: any) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/*
    @param num 为数字
    ex. return 100,00,00等
*/
export function formatCurrency(num: string | number) {
    if (num) {
        // 将num中的$,去掉，将num变成一个纯粹的数据格式字符串
        num = num.toString().replace(/\$|\,/g, '');
        // 如果num不是数字，则将num置0，并返回
        if (num == '' || isNaN(num)) {
            return 'Not a Number ! ';
        }
        // 如果num是负数，则获取她的符号
        var sign = num.toString().indexOf('-') > -1 ? '-' : '';
        // console.log('sign--->', sign)
        num = num.toString().replace(/\-/g, '');
        // num = num.toString().replace(/\-|\,/g, '')
        // 如果存在小数点，则获取数字的小数部分
        var cents =
            num.toString().indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
        cents = cents.length > 1 ? cents : ''; // 注意：这里如果是使用change方法不断的调用，小数是输入不了的
        // 获取数字的整数数部分
        num =
            num.toString().indexOf('.') > 0
                ? num.substring(0, num.indexOf('.'))
                : num;
        // 如果没有小数点，整数部分不能以0开头
        if (cents == '') {
            if (num.length > 1 && num.substr(0, 1) == '0') {
                return 'Not a Number ! ';
            }
        } else {
            // 如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
            if (num.length > 1 && num.substr(0, 1) == '0') {
                return 'Not a Number ! ';
            }
        }
        // 针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
        /*
          也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
          字符串长度为0/1/2/3时都不用添加
          字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
         */
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num =
                num.substring(0, num.length - (4 * i + 3)) +
                ',' +
                num.substring(num.length - (4 * i + 3));
        }
        // 将数据（符号、整数部分、小数部分）整体组合返回
        return sign + num + cents;
    } else {
        return num || 0;
    }
}
// 时间戳格式化
export function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
    // 其他更多是格式化有如下:
    // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
    timestamp = parseInt(timestamp);
    // 如果为null,则格式化当前时间
    if (!timestamp) timestamp = Number(new Date());
    // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
    if (timestamp.toString().length == 10) timestamp *= 1000;
    let date = new Date(timestamp);
    let ret: (string | any[])[];
    let opt = {
        'y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'h+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1
                    ? opt[k]
                    : opt[k].padStart(ret[1].length, '0')
            );
        }
    }
    return fmt;
}

//获取AddDayCount天后的日期
//比如知道昨日 GetDateStr(-1)
export const GetDateStr = (AddDayCount: number) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return y + '/' + m + '/' + d;
};

// 饿了么时间组件的常量
export const TIME_RANGE = {
    shortcuts: [
        {
            text: '今天',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '昨天',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                end.setTime(end.getTime() - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一周',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一个月',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近三个月',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 91);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        }
    ],
    disabledDate(time: { getTime: () => number }) {
        return time.getTime() > Date.now();
    }
};

// 饿了么时间组件的常量
export const TIME_RANGE_ALL = {
    shortcuts: [
        {
            text: '今天',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '昨天',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                end.setTime(end.getTime() - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一周',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一个月',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近三个月',
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
                const nowt = new Date();
                const strnowt =
                    nowt.getFullYear() +
                    '-' +
                    (nowt.getMonth() + 1) +
                    '-' +
                    nowt.getDate() +
                    ' 00:00:00';
                const end = new Date(strnowt);
                const start = new Date(strnowt);
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 91);
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
                picker.$emit('pick', [start, end]);
            }
        }
    ]
    // disabledDate(time) {
    //     return time.getTime() > Date.now();
    // }
};

//提交代码点击超链接
export const openLink = (src: string) => {
    let a = document.createElement('a');
    a.setAttribute('href', src);
    a.setAttribute('target', '_blank');
    // a.setAttribute("download", "");
    a.setAttribute('id', 'startTelMedicine');
    // 防止反复添加
    if (document.getElementById('startTelMedicine')) {
        document.body.removeChild(document.getElementById('startTelMedicine'));
    }
    document.body.appendChild(a);
    a.click();
};

//去重
export const unqiArray = (arr: any[], type = 'time') => {
    var hash = {};
    arr = arr.reduce(function(
        item: any[],
        next: { [x: string]: string | number }
    ) {
        hash[next[type]] ? '' : (hash[next[type]] = true && item.push(next));
        return item;
    },
    []);
    return arr;
};

//传入树状结构 list:[name:'0-1',children:[{name:'1-1'}]]
//处理获取到一维数组
export const childArrs = (arr: any, type = 'children') => {
    let newArr = [];
    function arrEach(arr: any[]) {
        arr.forEach((item: { [x: string]: any; url: any }) => {
            if (item && item.url) {
                newArr.push(item);
            }
            if (item && item[type]) {
                arrEach(item[type]);
            }
        });
    }
    arrEach(arr);
    return newArr;
};

//判断是否是数字
export const isNumber = (val: string | number) => {
    if (val === '' || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
};
