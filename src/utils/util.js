function extend(to, from) {
    for (let key in from) {
        to[key] = from[key];
    }
    return to;
}

//验证字符串是否是数字
function checkNumber(theObj) {
    var reg = /^[+-]?\d*\.?\d*$/;
    if (reg.test(theObj)) {
      return true;
    }
    return false;
}

//过滤逗号，百分比
function filtersSymbol(str) {
    return str.replace(/,/g,'').replace(/，/g,'').replace(/%/g,'');
}

export function noop() {};

export function getPropByPath(obj, path, strict) {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    let keyArr = path.split('.');
    let i = 0;
    for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break;
        let key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        } else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!');
            }
            break;
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null
    };
};

export const isArray = Array.isArray() || function(o) {
    return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]';
}

export const getValueByPath = function(object, prop) {
    
}

export const toObject = function(arr) {
    let res = {};
    for (let i=0,len=arr.length; i < len; i++) {
        if(arr[i]) {
            extend(res, arr[i])
        }
    }
    return res;
}

export const sortBy = function(key, type) {
    return function(o, p) {
        let a, b;
        if ( o && p && typeof o === "object" && typeof p === "object") {
            a = typeof(o[key]) === 'string' ? filtersSymbol(o[key]) : o[key];
            b = typeof(p[key]) === 'string' ? filtersSymbol(p[key]) : p[key];
            a = checkNumber(a) ? Number(a) : a;
            b = checkNumber(b) ? Number(b) : b;
            if (typeof a === typeof b) {
                if(type === 'ascending') {
                    return a < b ? -1 : 1;
                }else if(type === 'descending'){
                    return a > b ? -1 : 1;
                }
            }
            if(type === 'ascending') {
                return typeof a > typeof b ? -1 : 1;
            }else if(type === 'descending') {
                return typeof a < typeof b ? -1 : 1;
            }
        }else{
            throw ("error");
        }
    }
}

//深度拷贝
export const deepCopy = function(obj) {
    if(typeof(obj) !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return newObj
}