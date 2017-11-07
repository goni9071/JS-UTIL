if (typeof StringUtil == 'undefined') {
    document.write("<script src=\"http://maumjido.com/jsUtil/js/util/stringUtil.js\"></script>");
}

var GenerateKeyUtil = {};
GenerateKeyUtil.getKey = function(prefix) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month = StringUtil.lPad(2, month);
    var date = StringUtil.lPad(2, now.getDate());
    var hour = StringUtil.lPad(2, now.getHours());
    var min = StringUtil.lPad(2, now.getMinutes());
    var second = StringUtil.lPad(2, now.getSeconds());
    var millisec = StringUtil.lPad(3, now.getMilliseconds());
    now = null;
    var key = year + month + date + hour + min + second + millisec
            + StringUtil.lPad(3, Math.floor(Math.random() * 1000));
    if (prefix) {
        key = prefix + key;
    }
    return key;
};