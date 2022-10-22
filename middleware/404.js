module.exports = (req, res, next) => {
  res.status(404).json("resource not found");
};
