// from tsup dist, tree-shaking works 😋
// import { combineReducers } from '../../../submodules/redux/dist/redux.mjs'

// from webpack bundled dist, tree-shaking not work 😭
// import { combineReducers } from '../../pack/webpack-dist.mjs'

// from webpack bundleless dist, tree-shaking not work 😭
import { combineReducers } from '../../pack-redux/bundleless/index.js'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <pre>
      <code>${combineReducers}</code>
    </pre>
  </div>
`
