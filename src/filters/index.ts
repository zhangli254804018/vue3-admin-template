// import parseTime, formatTime and set to filter

export { parseTime, formatTime, formatCurrency } from '@/utils';

import { formatCurrency } from '@/utils';
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time: number | string, label: string): string {
    if (time === 1) {
        return time + label;
    }
    return time + label + 's';
}

/**
 * @param {number} time
 */
export function timeAgo(time: any) {
    const between = Date.now() / 1000 - Number(time);
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute');
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour');
    } else {
        return pluralize(~~(between / 86400), ' day');
    }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num: number, digits: number | undefined) {
    const si = [
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'G' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'k' }
    ];
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (
                (num / si[i].value)
                    .toFixed(digits)
                    .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
            );
        }
    }
    return num.toString();
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num: string | number) {
    return (+num || 0)
        .toString()
        .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//新增新增分数过滤为元展示
export const formatNumberYuan = (n: number, r: any) => {
    if (n) {
        if (r) n = Number(n) * Number(r);
        const _n = n / 100 + '';
        const _num =
            _n.toString().indexOf('.') > -1
                ? parseFloat(_n).toFixed(2)
                : parseFloat(_n).toFixed(2);
        return formatCurrency(_num);
    } else {
        return n || 0;
    }
};

//过滤尾数0
export const formatNumberFloat = (n: string) => {
    if (n) {
        return parseFloat(n);
    } else {
        return n;
    }
};

//过滤尾数0
export const formatNumberFloatPrecent = (n: number) => {
    if (n) {
        return parseFloat(n / 100 + '');
    } else {
        return n;
    }
};

//过滤尾数0
export const formatNumberFloatDouble = (n: number | string): string => {
    if (n) {
        return parseFloat(n + '').toFixed(3);
    } else {
        return n + '';
    }
};

//图片处理
//在图片链接的后面加入 ?x-oss-process=image/resize,w_150 这一段字符串，
//其中w_150中的150是图片宽度的尺寸，可自定义这个尺寸，图片会等比例缩放，需要原图时去掉这个后缀即可。
export const ossImgFilter = (imgSrc: string, imgW = 200, imgH = 200) => {
    if (imgSrc && imgSrc.indexOf('http') > -1) {
        let nimgSrc = imgSrc;
        if (nimgSrc.indexOf('?') > -1) {
            nimgSrc =
                nimgSrc + `x-oss-process=image/resize,w_${imgW},h_${imgH}`;
        } else {
            nimgSrc =
                nimgSrc + `?x-oss-process=image/resize,w_${imgW},h_${imgH}`;
        }
        return nimgSrc;
    } else {
        return imgSrc;
    }
};
