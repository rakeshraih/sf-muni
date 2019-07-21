import React from 'react';
import RouteList from '../RouteList';

import './index.scss';

export default class Agency extends React.Component {
  state = { agencies: [], routeTag: null, agency: 'jhu-apl' };

  componentDidMount() {
    fetch('http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList')
      .then(res => res.json())
      .then(result => {
        this.setState({ agencies: result.agency });
      });
  }

  formatOptions = agencies => {
    return agencies.map((val, index) => (
      <option value={val.tag} key={index}>
        {val.title}
      </option>
    ));
  };

  agencyChanged = agency => {
    console.log(agency);
    this.setState({ agency });
  };

  render() {
    const options = this.formatOptions(this.state.agencies);
    return (
      <div>
        <select onChange={event => this.agencyChanged.bind(this)(event.currentTarget.value)}>{options}</select>
        <RouteList agency={this.state.agency} />
      </div>
    );
  }
}
