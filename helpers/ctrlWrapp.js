const ctrlWrapp = (ctrl) => {
  const f = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (e) {
      next(e);
    }
  };
  return f;
};

module.exports = ctrlWrapp;
