const patchMiddlware = (req, res, next) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const { status } = req.body;

  if (!id || Number.isNaN(id)) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }

  if (!title.trim() && !status) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }

  if (!['in-progress', 'done'].includes(status.trim())) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }

  next();
};

const deleteMiddleware = (req, res) => {
  const id = Number(req.params.id);

  if (!id || Number.isNaN(id)) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }

  next();
};

const postMiddleware = (req, res) => {
  const { title } = req.body;

  if (!title.trim()) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }

  next();
};
module.exports = { patchMiddlware, deleteMiddleware, postMiddleware };
