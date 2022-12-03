const handleSaveErr = (e, data, next) => {
  const { name, code } = e;
  e.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

module.exports = handleSaveErr;
