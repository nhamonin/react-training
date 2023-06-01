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
  state = {
    show: false,
  };

  static propTypes = {
    wait: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    wait: 300,
  };

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

export default class Loading extends React.Component {
  state = {
    content: this.props.text,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300,
  };

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
