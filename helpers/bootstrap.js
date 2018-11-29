// Only execute this stuff if we're in the client

if (typeof window !== 'undefined') {
  // Add a global method for creating SVG elements with an API similar to
  // `document.createElement`

  document.createSVGElement = function (element) {
    return document.createElementNS('http://www.w3.org/2000/svg', element)
  }
}
