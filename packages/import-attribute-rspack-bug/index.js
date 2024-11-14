it('should allow async externals', async () => {
  const pkg = 'pkg.json'
  const nested = await import(`./nested/${pkg}`, {
    with: { type: 'json' },
  })
})
