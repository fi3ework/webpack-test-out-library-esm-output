// from webpack bundled dist, tree-shaking not work 😭
import { num1 } from '../../concatenate-modules/dist/webpack-dist.mjs'
// import { num1 } from '../../concatenate-modules/dist/esbuild-dist.js'

// from webpack bundleless dist, tree-shaking not work 😭
// import { combineReducers } from '../../pack-redux/bundleless-webpack/index.js'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <pre>
      <code>${num1}</code>
    </pre>
  </div>
`
