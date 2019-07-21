import React from 'react';
import './Map.scss';
import * as d3 from 'd3';
// import { geoPath, geoMercator } from 'd3-scale';

export default class Map extends React.Component {
  state = {};

  componentDidMount() {
    //Width and height
    var w = 500;
    var h = 300;

    //Define map projection
    var projection = d3
      .geoMercator()
      .translate([w / 2, h / 2])
      .scale([500]);

    //Define path generator
    var path = d3.geoPath().projection(projection);

    //Create SVG element
    var svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    //Load in GeoJSON data
    d3.json('http://localhost:3000/sfmaps/streets.json').then(function(json) {
      //Bind data and create one path per GeoJSON feature
      svg
        .selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', 'steelblue');
    });
  }
  render() {
    return <div />;
  }
}
