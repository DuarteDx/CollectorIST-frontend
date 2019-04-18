<template>
  <svg
    width="300"
    height="200"
  />
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mounted () {
    let svg = d3.select(this.$el)
    let margin = { top: 20, right: 20, bottom: 20, left: 20 }
    let width = +svg.attr('width') - margin.left - margin.right
    let height = +svg.attr('height') - margin.top - margin.bottom

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.8)
    let y = d3.scaleLinear().range([height, 0])

    let g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    x.domain(this.data.map(function (d) { return d.year }))
    y.domain([0, d3.max(this.data, function (d) { return d.quantity })])

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(3))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency')

    g.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) { return x(d.year) })
      .attr('y', function (d) { return y(d.quantity) })
      .attr('width', x.bandwidth())
      .attr('height', function (d) { return height - y(d.quantity) })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

svg {
  rect.bar {
    fill: $light-blue;
    stroke: $light-blue-700;
    //width: 1rem;
  }

}
</style>
