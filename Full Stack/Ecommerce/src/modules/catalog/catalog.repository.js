const Product = require('./product.model');
const ProductVariant = require('./productVariant.model');
const Brand = require('./brand.model');
const Category = require('./category.model');

// Product methods
const createProduct = (productData) => Product.create(productData);

const getProducts = async (filters = {}, pagination = {}) => {
  const { page = 1, limit = 10 } = pagination;
  const query = { isActive: true, ...filters };
  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .populate('brand')
    .populate('category')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  return {
    data: products,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const getProductById = (productId) =>
  Product.findById(productId).populate('brand').populate('category');

const updateProduct = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  }).populate('brand').populate('category');

  return product;
};

const deleteProduct = (productId) => Product.findByIdAndDelete(productId);

// Product Variant methods
const createVariant = (productId, variantData) =>
  ProductVariant.create({ product: productId, ...variantData });

const getVariantsByProduct = (productId) =>
  ProductVariant.find({ product: productId, isActive: true }).populate('product');

const getVariantById = (variantId) =>
  ProductVariant.findById(variantId).populate('product');

const updateVariant = async (variantId, updateData) => {
  const variant = await ProductVariant.findByIdAndUpdate(variantId, updateData, {
    new: true,
    runValidators: true,
  }).populate('product');

  return variant;
};

const deleteVariant = (variantId) => ProductVariant.findByIdAndDelete(variantId);

// Brand methods
const createBrand = (brandData) => Brand.create(brandData);

const getBrands = () => Brand.find().sort({ createdAt: -1 });

const getBrandById = (brandId) => Brand.findById(brandId);

const updateBrand = async (brandId, updateData) => {
  const brand = await Brand.findByIdAndUpdate(brandId, updateData, {
    new: true,
    runValidators: true,
  });

  return brand;
};

const deleteBrand = (brandId) => Brand.findByIdAndDelete(brandId);

// Category methods
const createCategory = (categoryData) => Category.create(categoryData);

const getCategories = () => Category.find().sort({ createdAt: -1 });

const getCategoryById = (categoryId) => Category.findById(categoryId);

const updateCategory = async (categoryId, updateData) => {
  const category = await Category.findByIdAndUpdate(categoryId, updateData, {
    new: true,
    runValidators: true,
  });

  return category;
};

const deleteCategory = (categoryId) => Category.findByIdAndDelete(categoryId);

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createVariant,
  getVariantsByProduct,
  getVariantById,
  updateVariant,
  deleteVariant,
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
