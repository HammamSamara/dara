

function User() {
  // this.category;
  // this.destiantion;
  // this.dates;
  this.call_agent = false;
}

User.prototype.set = function (key, val) {
    this[key] = val;
};

var list = {};

module.exports = {
    get: function(id) {
        if(!list[id]) {
          list[id] = new User();
        }
        return list[id];
    },
    getList: function() {
      return list;
    }
}
