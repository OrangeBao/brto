'use strict';

const RTO = {};

RTO.isDebug = false;
RTO.suffix = 'RTO-C';

RTO.openDebugger = function() {
    RTO.isDebug = true;
}

RTO.log = function(...args) {
    RTO.isDebug && console.log(RTO.suffix, ...args);
}

RTO.error = function(...args) {
    console.error(RTO.suffix, ...args);
}

RTO.warn = function(...args) {
  RTO.isDebug && console.warn(RTO.suffix, ...args);
}

/***
 * 接受消息
 * @private
 * @param {Object} event 要处理等事件对象
*/
RTO.receiveMessage = function(event) {
    // event.data格式 : { msgType, options}
    if (!event.data) {
        RTO.error('消息体不能为空！');
        return;
    } else if (!event.data.msgType) {
        if(Object.keys(event.data).includes('msgType')) {
            RTO.error('消息类型不能为空！');
            return;
        } else {
            RTO.warn('收到非RTO触发的消息');
            return;
        }
    }
    RTO.log(`接收到消息: ${event.data.msgType}`);
    const msgType = event.data.msgType;
    if (!RTO.handles[msgType]) {
        RTO.error(`消息类型:${msgType} 未注册！`);
    } else {
        RTO.handles[msgType](event.data.options);
    }
    
}

/**
 * 组册消息回调
 * @param {Object} options 消息描述
 * @example
 * RTO.register({
 *   'ADD_TO_BAG': function(options) {
 *     console.log(options);
 *   }
 * })
 */
RTO.register = function(options = {}) {
    RTO.suffix = 'RTO-P:';
    RTO.handles = options;
    Object.keys(options).forEach(item => RTO[item] = item);
    window.addEventListener("message", RTO.receiveMessage, false);
}

/**
 * 追加消息回调
 * @param {String} msgType 消息类别
 * @param {Function} cb    消息处理函数
 * @example
 * RTO.addEventListener('PAGE_JUMP', function(options) {
 *    console.log(options);
 * })
 */
RTO.addEventListener = function (msgType, cb) {
    if (RTO[msgType]) {
        RTO.warn(`消息类型${msgType}已存在，现已被覆盖!`);
    }
    RTO.handles[msgType] = cb;
    RTO[msgType] = cb;
}

/**
 * 发送消息
 * @param {String} msgType 消息类别 
 * @param {Object} options 消息处理函数的参数
 * @example
 *  RTO.send('ADD_TO_BAG', 'i am ADD_TO_BAG');
 */
RTO.send = function(msgType, options) {
    if (!msgType) {
        RTO.error('消息类型不能为空！');
        return;
    }
    window.parent && window.parent.postMessage({
        msgType, options
    }, '*');
}

// window.RTO = RTO;

module.exports = RTO

// Allow use of default import syntax in TypeScript
module.exports.default = RTO