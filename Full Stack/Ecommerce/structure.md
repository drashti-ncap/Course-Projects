src/
│
├── app.js
├── server.js
│
├── config/
│   ├── database.js
│   ├── env.js
│   └── constants.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── validation.middleware.js
│   ├── error.middleware.js
│   └── role.middleware.js
│
├── utils/
│   ├── apiResponse.js
│   ├── apiError.js
│   ├── pagination.js
│   ├── token.js
│   └── helpers.js
│
├── services/
│   ├── payment.service.js
│   ├── inventory.service.js
│   ├── shipment.service.js
│   └── notification.service.js
│
├── modules/
│
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.routes.js
│   │   └── auth.validation.js
│
│   ├── users/
│   │   ├── user.model.js
│   │   ├── address.model.js
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.repository.js
│   │   ├── user.routes.js
│   │   └── user.validation.js
│
│   ├── catalog/
│   │   ├── category.model.js
│   │   ├── brand.model.js
│   │   ├── product.model.js
│   │   ├── productVariant.model.js
│   │   ├── catalog.controller.js
│   │   ├── catalog.service.js
│   │   ├── catalog.repository.js
│   │   ├── catalog.routes.js
│   │   └── catalog.validation.js
│
│   ├── inventory/
│   │   ├── inventory.model.js
│   │   ├── warehouse.model.js
│   │   ├── inventory.controller.js
│   │   ├── inventory.service.js
│   │   ├── inventory.repository.js
│   │   ├── inventory.routes.js
│   │   └── inventory.validation.js
│
│   ├── cart/
│   │   ├── cart.model.js
│   │   ├── wishlist.model.js
│   │   ├── coupon.model.js
│   │   ├── cart.controller.js
│   │   ├── cart.service.js
│   │   ├── cart.repository.js
│   │   ├── cart.routes.js
│   │   └── cart.validation.js
│
│   ├── order/
│   │   ├── order.model.js
│   │   ├── payment.model.js
│   │   ├── shipment.model.js
│   │   ├── order.controller.js
│   │   ├── order.service.js
│   │   ├── order.repository.js
│   │   ├── order.routes.js
│   │   ├── order.validation.js
│   │   └── order.events.js
│
│   └── uploads/
│       ├── upload.controller.js
│       ├── upload.service.js
│       └── upload.routes.js
│
├── routes/
│   └── index.routes.js
│
├── docs/
│   └── swagger.yaml
│
├── tests/
│   ├── unit/
│   └── integration/
│
└── package.json    