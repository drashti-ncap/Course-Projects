User
→ Stores customer/admin account information.
→ Responsible for authentication, profile, and ownership of orders.

Contains:
- Personal details
- Login credentials
- Roles
- Account status



Address
→ Stores user delivery and billing locations.
→ A user can have multiple addresses.

Contains:
- Contact details
- Address lines
- City / State / Country
- Default address flag



Category
→ Organizes products into groups for browsing and filtering.
→ Supports parent-child hierarchy.

Contains:
- Name
- Slug
- Parent category
- Visibility status



Brand
→ Represents the manufacturer or brand of products.

Contains:
- Brand name
- Logo
- Description
- Status



Product
→ Main catalog entity that customers browse and purchase.

Contains:
- Product details
- Description
- Category reference
- Brand reference
- Images
- Status



ProductVariant
→ Represents purchasable versions of a product.

Examples:
- Size
- Color
- Storage

Contains:
- SKU
- Price
- Attributes
- Variant images



Inventory
→ Tracks stock availability for product variants.

Contains:
- Available quantity
- Reserved quantity
- Sold quantity
- Stock thresholds



Warehouse
→ Physical storage location where inventory exists.

Contains:
- Warehouse details
- Location
- Stock allocation



Cart
→ Temporary shopping area before order creation.

Contains:
- Selected products
- Quantity
- Pricing
- Coupon
- Totals



Wishlist
→ Stores products users save for future purchase.

Contains:
- User reference
- Product list



Coupon
→ Defines promotional discounts applied during checkout.

Contains:
- Coupon code
- Discount rules
- Expiry
- Usage limits



Order
→ Permanent purchase record created after checkout.

Contains:
- Purchased items
- Address snapshot
- Payment status
- Order status



Payment
→ Records transaction and payment information.

Contains:
- Payment provider
- Transaction details
- Amount
- Payment status



Shipment
→ Manages delivery and fulfillment process.

Contains:
- Tracking details
- Carrier
- Shipment status
- Delivery information