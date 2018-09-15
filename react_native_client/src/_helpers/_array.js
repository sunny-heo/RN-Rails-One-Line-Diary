const ArrayExtends = {
  _replaceObj(newObj, key) {
    return this.map(obj => (obj[key] === newObj[key] ? newObj : obj));
  },
  _removeObj(id, key) {
    return this.filter(obj => obj[key] !== id);
  }
};

Object.assign(Array.prototype, ArrayExtends);
