const ArrayExtends = {
  _replaceObj(newObj, key) {
    return this.map(obj => (obj[key] === newObj[key] ? newObj : obj));
  },
  _removeObj(newObj, key) {
    return this.filter(obj => obj[key] !== newObj[key]);
  }
};

Object.assign(Array.prototype, ArrayExtends);
