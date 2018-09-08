const ArrayExtends = {
  _replaceObj(newObj, key) {
    return this.map(obj => (obj[key] === newObj[key] ? newObj : obj));
  }
};

Object.assign(Array.prototype, ArrayExtends);
