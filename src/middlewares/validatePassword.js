const validatePassword = (password) => {
  const validLength = password.length >= 8 && password.length <= 16
  const containALetter = /[a-zA-Z]/g.test(password)
  const containANumber = /[0-9]/g.test(password)
  return validLength && containALetter && containANumber
}

module.exports = validatePassword;