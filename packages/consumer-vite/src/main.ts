// from webpack bundled dist, tree-shaking not work 😭
import { combineReducers } from '../../pack-redux/dist/webpack-dist.mjs'

// from webpack bundleless dist, tree-shaking not work 😭
// import { combineReducers } from '../../pack-redux/bundleless-webpack/index.js'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <pre>
      <code>${combineReducers}</code>
    </pre>
  </div>
`
