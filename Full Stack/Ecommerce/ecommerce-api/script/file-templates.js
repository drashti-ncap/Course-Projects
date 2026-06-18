
const DEFAULT_FILE = (filePath) =>
  `// Auto-generated: ${filePath}\n// TODO: implement\n\nmodule.exports = {};\n`;

const templates = {
  'src/package.json': `{
  "name": "ecommerce-api",
  "version": "1.0.0",
  "description": "Ecommerce REST API with Express and Mongoose",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["ecommerce", "express", "mongoose", "api"],
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "express-validator": "^7.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.7"
  }
}`,

  'src/server.js': `require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./config/database');
const env = require('./config/env');

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(\`Server running on port \${env.port}\`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
`,

  'src/app.js': `const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorMiddleware);

module.exports = app;
`,

  'src/config/database.js': `const mongoose = require('mongoose');
const env = require('./env');

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDatabase;
`,

  'src/config/env.js': `require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce',
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
`,

  'src/config/constants.js': `module.exports = {
  ROLES: {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
  },
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },
  SHIPMENT_STATUS: {
    PENDING: 'pending',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    RETURNED: 'returned',
  },
};
`,

  'src/routes/index.routes.js': `const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/user.routes');
const catalogRoutes = require('../modules/catalog/catalog.routes');
const inventoryRoutes = require('../modules/inventory/inventory.routes');
const cartRoutes = require('../modules/cart/cart.routes');
const orderRoutes = require('../modules/order/order.routes');
const uploadRoutes = require('../modules/uploads/upload.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/catalog', catalogRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/uploads', uploadRoutes);

module.exports = router;
`,

  'src/middlewares/auth.middleware.js': `const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../utils/apiError');

const authMiddleware = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = authMiddleware;
`,

  'src/middlewares/validation.middleware.js': `const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

const validationMiddleware = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ApiError(422, 'Validation failed', errors.array()));
  }

  next();
};

module.exports = validationMiddleware;
`,

  'src/middlewares/error.middleware.js': `const ApiError = require('../utils/apiError');

const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.details && { errors: err.details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
`,

  'src/middlewares/role.middleware.js': `const ApiError = require('../utils/apiError');

const roleMiddleware = (...allowedRoles) => (req, _res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'Insufficient permissions'));
  }

  next();
};

module.exports = roleMiddleware;
`,

  'src/utils/apiResponse.js': `class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;
`,

  'src/utils/apiError.js': `class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = ApiError;
`,

  'src/utils/pagination.js': `const getPagination = (page = 1, limit = 10) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const skip = (currentPage - 1) * pageSize;

  return { page: currentPage, limit: pageSize, skip };
};

const buildPaginationMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit) || 1,
});

module.exports = { getPagination, buildPaginationMeta };
`,

  'src/utils/token.js': `const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateToken = (payload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

module.exports = { generateToken };
`,

  'src/utils/helpers.js': `const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\\w\\s-]/g, '')
    .replace(/[\\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

module.exports = { slugify };
`,

  'src/docs/swagger.yaml': `openapi: 3.0.0
info:
  title: Ecommerce API
  version: 1.0.0
  description: REST API for ecommerce platform
servers:
  - url: http://localhost:5000/api
paths: {}
`,
};

function getTemplate(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  return templates[normalized] || DEFAULT_FILE(normalized);
}

module.exports = { getTemplate, templates };
