if (typeof PositionUtil == 'undefined') {
    document.write("<script src=\"http://maumjido.com/jsUtil/js/util/positionUtil.js\"></script>");
}
var CanvasUtil = {};
CanvasUtil.drawArrowLine = function(canvas, fromX, fromY, toX, toY, lineOption) {
    function drawArrow(context, arrow) {
        context.beginPath();
        context.moveTo(arrow[arrow.length - 1][0], arrow[arrow.length - 1][1]);
        for (var i = 0; i < arrow.length; i++) {
            context.lineTo(arrow[i][0], arrow[i][1]);
        }
        context.closePath();
        if (lineOption) {
            for ( var prop in lineOption) {
                context[prop] = lineOption[prop];
            }
        }
        context.fill();
    }

    function moveArrow(arrow, x, y) {
        var rv = [];
        for (var i = 0; i < arrow.length; i++) {
            rv.push([ arrow[i][0] + x, arrow[i][1] + y ]);
        }
        return rv;
    }

    function rotateArrow(arrow, angle) {
        var rv = [];
        for (var i = 0; i < arrow.length; i++) {
            rv.push([ (arrow[i][0] * Math.cos(angle)) - (arrow[i][1] * Math.sin(angle)),
                    (arrow[i][0] * Math.sin(angle)) + (arrow[i][1] * Math.cos(angle)) ]);
        }
        return rv;
    }

    function drawLineArrow(context, fromX, fromY, toX, toY, arrow, lineOption) {
        context.beginPath();
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        if (lineOption) {
            for ( var prop in lineOption) {
                context[prop] = lineOption[prop];
            }
        }
        context.stroke();
        var angle = Math.atan2(toY - fromY, toX - fromX);
        drawArrow(context, moveArrow(rotateArrow(arrow, angle), toX, toY));
    }

    var arrow = [ [ 0, 0 ], [ -10, -5 ], [ -10, 5 ] ];
    var context = canvas.getContext('2d');
    drawLineArrow(context, fromX, fromY, toX, toY, arrow, lineOption);
};

CanvasUtil.drawArrowLineByRotate = function(canvas, fromX, fromY, toX, toY, lineOption) {
    var $canvas = $(canvas);
    var width = PositionUtil.distance(fromX, fromY, toX, toY);
    var canvasW = width;
    var canvasH = 40;
    $canvas.attr("width", canvasW).attr("height", canvasH);
    CanvasUtil.drawArrowLine(canvas, 0, canvasH / 2, canvasW, canvasH / 2, lineOption);
    $canvas.css({
        "left" : fromX,
        "top" : fromY - (canvasH / 2)
    });
    PositionUtil.rotateByPoint($canvas, fromX, fromY, toX, toY, "left", "center");
};
CanvasUtil.drawLineByRotate = function(canvas, fromX, fromY, toX, toY, lineOption) {
    var $canvas = $(canvas);
    var width = PositionUtil.distance(fromX, fromY, toX, toY);
    var canvasW = width;
    var canvasH = 40;
    $canvas.attr("width", canvasW).attr("height", canvasH);
    // //
    var context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(0, canvasH / 2);
    context.lineTo(canvasW, canvasH / 2);
    if (lineOption) {
        for ( var prop in lineOption) {
            context[prop] = lineOption[prop];
        }
    }
    context.stroke();
    // //
    $canvas.css({
        "left" : fromX,
        "top" : fromY - (canvasH / 2)
    });
    PositionUtil.rotateByPoint($canvas, fromX, fromY, toX, toY, "left", "center");
};

CanvasUtil.drawDiamond = function(canvas, width, height) {
    var $canvas = $(canvas);
    $canvas.attr("width", width).attr("height", height);
    var context = canvas.getContext('2d');
    var halfW = width / 2;
    var halfH = height / 2;
    var n = {
        x : halfW,
        y : 0
    };
    var e = {
        x : width,
        y : halfH
    };
    var s = {
        x : halfW,
        y : height
    };
    var w = {
        x : 0,
        y : halfH
    };
    context.beginPath();
    context.moveTo(n.x, n.y);
    context.lineTo(e.x, e.y);
    context.lineTo(s.x, s.y);
    context.lineTo(w.x, w.y);
    context.closePath();
    context.fillStyle = 'white';
    context.lineColor = 'black';
    context.fill();
    context.stroke();
};
CanvasUtil.drawRect = function(canvas, width, height) {
    var $canvas = $(canvas);
    $canvas.attr("width", width).attr("height", height);
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(width, 0);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fillStyle = 'white';
    context.lineColor = 'black';
    context.fill();
    context.stroke();
};
CanvasUtil.drawCircle = function(canvas, x, y, width, height, canvasMargin) {
    if (canvasMargin == null) {
        canvasMargin = 0;
    }
    var rw = width / 2;
    var rh = height / 2;
    var $canvas = $(canvas);
    $canvas.attr("width", width).attr("height", height);
    var context = canvas.getContext('2d');

    context.save();
    context.translate(canvasMargin, canvasMargin);
    context.scale(rw - canvasMargin, rh - canvasMargin);
    context.beginPath();
    context.arc(1, 1, 1, 0, 2 * Math.PI);
    context.restore();

    context.fillStyle = 'white';
    context.lineColor = 'black';
    context.lineWidth = "1";
    context.fill();
    context.stroke();
};

CanvasUtil.drawText = function(canvas, x, y, text, option) {
    var context = canvas.getContext('2d');
    for ( var prop in option) {
        context[prop] = option[prop];
    }
    context.fillText(text, x, y);
};