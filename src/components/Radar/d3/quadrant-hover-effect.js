
export const hoverInQuadrantEffect = (g, quadrantIndex) => {
  g.selectAll(`.quadrant-${quadrantIndex} path`)
   .transition()
   .duration('100')
   .style('fill-opacity', (d, i) => (1 - 0.2 * i))

  g.select(`g.quadrant-labels > text.quadrant-label-${quadrantIndex}`)
   .transition()
   .duration('100')
   .attr('font-weight', 700)
}

export const hoverOutQuadrantEffect = (g, quadrantIndex) => {
  g.selectAll(`.quadrant-${quadrantIndex} path`)
   .transition()
   .duration('100')
   .style('fill-opacity', (d, i) => (0.7 - 0.2 * i))

  g.select(`g.quadrant-labels > text.quadrant-label-${quadrantIndex}`)
   .transition()
   .duration('100')
   .attr('font-weight', 200)
}
