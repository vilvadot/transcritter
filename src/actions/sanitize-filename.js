const sanitizeFilename = (string) => {
  const lowercased = string.toLowerCase()
  
  return removeAccents(removeSymbols(substituteSpaces(lowercased)))
} 

const removeSymbols = (string) => {
  const notAllowed = /[`~!@#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi
  return string.replace(notAllowed, '')
}

const removeAccents = (string) => {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const substituteSpaces = (string) => {
  return string.replace(" ", "_")
}

module.exports = { sanitizeFilename }