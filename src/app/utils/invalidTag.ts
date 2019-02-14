/**
 * Return error message for invalid tag and return null for correct tag
 */
export const invalidTag = tag => {
  return tag.length > 24
    ? 'Maximum tag length is 24 characters'
    : tag.split('-').length > 2
    ? 'Use only one dash'
    : /[A-Z]/.test(tag)
    ? 'Use only lowercase letters'
    : !/^[a-z0-9-#]+$/.test(tag)
    ? 'Use only lowercase letters, digits and one dash'
    : !/^[a-z-#]/.test(tag)
    ? 'Must start with a letter'
    : !/[a-z0-9]$/.test(tag)
    ? 'Must end with a letter or number'
    : null
}
