module.exports.arbolesByUser = (req, res) => {
  res.json(['arbol']);
}

module.exports.arbolEdit = (req, res) => {
  res.json(req.user);
}
