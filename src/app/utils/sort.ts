/**
 * This function will sort any array which contains an object
 * @param array the array we want to sort
 * @param key the key of object
 */
const toggle = {}
export function sort(array, key) {
  const reverse = toggle[key] && toggle[key] === 1 ? -1 : 1
  toggle[key] = reverse
  array.sort((a, b) => {
    if (a[key] > b[key]) {
      return reverse
    }
    if (a[key] < b[key]) {
      return -reverse
    }
    return 0
  })
}
