export const tablePageSize = 5

// This method will receive an array and will return that array in pages
export function getPages(array, page, size) {
  const newArr = []
  let forSize = array.length
  if (page * size < array.length) {
    forSize = page * size
  }
  for (let i = (page - 1) * size, k = 0; i < forSize; i++, k++) {
    newArr[k] = array[i]
  }
  return newArr
}

/**
 * We use this method to get next/previous page of any array
 * @param i +1 for next page and -1 for previous page
 * @param array array which will be divided into the pages
 * @param pageOb an object like {page: 1}
 */
export function changePage(i: number, array, pageOb) {
  if (
    pageOb.page + i > 0 &&
    (pageOb.page + i) * tablePageSize <=
      array.length + (tablePageSize - 1)
  ) {
    pageOb.page += i
  }
}

// This method returns true for disabling next button
export function disableNxtBtn(array, pageOb) {
  if (
    (pageOb.page + 1) * tablePageSize >
    array.length + (tablePageSize - 1)
  ) {
    return true
  }
}
