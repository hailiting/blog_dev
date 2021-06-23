const Types = {
  isPrototype(data) {
    return Object.prototype.toString.call(data).toLowerCase();
  },
  isArray(data) {
    return this.isPrototype(data) === "[object array]";
  },
  isJSON(data) {
    return this.isPrototype(data) === "[object object]";
  },
  isString(data) {
    return this.isPrototype(data) === "[object String]";
  },
  isNumber(data) {
    return this.isPrototype(data) === "[object number]";
  },
  isUndefined(data) {
    return this.isPrototype(data) === "[object undefined]";
  },
  isNull(data) {
    return this.isPrototype(data) === "[object null]";
  },
};
module.exports = Types;
