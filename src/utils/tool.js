
export default {
    dateFormat(date, format) {
        if (typeof date == "string") {
            date = new Date(date);
        }
        date = new Date(date)
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return format.replace('yyyy', y).replace('MM', m).replace('dd', d).replace('HH', h).replace('mm', minute).replace('ss', second);
    },
    longToDateFormat(longTime, format) {
        var date = new Date(longTime);
        return this.dateFormat(date, format)
    },
    todayBeforePickerOptions() {
        return {
            disabledDate(time) {
                return time.getTime() > Date.now() - 8.64e6
            }
        };
    },
    yesterdayBeforePickerOptions() {
        return {
            disabledDate(time) {
                var date = new Date();
                date = date.setTime(date.getTime() - 3600 * 1000 * 24 * 1)
                return time.getTime() > date;
            }
        };
    },
    yuanToFen(fen) {
        if (fen) {
            var data = fen.toString().split(".");
            if (data.length > 1) {
                if (data[1].length > 1) {
                    return parseInt(data[0] + data[1].substring(0, 2));
                } else if (data[1].length > 0) {
                    return parseInt(data[0] + data[1].substring(0, 2) + '0');
                } else {
                    return parseInt(data[0] + '00');
                }
            } else {
                return parseInt(data[0] + "00");
            }
        } else {
            return 0;
        }
    },
    textRule(len, required) {
        if (required) {
            return [
                {
                    validator: (rule, value, callback) => {
                        if (value && value.trim()) {
                            callback();
                        } else {
                            callback(new Error("请输入"));
                        }
                    }, trigger: 'change'
                },
                { required: true, message: "请输入", trigger: "change" },
                { min: 1, max: len, message: "长度1-" + len }
            ]
        } else {
            return [
                { min: 1, max: len, message: "长度1-" + len }
            ]
        }
    },
    rexRule(rex, required, msg, trigger) {
        if (!trigger) trigger = "change";
        if (required) {
            return [
                { required: true, message: msg, trigger: trigger },
                { pattern: rex, message: msg }
            ];
        } else {
            return [
                { pattern: rex, message: msg }
            ];
        }
    },
    numberRule() {
        return [
            { required: true, message: '请输入', trigger: 'blur' }
        ]
    },
    rules() {
        return {
            arrary: [{
                validator: (rule, value, callback) => {
                    if (value) {
                        if (value.length > 0) {
                            callback();
                        } else {
                            callback(new Error("请选择"));
                        }
                    } else {
                        callback(new Error("请选择"));
                    }
                }, 
                trigger: 'change'
            },
            {
                required: true, message: "请选择", trigger: "change"
            }
            ],
            dateRange: [{
                validator: (rule, value, callback) => {
                    if (value == null) {
                        callback(new Error("请选择日期"));
                    } else {
                        if (value[0] != undefined && value[1] != undefined) {
                            callback();
                        } else {
                            callback(new Error("请选择日期"));
                        }
                    }
                }, trigger: 'blur'
            }]
        }
    },
    rex() {
        return {
            phone: /^1[3|7|8|5|4|9|6]\d{9}$/,
            email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            day90: /^[1-9]$|^[1-8]\d$|^90$/,
            text: /^.{1,100}$/,
            textarea: /^.{1,4000}$/,
            number: /^[1-9][0-9]{0,7}$/,
            zeronumber: /^([1-9][0-9]{0,7})$|^0$/,
            money: /^[1-9]([0-9]{0,7})(\.\d{1,2})?$|^0\.[0-9]?[1-9]$/,
            zeromoney: /^[1-9]([0-9]{0,7})(\.\d{1,2})?$|^0\.[0-9]?[1-9]$|^0$|^0\.00$/,
            datetime: /^(((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((04|08|12|16|[2468][048]|[3579][26])00))-0?2-29)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/,
            url: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
            tell: /^(1[3|7|8|5|4|9|6]\d{9})|(\d{3,4}-\d{7,8})$/,
            discount: /^(0\.[1-9])$|^([1-9]\.\d)$|^[1-9]$/,
            hundred: /^[1-9]$|^[1-9]\d$|^100$/
        }
    },
    rexTip() {
        return {
            phone: '请输入有效号码',
            email: '请输入有效邮箱地址',
            day90: '1-90',
            number: '1-99999999',
            zeronumber: '0-99999999',
            money: '1-99999999.99',
            zeromoney: '0.00-99999999.99',
            datetime: '请输入有效日期时间',
            url: '请输入有效URL',
            tell: '请输入有效手机号码',
            discount: '0.1-9.9',
            hundred: '1-100'
        }
    },
    zeroNumber(number, len) {
        var string = number.toString();
        if (string.length < len) {
            var t = len - string.length;
            for (var i = 0; i < t; i++) {
                string = "0" + string;
            }
            return string;
        } else {
            return string;
        }
    },
    dateToDay(sDate, day) {
        const start = new Date(sDate);
        start.setTime(start.getTime() + 3600 * 1000 * 24 * day);
        return this.dateFormat(start, "yyyy-MM-dd");
    },
    yesterdayDateRange(day) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * (day + 1));
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
        return [
            this.dateFormat(start, "yyyy-MM-dd"),
            this.dateFormat(end, "yyyy-MM-dd")
        ];
    },
    datedifference(sDate1, sDate2) {
        var dateSpan, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    },
    weekStartDate(date) {
        var _date = new Date(date);
        var day = _date.getDay();
        if (day == 1) {
            return this.dateFormat(_date, "yyyy-MM-dd");
        } else {
            var start = new Date(_date);
            var startday = start.getDay();
            if (startday == 0) {
                start.setTime(_date.getTime() - 3600 * 1000 * 24 * 6);
            } else {
                start.setTime(_date.getTime() - 3600 * 1000 * 24 * (day - 1));
            }
            return this.dateFormat(start, "yyyy-MM-dd");
        }
    },
    weekEndDate(date) {
        var _date = new Date(date);
        var day = _date.getDay();
        if (day == 0) {
            return this.dateFormat(_date, "yyyy-MM-dd");
        } else {
            var start = new Date(_date);
            start.setTime(start.getTime() + 3600 * 1000 * 24 * (7 - day));
            return this.dateFormat(start, "yyyy-MM-dd");
        }
    },
    getDateTimeNow(day, format) {
        var date = new Date();
        date.setTime(date.getTime() + 3600 * 1000 * 24 * day);
        return this.dateFormat(date, format);
    },
    /*增加时间往后倒算 */
    dateRange(day, later) {
        const end = new Date();
        const start = new Date();
        if (later) {
            end.setTime(start.getTime() - 3600 * 1000 * 24 * day);
        } else {
            start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
        }
        return [
            this.dateFormat(start, "yyyy-MM-dd"),
            this.dateFormat(end, "yyyy-MM-dd")
        ];
    },

}
