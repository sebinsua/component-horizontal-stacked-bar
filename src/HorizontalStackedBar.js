import { PropTypes } from 'react'
import d3 from 'd3'
import ReactFauxDOM from 'react-faux-dom'

const colourScale = d3.scale.category10()

const DEFAULT_WIDTH = 4500
const DEFAULT_HEIGHT = 150

const DEFAULT_GENERATE_LABEL = (d) => d.value
const DEFAULT_GENERATE_FILL_COLOUR = (_, i) => colourScale(i)

function HorizontalStackedBar ({
  className,
  aspectRatio: {
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT
  } = {},
  generateLabel = DEFAULT_GENERATE_LABEL,
  generateFillColour = DEFAULT_GENERATE_FILL_COLOUR,
  data = []
}) {
  const stack = d3.layout.stack()

  const layers = data.map((data) => ([ { y: data.value, ...data } ]))
  stack(layers)
  const invertedLayers = layers.map((group) => group.map((data) => ({ x: data.y, x0: data.y0, ...data })))

  const xMax = d3.max(invertedLayers, (group) => d3.max(group, (d) => d.x + d.x0))
  const xScale = d3.scale.linear().domain([0, xMax]).range([0, width])

  // `react-faux-dom` is an easy way to use `d3` but render back to React.
  const svgContainer = ReactFauxDOM.createElement('svg')

  // TODO: Somehow, the height needs to increase as the width of the screen decreases.
  const svg = d3.select(svgContainer)
                .attr('class', className)
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet')

  const groups = svg.selectAll('g')
                    .data(invertedLayers)
                    .enter()
                    .append('g')
                    .style('fill', (group) => generateFillColour(group[0] || {}))

  // Add a block
  groups.selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.x0))
        .attr('height', () => height)
        .attr('width', (d) => xScale(d.x))

  // Associate some text with a block
  groups.selectAll('text')
        .data((d) => d)
        .enter()
        .append('text')
        .text(generateLabel)
        .attr('x', (d) => xScale(d.x0) + xScale(d.x) / 2)
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
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
}

export default HorizontalStackedBar
