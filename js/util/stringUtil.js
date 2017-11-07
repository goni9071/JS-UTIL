var StringUtil = {};
StringUtil.lPad = function(size, str) {
    var l = "";
    str = str + "";
    for (var i = str.length; i < size; i++) {
        l = "0" + l;
    }

    return l + str;
};

StringUtil.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

StringUtil.getFirstMatch = function(pattern, str) {
    pattern.exec(str);
    return RegExp.$1;
};
StringUtil.getMatch = function(pattern, str) {
    var patt = new RegExp(pattern);
    return patt.test(str);
};