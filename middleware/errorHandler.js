// Global error-handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
