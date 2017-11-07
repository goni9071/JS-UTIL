Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop();
    }
};
Array.prototype.remove = function(arg) {
    if (typeof arg == 'number') {
        this.splice(arg, 1);
    } else if (typeof arg == 'string') {
        for (var i = 0; i < this.length; i++) {
            if (arg == this[i]) {
                this.splice(i, 1);
                return;
            }
        }
    } else if (typeof arg == 'function') {
        for (var i = 0; i < this.length; i++) {
            if (arg(this[i])) {
                this.splice(i, 1);
                return;
            }
        }
    }
};