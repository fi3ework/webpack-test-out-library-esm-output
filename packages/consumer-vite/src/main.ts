// from tsup dist, tree-shaking works 😋
// import { combineReducers } from '../../../submodules/redux/dist/redux.mjs'

// from webpack dist, tree-shaking not work 😭
import { combineReducers } from '../../pack/webpack-dist.mjs'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <pre>
      <code>${combineReducers}</code>
    </pre>
  </div>
`
