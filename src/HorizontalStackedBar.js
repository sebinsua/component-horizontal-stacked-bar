import { PropTypes } from 'react'
import ReactFauxDOM from 'react-faux-dom'

import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { stack } from 'd3-shape'

import getNames from './getNames'
import sumValues from './sumValues'
import toObject from './toObject'
import decorateSeriesWithOriginalData from './decorateSeriesWithOriginalData'

import defaultGenerateLabel from './generateLabel'
import defaultGenerateFillColour from './generateFillColour'

function identity (value) {
  return value
}

const DEFAULT_WIDTH = 4500
const DEFAULT_HEIGHT = 150

function HorizontalStackedBar ({
  className,
  aspectRatio: {
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT
  } = {},
  generateLabel = defaultGenerateLabel,
  generateFillColour = defaultGenerateFillColour,
  data = []
}) {
  const names = getNames(data)
  const dataAsObject = toObject(data)

  const seriesGenerator = stack().keys(names)
  const decoratedSeries = decorateSeriesWithOriginalData(
    seriesGenerator([ dataAsObject ]),
    data
  )

  const total = sumValues(data)
  const xScale = scaleLinear().domain([0, total]).range([0, width])

  // `react-faux-dom` is an easy way to use `d3` but render back to React.
  const svgContainer = ReactFauxDOM.createElement('svg')

  // TODO: Somehow, the height needs to increase as the width of the screen decreases.
  const svg = select(svgContainer)
                .attr('class', className)
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet')

  const groups = svg.selectAll('g')
                    .data(decoratedSeries)
                    .enter().append('g')
                      .style('fill', ([ firstItem ], i) => generateFillColour(firstItem, i))

  // Add a block
  groups.selectAll('rect')
        .data(identity)
        .enter().append('rect')
          .attr('x', (d) => xScale(d[0]))
          .attr('height', () => height)
          .attr('width', (d) => xScale(d.value))

  // Associate some text with a block
  groups.selectAll('text')
        .data(identity)
        .enter().append('text')
          .text(generateLabel)
          .attr('x', (d) => xScale(d[0]) + xScale(d.value) / 2)
          .attr('y', '50%')
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'middle')

  return svgContainer.toReact()
}

HorizontalStackedBar.propTypes = {
  className: PropTypes.string,
  aspectRatio: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  generateLabel: PropTypes.func,
  generateFillColour: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired
}

export default HorizontalStackedBar
