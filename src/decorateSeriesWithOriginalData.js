function decorateSeriesWithOriginalData (series, data = []) {
  return series.map(items => {
    const key = items.key
    return items.map(item => {
      const matchedOrginalItem = data.find(originalItem => originalItem.name === key)
      return Object.assign(item, matchedOrginalItem)
    })
  })
}

export default decorateSeriesWithOriginalData
