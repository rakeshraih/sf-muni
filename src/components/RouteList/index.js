import React from 'react';
import './index.scss';

export default class RouteList extends React.Component {
  state = { route: [] };

  // static getDerivedStateFromProps(props, state) {
  //   if (props.agency !== state.agency) {
  //     return { ...state, agency: props.agency };
  //   }
  //   return null;
  // }

  componentDidMount() {
    this.fetchRoutes(this.props.agency);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.agency !== this.props.agency) {
      this.fetchRoutes(nextProps.agency);
    }
    return true;
  }

  fetchRoutes = agency => {
    console.log(agency);
    fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=${agency}`)
      .then(res => res.json())
      .then(result => {
        console.log();
        this.setState({ route: Array.isArray(result.route) ? result.route : [result.route] });
      });
  };

  formatOptions = routes => {
    return routes.map((val, index) => (
      <option value={val.tag} key={index}>
        {val.title}
      </option>
    ));
  };

  render() {
    const options = this.formatOptions(this.state.route);
    return (
      <div>
        <select>{options}</select>
      </div>
    );
  }
}
