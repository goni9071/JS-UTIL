var PositionUtil = {};
PositionUtil.moveCenter = function($target, isPixel) {
    if ($target.css("position") == 'absolute') {
        if (isPixel) {
            $target.css({
                top : ($target.parent().height() / 2) + 'px',
                left : ($target.parent().width() / 2 - $target.width() / 2) + 'px'
            });
        } else {
            $target.css({
                top : '50%',
                left : '50%',
                margin : '-' + ($target.innerHeight() / 2) + 'px 0 0 -' + ($target.width() / 2) + 'px'
            });
        }
    } else {
        $target.css({
            "text-align" : "center",
            "margin-top" : ($target.parent().height() / 2 - $target.height() / 2) + 'px'
        });
    }
};

PositionUtil.getCenterPosition = function($target) {
    return {
        left : $target.position().left + ($target.width() / 2),
        top : $target.position().top + ($target.height() / 2)
    };
};

PositionUtil.rotate = function($target, angle) {
    var transfrom = "rotate(" + angle + "deg)";
    $target.css({
        "transform" : transfrom,
        "-ms-transform" : transfrom,
        "-webkit-transform" : transfrom,
        // 아래는 왼쪽끝 중심으로 회전(기본은 가운데)
        "-webkit-transform-origin" : "0% 0%",
        "-moz-transform-origin" : "0% 0%",
        "-ms-transform-origin" : "0% 0%",
        "-o-transform-origin" : "0% 0%",
        "transform-origin" : "0% 0%"
    });
};

PositionUtil.rotateByPoint = function($target, fromX, fromY, toX, toY, x_axis, y_axis) {
    var angle = PositionUtil.radToDegree(PositionUtil.getAngle(fromX, fromY, toX, toY));
    var transfrom = "rotate(" + angle + "deg)";
    if (x_axis == null) {
        x_axis = "left";
    }
    if (y_axis == null) {
        y_axis = "center";
    }
    $target.css({
        "transform" : transfrom,
        "-ms-transform" : transfrom,
        "-webkit-transform" : transfrom,
        // 아래는 왼쪽끝 중심으로 회전(기본은 가운데)
        "-webkit-transform-origin" : x_axis + " " + y_axis,
        "-moz-transform-origin" : x_axis + " " + y_axis,
        "-ms-transform-origin" : x_axis + " " + y_axis,
        "-o-transform-origin" : x_axis + " " + y_axis,
        "transform-origin" : x_axis + " " + y_axis
    });
};
// 두점 사이의 각도
PositionUtil.getAngle = function(x2, y2, x1, y1) {
    var dx = x2 - x1;
    var dy = y2 - y1;

    var rad = Math.atan2(dx, dy);
    rad += (Math.PI / 2);
    if (rad < 0) {
        rad *= -1;
    } else {
        rad = 2 * Math.PI - rad;
    }
    // var degree = (rad * 180) / Math.PI;
    return rad;
};

PositionUtil.radToDegree = function(rad) {
    return (rad * 180) / Math.PI;
};

// 각도에 따른 원의 좌표 구하기(X축 또는 Y축이 0 도 일때 좌표구하는 공식)
PositionUtil.getXOfCircle = function(반지름, 각도) {
    return Math.round(Math.cos(각도) * 반지름);
};
PositionUtil.getYOfCircle = function(반지름, 각도) {
    return Math.round(Math.sin(각도) * 반지름);
};

// 두 각도 사이에 있는지 확인
PositionUtil.isBetweenAngle = function(rad1, rad2, v) {
    if (rad1 < 0) {
        rad1 += (2 * Math.PI);
    }
    if (rad2 < 0) {
        rad2 += 2 * Math.PI;
    }
    if (rad1 == rad2) {
        return true;
    }
    if (rad1 > rad2) {
        return (rad1 <= v && v <= 2 * Math.PI) || (rad2 >= v && v >= 0);
    } else {
        return (rad1 <= v) && (rad2 >= v);
    }
};

// 두점 사이의 거리
PositionUtil.distance = function(x1, y1, x2, y2) {
    var x = Math.pow((x1 - x2), 2);
    var y = Math.pow((y1 - y2), 2);
    return Math.sqrt((x + y));
};

// 좌표구하기
PositionUtil.getCoord = function(x1, y1, distance, deg) {
    var x2 = x1 + PositionUtil.getXOfCircle(distance, deg);
    var y2 = y1 + PositionUtil.getYOfCircle(distance, deg);
    return {
        "x" : x2,
        "y" : y2
    };
};

// 각도 구하기
PositionUtil.getRotateRad = function($target) {
    var tr = $target.css("transform") || $target.css("-ms-transform") || $target.css("-webkit-transform");
    try {
        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');

        var a = values[0]; // 
        var b = values[1]; // 
        var c = values[2]; // 
        var d = values[3]; //

        // var scale = Math.sqrt(a * a + b * b);

        return Math.atan2(b, a);
    } catch(msg) {
        return 0;
    }
};