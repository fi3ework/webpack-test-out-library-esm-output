var o = Object.defineProperty,
  t = (a, r) => {
    for (var e in r) o(a, e, { get: r[e], enumerable: !0 })
  },
  v = 1,
  n = {}
t(n, { x: () => p, y: () => d, z: () => c })
var p = 1,
  d = 1,
  c = 1
document.querySelector('#app').innerHTML = `
  <div>
    <pre>
      <code>${v}</code>
    </pre>
  </div>
`
