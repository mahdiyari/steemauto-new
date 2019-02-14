/**
 * return null for valid username and error message for invalid username
 * see: https://github.com/steemit/faucet/blob/master/helpers/validator.js
 */
export const accountIsInvalid = name => {
  let i
  let label
  let len

  if (!name) {
    return 'Please input your username'
  }

  const length = name.length

  if (length < 3) {
    return 'Account name should be longer'
  }
  if (length > 16) {
    return 'Account name should be shorter'
  }

  const hasSegment = /\./.test(name)
  const ref = name.split('.')

  for (i = 0, len = ref.length; i < len; i += 1) {
    label = ref[i]
    if (!/^[a-z]/.test(label)) {
      return(
        hasSegment
          ? 'Each username segment should start with a letter'
          : 'Account name should start with a letter'
      )
    }
    if (!/^[a-z0-9-]*$/.test(label)) {
      return(
        hasSegment
          ? 'Each username segment should contain only letters, digits, and dashes'
          : 'Account name should contain only letters, digits, periods, and dashes'
      )
    }
    if (/--/.test(label)) {
      return(
        hasSegment
          ? 'Each username segment should contain only one dash in a row'
          : 'Account name should contain only one dash in a row'
      )
    }
    if (!/[a-z0-9]$/.test(label)) {
      return(
        hasSegment
          ? 'Each username segment should end with a letter or digit'
          : 'Account name should end with a letter or digit'
      )
    }
    if (!(label.length >= 3)) {
      return(
        hasSegment
          ? 'Each username segment should be longer'
          : 'Account name should be longer'
      )
    }
  }
  return null
}
