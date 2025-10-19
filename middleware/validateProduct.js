// Validates product creation and update data
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ error: 'All product fields are required.' });
  }

  if (typeof price !== 'number' || typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data types: price must be a number, inStock must be a boolean.' });
  }

  next();
};

module.exports = validateProduct;
