var EventWrapper = {};
EventWrapper.hideList = [];
EventWrapper.event = function(e) {
    e.mouseX = e.pageX;
    e.mouseY = e.pageY;
    return e;
};
EventWrapper.onclick = function($target, callbackFn, data) {
    var wrapFn = function(e) {
        callbackFn(EventWrapper.event(e));
    };
    if (callbackFn.guid) {
        wrapFn.guid = callbackFn.guid;
    }
    $target.on("click", data, wrapFn);

    // jquery 내부적으로 fn비교를 위해 쓰인다.
    callbackFn.guid = wrapFn.guid;
};
EventWrapper.offclink = function($target, callbackFn) {
    $target.off("click", callbackFn);
};
EventWrapper.onmouseover = function($target, callbackFn, data) {
    var wrapFn = function(e) {
        return callbackFn(EventWrapper.event(e));
    };
    if (callbackFn.guid) {
        wrapFn.guid = callbackFn.guid;
    }
    $target.on("mouseover", data, wrapFn);

    // jquery 내부적으로 fn비교를 위해 쓰인다.
    callbackFn.guid = wrapFn.guid;
};
EventWrapper.offmouseover = function($target, callbackFn) {
    $target.off("mouseover", callbackFn);
};
EventWrapper.onmouseout = function($target, callbackFn, data) {
    var wrapFn = function(e) {
        return callbackFn(EventWrapper.event(e));
    };
    if (callbackFn.guid) {
        wrapFn.guid = callbackFn.guid;
    }
    $target.on("mouseout", data, wrapFn);

    // jquery 내부적으로 fn비교를 위해 쓰인다.
    callbackFn.guid = wrapFn.guid;
};
EventWrapper.offmouseout = function($target, callbackFn) {
    $target.off("mouseout", callbackFn);
};
EventWrapper.onmousedown = function($target, callbackFn, data) {
    var wrapFn = function(e) {
        return callbackFn(EventWrapper.event(e));
    };
    if (callbackFn.guid) {
        wrapFn.guid = callbackFn.guid;
    }
    $target.on("mousedown", data, wrapFn);

    // jquery 내부적으로 fn비교를 위해 쓰인다.
    callbackFn.guid = wrapFn.guid;
};
EventWrapper.offmousedown = function($target, callbackFn, data) {
    $target.off("mousedown", callbackFn);
};
EventWrapper.onmouseup = function($target, callbackFn, data) {
    var wrapFn = function(e) {
        return callbackFn(EventWrapper.event(e));
    };
    if (callbackFn.guid) {
        wrapFn.guid = callbackFn.guid;
    }
    $target.on("mouseup", data, wrapFn);

    // jquery 내부적으로 fn비교를 위해 쓰인다.
    callbackFn.guid = wrapFn.guid;
};
EventWrapper.offmouseup = function($target, callbackFn) {
    $target.off("mouseup", callbackFn);
};
EventWrapper.onmousemove = function($target, callbackFn, data) {
    var wrapFn = function(e) {
        return callbackFn(EventWrapper.event(e));
    };
    if (callbackFn.guid) {
        wrapFn.guid = callbackFn.guid;
    }
    $target.on("mousemove", data, wrapFn);
    // jquery 내부적으로 fn비교를 위해 쓰인다.
    callbackFn.guid = wrapFn.guid;
};
EventWrapper.offmousemove = function($target, callbackFn) {
    $target.off("mousemove", callbackFn);
};
EventWrapper.addHide = function(callbackFn) {
    EventWrapper.hideList.push(callbackFn);
};
EventWrapper.hideAll = function() {
    for (var i = 0; i < EventWrapper.hideList.length; i++) {
        EventWrapper.hideList[i]();
    }
};