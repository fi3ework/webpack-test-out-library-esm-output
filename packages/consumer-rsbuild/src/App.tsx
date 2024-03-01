// from webpack bundled dist, tree-shaking not work 😭
import { combineReducers } from '../../pack-redux/dist/webpack-dist.mjs'

// from webpack bundleless dist, tree-shaking not work 😭
// import { combineReducers } from '../../pack-redux/bundleless-webpack/index.js'

import './App.css'

const App = () => {
  return (
    <div className="content">
      <pre style={{ textAlign: 'left' }}>
        <code>{combineReducers.toString()}</code>
      </pre>
    </div>
  )
}

export default App
