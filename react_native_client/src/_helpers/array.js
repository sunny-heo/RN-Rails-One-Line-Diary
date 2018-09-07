Array.prototype._replaceObj = (newObj, key) =>
  this.map(obj => (obj[key] === newObj[key] ? obj : newObj));
