import * as React from 'react';
import PropTypes from 'prop-types';

function Instructions() {
  return (
    <div className="instructions-container">
      <h2>Instructions</h2>
      <ol>
        <li>Enter two Github users</li>
        <li>Battle</li>
        <li>See the winner</li>
      </ol>
    </div>
  );
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  };

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <form className="card" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="input-row">
          <input
            type="text"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="btn link"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
    };
  }

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player,
    });
  };

  render() {
    const { playerOne, playerTwo } = this.state;
    const disabled = !playerOne || !playerTwo;

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Players</h1>
          <a href="$" className={`btn primary ${disabled ? 'disabled' : ''}`}>
            Battle
          </a>
        </div>
        <section className="grid">
          {!playerOne && (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => this.handleSubmit('playerOne', player)}
            />
          )}

          {!playerTwo && (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => this.handleSubmit('playerTwo', player)}
            />
          )}
        </section>
        <Instructions />
      </main>
    );
  }
}
