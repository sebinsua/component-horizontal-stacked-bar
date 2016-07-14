# component-horizontal-stacked-bar
> A horizontal stacked bar component created with `React` and `d3`

## Install

```sh
npm install --save component-horizontal-stacked-bar
```

## Example

```js
import React from 'react'
import HorizontalStackedBar from 'component-horizontal-stacked-bar'

export default function EconomicDomainAggregatesBar ({
  className,
  data
}) {
  const generateLabel = (d, i) => { /* ... */ }
  const generateColor = (d, i) => { /* ... */ }
  return (
    <HorizontalStackedBar
      className={className}
      data={data}
      generateLabel={generateLabel}
      generateFillColour={generateColor}
    />
  )
}
```
