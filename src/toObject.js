function toObject (data = []) {
  return data.reduce((res, { name, value }) => {
    res[name] = value
    return res
  }, {})
}

export default toObject
