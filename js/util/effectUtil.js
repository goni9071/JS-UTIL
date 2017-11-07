if (typeof StringUtil == 'undefined') {
    document.write("<script src=\"http://maumjido.com/jsUtil/js/util/stringUtil.js\"></script>");
}
var EffectUtil = {};
EffectUtil.backup = function($target) {
    for (var i = 1; i < arguments.length; i++) {
        if ($target.attr("EffectUtilOrg" + arguments[i]) == null) {
            $target.attr("EffectUtilOrg" + arguments[i], $target.css(arguments[i]));
        }
    }
};
EffectUtil.restore = function($target) {
    var args = arguments;
    $target.each(function() {
        for (var i = 1; i < args.length; i++) {
            if ($(this).attr("EffectUtilOrg" + args[i]) != null) {
                $(this).css(args[i], $(this).attr("EffectUtilOrg" + args[i]));
            }
        }
    });

};
EffectUtil.roundedBorderOn = function($target, radius) {
    if (radius == null) {
        radius = Math.min($target.width(), $target.height()) / 2;
    }
    $target.css("border-radius", radius + "px");
};
EffectUtil.shadowToggle = function($target, startEvent, endEvent, option) {
    startEvent($target, function(eventWrapper) {
        EffectUtil.shadowOn($target);
    });
    endEvent($target, function(eventWrapper) {
        EffectUtil.shadowOff($target);
    });
};
EffectUtil.moveToggle = function($target, startEvent, endEvent, option) {
    if (option == null) {
        option = {};
    }
    startEvent($target, function(eventWrapper) {
        // 주석 풀면 해당 div 안에 select 선택안됨
        // eventWrapper.preventDefault();
        var mouseX = eventWrapper.mouseX;
        var mouseY = eventWrapper.mouseY;
        $target.attr("xGap", mouseX - parseInt($target.css("left")));
        $target.attr("yGap", mouseY - parseInt($target.css("top")));
        if (option.startEventFilter) {
            option.startEventFilter($target, eventWrapper);
        }
        if (option.children) {
            var children = option.children;
            for (var i = 0; i < children.length; i++) {
                var $child = $(children[i]);
                $child.each(function() {
                    var $targetEach = $(this);
                    $targetEach.attr("xGap", mouseX - parseInt($targetEach.css("left")));
                    $targetEach.attr("yGap", mouseY - parseInt($targetEach.css("top")));
                });
            }
        }
        EventWrapper.onmousemove($(document), mousemove, {
            "target" : $target,
            "moveFilter" : option.moveFileter
        });
        endEvent($(document), mouseup, mousemove);
    });
    var mousemove = function(eventWrapper) {
        eventWrapper.preventDefault();
        var $target = eventWrapper.data.target;
        var mouseX = eventWrapper.mouseX;
        var mouseY = eventWrapper.mouseY;
        var x = mouseX - $target.attr("xGap");
        var y = mouseY - $target.attr("yGap");
        $target.css({
            "left" : x,
            "top" : y
        });

        if (option.moveFilter) {
            option.moveFilter($target, eventWrapper);
        }
        if (option.children) {
            var children = option.children;
            for (var i = 0; i < children.length; i++) {
                var $child = $(children[i]);
                $child.each(function() {
                    var $targetEach = $(this);
                    var x = mouseX - $targetEach.attr("xGap");
                    var y = mouseY - $targetEach.attr("yGap");
                    $targetEach.css({
                        "left" : x,
                        "top" : y
                    });
                });
            }
        }
    };
    var mouseup = function(eventWrapper) {
        if (option.endEventFilter) {
            option.endEventFilter($target, eventWrapper);
        }
        EventWrapper.offmousemove($(document), mousemove);
        EventWrapper.offmouseup($(document), mouseup);
    };
};
EffectUtil.shadowOn = function($target, left, top, blurDistance, color) {
    EffectUtil.backup($target, "box-shadow", "-moz-box-shadow", "-webkit-box-shadow");
    // box-shadow: -10px 10px 10px silver;
    // -moz-box-shadow: 10px 10px 10px silver;
    // -webkit-box-shadow: 10px 10px 10px silver;
    if (left == null) {
        left = 10;
    }
    if (top == null) {
        top = 10;
    }
    if (blurDistance == null) {
        blurDistance = 10;
    }
    if (color == null) {
        color = "silver";
    }
    var shadow = StringUtil.format("{0}px {1}px {2}px {3}", left, top, blurDistance, color);
    $target.css({
        "box-shadow" : "-" + shadow,
        "-moz-box-shadow" : shadow,
        "-webkit-box-shadow" : shadow
    });
};
EffectUtil.shadowOff = function($target) {
    EffectUtil.restore($target, "box-shadow", "-moz-box-shadow", "-webkit-box-shadow");
};
EffectUtil.blank = function($target, minOpacity, maxOpacity, delay) {
    if (minOpacity == null) {
        minOpacity = 0;
    }
    if (maxOpacity == null) {
        maxOpacity = 0.3;
    }
    if (delay == null) {
        delay = 1000;
    }
    var stop = function() {
        // if ($target.is(":hidden")) {
        // return;
        // }
        $target.animate({
            opacity : minOpacity
        }, delay, play);
    };
    var play = function() {
        // if ($target.is(":hidden")) {
        // return;
        // }

        $target.animate({
            opacity : maxOpacity
        }, delay, stop);
    };

    play();
};