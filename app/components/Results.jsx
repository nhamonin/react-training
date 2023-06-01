import * as React from 'react';

import { battle } from '../utils/api';

export default class Battle extends React.Component {
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo]).then((players) => {
      console.log('data: ', players);
    });
  }
  render() {
    return <div>Results</div>;
  }
}
