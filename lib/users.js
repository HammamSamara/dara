var list = {};
module.exports = {
    get: function(id) {
        return list[id] ?
            list[id] : list[id] = {};
    },
    set : function(id, propery, value){
    	list[id][propery] = value;
    }
}
