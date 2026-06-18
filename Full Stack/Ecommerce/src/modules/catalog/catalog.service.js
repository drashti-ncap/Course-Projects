const catalogRepository = require('./catalog.repository');
const ApiError = require('../../utils/apiError');

// Product Service
const createProduct = async (productData) => {
  const product = await catalogRepository.createProduct(productData);
  return product;
};

const getProducts = async (filters = {}, pagination = {}) => {
  return catalogRepository.getProducts(filters, pagination);
};

const getProductById = async (productId) => {
  const product = await catalogRepository.getProductById(productId);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  return product;
};

const updateProduct = async (productId, updateData) => {
  const product = await catalogRepository.updateProduct(productId, updateData);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  return product;
};

const deleteProduct = async (productId) => {
  const product = await catalogRepository.deleteProduct(productId);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
};

// Product Variant Service
const createVariant = async (productId, variantData) => {
  const product = await catalogRepository.getProductById(productId);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const variant = await catalogRepository.createVariant(productId, variantData);
  return variant;
};

const getVariantsByProduct = async (productId) => {
  const product = await catalogRepository.getProductById(productId);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  return catalogRepository.getVariantsByProduct(productId);
};

const getVariantById = async (variantId) => {
  const variant = await catalogRepository.getVariantById(variantId);

  if (!variant) {
    throw new ApiError(404, 'Variant not found');
  }

  return variant;
};

const updateVariant = async (variantId, updateData) => {
  const variant = await catalogRepository.updateVariant(variantId, updateData);

  if (!variant) {
    throw new ApiError(404, 'Variant not found');
  }

  return variant;
};

const deleteVariant = async (variantId) => {
  const variant = await catalogRepository.deleteVariant(variantId);

  if (!variant) {
    throw new ApiError(404, 'Variant not found');
  }
};

// Brand Service
const createBrand = async (brandData) => {
  const brand = await catalogRepository.createBrand(brandData);
  return brand;
};

const getBrands = async () => {
  return catalogRepository.getBrands();
};

const getBrandById = async (brandId) => {
  const brand = await catalogRepository.getBrandById(brandId);

  if (!brand) {
    throw new ApiError(404, 'Brand not found');
  }

  return brand;
};

const updateBrand = async (brandId, updateData) => {
  const brand = await catalogRepository.updateBrand(brandId, updateData);

  if (!brand) {
    throw new ApiError(404, 'Brand not found');
  }

  return brand;
};

const deleteBrand = async (brandId) => {
  const brand = await catalogRepository.deleteBrand(brandId);

  if (!brand) {
    throw new ApiError(404, 'Brand not found');
  }
};

// Category Service
const createCategory = async (categoryData) => {
  const category = await catalogRepository.createCategory(categoryData);
  return category;
};

const getCategories = async () => {
  return catalogRepository.getCategories();
};

const getCategoryById = async (categoryId) => {
  const category = await catalogRepository.getCategoryById(categoryId);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return category;
};

const updateCategory = async (categoryId, updateData) => {
  const category = await catalogRepository.updateCategory(categoryId, updateData);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return category;
};

const deleteCategory = async (categoryId) => {
  const category = await catalogRepository.deleteCategory(categoryId);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
};

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
