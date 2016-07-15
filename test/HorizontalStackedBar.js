import test from 'ava'
import { shallow } from 'enzyme'

import React from 'react'
import HorizontalStackedBar from '../src/HorizontalStackedBar'

function render (data) {
  const props = { className: 'le-class-name' }
  return shallow(<HorizontalStackedBar {...props} data={data} />)
}

test('renders an empty svg when given an empty list', (t) => {
  const renderedComponent = render([])

  t.is(
    renderedComponent.find('svg').length,
    1
  )

  t.is(
    renderedComponent.find('g').length,
    0
  )
})

test('renders a horizontal stacked bar when given a list of { name, value } ', (t) => {
  const renderedComponent = render([
    { name: 'A', value: 25 },
    { name: 'B', value: 50 },
    { name: 'C', value: 75 },
    { name: 'D', value: 5 },
    { name: 'E', value: 45 }
  ])

  const groups = renderedComponent.find('g')
  t.is(
    groups.length,
    5
  )

  const aRect = groups.at(0).find('rect')
  const aText = groups.at(0).find('text')
  t.is(
    aRect.prop('width'),
    562.5
  )
  t.is(
    aText.prop('x'),
    281.25
  )
  t.is(
    aText.text(),
    '25'
  )

  const bRect = groups.at(1).find('rect')
  const bText = groups.at(1).find('text')
  t.is(
    bRect.prop('width'),
    1125
  )
  t.is(
    bText.prop('x'),
    1125
  )
  t.is(
    bText.text(),
    '50'
  )

  const cRect = groups.at(2).find('rect')
  const cText = groups.at(2).find('text')
  t.is(
    cRect.prop('width'),
    1687.5
  )
  t.is(
    cText.prop('x'),
    2531.25
  )
  t.is(
    cText.text(),
    '75'
  )

  const dRect = groups.at(3).find('rect')
  const dText = groups.at(3).find('text')
  t.is(
    dRect.prop('width'),
    112.5
  )
  t.is(
    dText.prop('x'),
    3431.25
  )
  t.is(
    dText.text(),
    '5'
  )

  const eRect = groups.at(4).find('rect')
  const eText = groups.at(4).find('text')
  t.is(
    eRect.prop('width'),
    1012.5
  )
  t.is(
    eText.prop('x'),
    3993.75
  )
  t.is(
    eText.text(),
    '45'
  )
})
