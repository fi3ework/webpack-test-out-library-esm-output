it('should accept less parameters in a IIFE call', function () {
  ;(function (r, require) {
    expect(r('./file')).toBe('ok')
    expect(typeof require).toBe('undefined')
  })(require)
})
