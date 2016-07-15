function sumValues (data = []) {
  return data.reduce((total, { _, value }) => total + value, 0)
}

export default sumValues
