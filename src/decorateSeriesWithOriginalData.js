function decorateSeriesWithOriginalData (series, data = {}) {
  return series.map(items => {
    const key = items.key
    return items.map(item => {
      item.name = key
      item.value = data[key]
      return item
    })
  })
}

export default decorateSeriesWithOriginalData
