import React from 'react'
import ReactDOM from 'react-dom'
import PointCalculator from './components/PointCalculator/PointCalculator'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<PointCalculator />, document.getElementById('root'))

serviceWorker.unregister()
