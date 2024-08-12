const a = import.meta.url + 'aaa'

const b = a + 'bbb'

const c = __dirname + 'ccc'
new URL(import.meta.url).searchParams.get('someURLInfo') // 5

export { b }
