const catalogService = require('./catalog.service');

// Product Controllers
const createProduct = async (req, res, next) => {
  try {
    const product = await catalogService.createProduct(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { page, limit, brand, category } = req.query;
    const filters = {};

    if (brand) filters.brand = brand;
    if (category) filters.category = category;

    const pagination = {};
    if (page) pagination.page = parseInt(page);
    if (limit) pagination.limit = parseInt(limit);

    const result = await catalogService.getProducts(filters, pagination);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await catalogService.getProductById(req.params.productId);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await catalogService.updateProduct(req.params.productId, req.body);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await catalogService.deleteProduct(req.params.productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Product Variant Controllers
const createVariant = async (req, res, next) => {
  try {
    const variant = await catalogService.createVariant(req.params.productId, req.body);

    res.status(201).json({
      success: true,
      message: 'Variant created successfully',
      data: variant,
    });
  } catch (error) {
    next(error);
  }
};

const getVariantsByProduct = async (req, res, next) => {
  try {
    const variants = await catalogService.getVariantsByProduct(req.params.productId);

    res.status(200).json({
      success: true,
      data: variants,
    });
  } catch (error) {
    next(error);
  }
};

const getVariantById = async (req, res, next) => {
  try {
    const variant = await catalogService.getVariantById(req.params.variantId);

    res.status(200).json({
      success: true,
      data: variant,
    });
  } catch (error) {
    next(error);
  }
};

const updateVariant = async (req, res, next) => {
  try {
    const variant = await catalogService.updateVariant(req.params.variantId, req.body);

    res.status(200).json({
      success: true,
      message: 'Variant updated successfully',
      data: variant,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVariant = async (req, res, next) => {
  try {
    await catalogService.deleteVariant(req.params.variantId);

    res.status(200).json({
      success: true,
      message: 'Variant deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Brand Controllers
const createBrand = async (req, res, next) => {
  try {
    const brand = await catalogService.createBrand(req.body);

    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const getBrands = async (req, res, next) => {
  try {
    const brands = await catalogService.getBrands();

    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

const getBrandById = async (req, res, next) => {
  try {
    const brand = await catalogService.getBrandById(req.params.id);

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const brand = await catalogService.updateBrand(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Brand updated successfully',
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    await catalogService.deleteBrand(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Brand deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Category Controllers
const createCategory = async (req, res, next) => {
  try {
    const category = await catalogService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await catalogService.getCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await catalogService.getCategoryById(req.params.id);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await catalogService.updateCategory(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await catalogService.deleteCategory(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
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
