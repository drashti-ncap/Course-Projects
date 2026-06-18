const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    sku: {
      type: String,
      required: [true, 'Variant SKU is required'],
      unique: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock must be a non-negative number'],
    },
    price: {
      type: Number,
      required: [true, 'Variant price is required'],
      min: [0, 'Price must be a positive number'],
    },
    images: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productVariantSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model('ProductVariant', productVariantSchema);
