const xss = require('xss');

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = {};
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      sanitized[key] = xss(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value); // recursive
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

const xssMiddSantizer = (req, res, next) => {
  req.body = sanitizeObject(req.body);
  req.params = sanitizeObject(req.params);

  // Safely mutate req.query
  Object.keys(req.query).forEach((key) => {
    const value = req.query[key];
    if (typeof value === 'string') {
      req.query[key] = xss(value);
    } else if (typeof value === 'object' && value !== null) {
      req.query[key] = sanitizeObject(value);
    }
  });

  next();
};

module.exports = xssMiddSantizer;
