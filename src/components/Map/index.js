import React from 'react';
import Agency from '../Agency';

import './Map.scss';

export default class Map extends React.Component {
  state = {};
  renderMap = (geoJSON, mymap) => {
    const { L } = window;

    L.geoJson(geoJSON, {
      style: Map.setChoroplethStyles,
    }).addTo(mymap);
  };

  componentDidMount() {
    const { L } = window;
    var mymap = L.map('mapid', { minZoom: 14 }).setView([37.73, -122.46], 18);
    const tileURL = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
    const attributionHTML =
      'Basemap tiles &copy; <a href="https://www.openstreetmap.org" target="_blank"> OpenStreet</a> &nbsp;';

    L.tileLayer(tileURL, {
      attribution: attributionHTML,
    }).addTo(mymap);

    Promise.all([
      fetch('http://localhost:3000/sfmaps/streets.json').then(res => res.json()),
      // fetch('http://localhost:3000/sfmaps/arteries.json').then(res => res.json()),
      // fetch('http://localhost:3000/sfmaps/neighborhoods.json').then(res => res.json()),
      fetch('http://localhost:3000/sfmaps/freeways.json').then(res => res.json()),
    ]).then(result => {
      result.forEach(val => {
        this.renderMap(val, mymap);
      });
    });
  }

  render() {
    return (
      <div>
        <Agency onChange={this.agencyChanged} />
        <div id="mapid" style={{ height: `${window.innerHeight}px` }} />
      </div>
    );
  }
}
