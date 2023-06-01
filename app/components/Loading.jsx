import * as React from 'react';
import PropTypes from 'prop-types';

const styles = {
  fontSize: '14px',
  position: 'absolute',
  left: '0',
  right: '0',
  marginTop: '20px',
  textAlign: 'center',
};

class Delayed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        show: true,
      });
    }, this.props.wait);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return this.state.show === true ? this.props.children : null;
  }
}

Delayed.propTypes = {
  wait: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

Delayed.defaultProps = {
  wait: 300,
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.text,
    };
  }

  componentDidMount() {
    const { speed, text } = this.props;
    const stopper = `${text}...`;

    this.interval = window.setInterval(() => {
      this.state.content === stopper
        ? this.setState({ content: this.props.text })
        : this.setState(({ content }) => ({ content: `${content}.` }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <Delayed>
        <p style={styles}>{this.state.content}</p>
      </Delayed>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};