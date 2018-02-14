/**
 * connector is a context provider component that talks to the audioStore
 */
import { Component } from "react";
import PropTypes from "prop-types";

import audioContext from "./audioContext";

const audioStore = new audioContext();

class Connector extends Component {
  static childContextTypes = {
    setOutput: PropTypes.func,
    connections: PropTypes.object,
  }

  static propTypes = {
    children: PropTypes.any,
  }

  constructor() {
    super();
    this.state = {
      connections: {},
    };
    audioStore.addChangeListener(this.onChange);
  }

  getChildContext() {
    return {
      setOutput: (synth, destination) => {
        audioStore.connectTo(synth, destination);
      },
      connections: this.state.connections,
    };
  }

  componentWillUnmount() {
    audioStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({
      connections: audioStore.getConnections(),
    });
  }

  render() {
    return this.props.children;
  }
}

export default Connector;
