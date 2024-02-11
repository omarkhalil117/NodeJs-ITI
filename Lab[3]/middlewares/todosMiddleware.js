// check if id is NaN

const getMiddlware = (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }
  next();
};

// //////////////////////////////////////////////////////////

// check if title is not empty string

const postMiddleware = (req, res, next) => {
  const { title } = req.body;

  if (!title.trim()) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }

  next();
};

// /////////////////////////////////////////////////////////

// check if title or status if they are empty string and id is not NaN

const patchMiddlware = (req, res, next) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const { status } = req.body;

  if (Number.isNaN(id)) {
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

// /////////////////////////////////////////////////////////

// check for id if it's not a number

const deleteMiddleware = (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json([{ message: 'bad request' }]);
    return;
  }

  next();
};

module.exports = {
  patchMiddlware, deleteMiddleware, postMiddleware, getMiddlware,
};
