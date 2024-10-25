let p =
  !('NO_COLOR' in env || argv.includes('--no-color')) &&
  ('FORCE_COLOR' in env ||
    argv.includes('--color') ||
    'win32' === process.platform ||
    (null != require &&
      __nested_webpack_require_14414_14433__('tty') /* .isatty */
        .isatty(1) &&
      'dumb' !== env.TERM) ||
    'CI' in env)
console.log('🧖‍♀️', p)

module.exports = p
