import { schemeCategory10, scaleOrdinal } from 'd3-scale'

const colourScale = scaleOrdinal(schemeCategory10)

function generateFillColour (_, i) {
  return colourScale(i)
}

export default generateFillColour
