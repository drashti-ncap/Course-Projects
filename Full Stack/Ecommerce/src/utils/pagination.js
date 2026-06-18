const getPagination = (page = 1, limit = 10) => {
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
