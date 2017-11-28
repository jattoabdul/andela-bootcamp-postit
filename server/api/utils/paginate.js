/**
 * Paginate Function
 * 
 * @param {number} count
 * @param {number} limit
 * @param {number} offset
 * @param {number} size
 * 
 * @return {object} page, totalCount, pageCount, pageSize
 */
export default function (count, limit, offset, size) {
  const page = (offset + 1),
    totalCount = count,
    pageCount = Math.ceil(count / limit),
    pageSize = parseInt(size, 10);
  return {
    page,
    totalCount,
    pageCount,
    pageSize
  };
}
