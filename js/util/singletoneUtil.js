if (typeof GenerateKeyUtil == 'undefined') {
    document.write("<script src=\"http://maumjido.com/jsUtil/js/util/generateKeyUtil.js\"></script>");
}
/**
 * <pre>
 * 주의 : 대상 객체에 setId, getId가 구현되어 있어야 함.
 * Usage:
 * var Plus = function() {
 * };
 * Plus.getInstance = SingletoneUtil.INATANCE_FACTORY(Plus);
 * var plus = Plus.getInstance(); // id 자동생성
 * or
 * var plus = Plus.getInstance(id); // id 임의지정
 * or
 * var plus = Plus.getInstance(id, [ 1, 2, 3 ]); // id 임의 지정 및 원본 생성자에 필요한 arguments
 * </pre>
 */
var SingletoneUtil = {};

SingletoneUtil.getObjectInstance = function(id, args) {
    var Obj = this;
    this.INSTANCE;

    if (this.INSTANCE === undefined) {
        this.INSTANCE = {};
    }
    if (id == null || this.INSTANCE[id] == null) {

        function F() {
            return Obj.apply(this, args);
        }
        F.prototype = Obj.prototype;
        var obj = new F();
        if (!obj.setId) {
            alert("[SingletoneUtil] setId가 구현되어 있지 않아 사용할 수 없습니다.");
            return null;
        }
        if (id == null) {
            id = obj.getId();
            if (id == null) {
                id = GenerateKeyUtil.getKey();
            }
        } else {
            obj.setId(id);
        }
        this.INSTANCE[id] = obj;
    } else {
        // console.log(id, this.INSTANCE[id].getName());
    }

    return this.INSTANCE[id];
};
SingletoneUtil.INATANCE_FACTORY = function(obj) {
    return SingletoneUtil.getObjectInstance.bind(obj);
};