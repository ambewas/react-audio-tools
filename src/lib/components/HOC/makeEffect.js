import React, { Component } from "react";
import PropTypes from "prop-types";

const makeSynth = options => WrappedComponent => {
  return class Enhancer extends Component {
    static propTypes = {
      output: PropTypes.string,
      input: PropTypes.string,
    }

    static contextTypes = {
      setOutput: PropTypes.func,
      connections: PropTypes.object,
    }

    constructor() {
      super();
      this.effectNode = options.effectNode;
    }

    componentDidMount() {
      const { input, output } = this.props;
      const { connections, setOutput } = this.context;

      // setup proper initial connections
      if (input && connections[input]) {
        connections[input].connect(this.effectNode);
      }

      if (output) {
        setOutput(this.effectNode, output);
      }
    }

    componentWillReceiveProps(nextProps, nextContext) {
      const { input, output } = nextProps;
      const { connections, setOutput } = nextContext;

      // disconnect the current input if it's a different ont
      if (input !== this.props.input) {
        connections[this.props.input].disconnect();
      }

      // connect the new input
      if (input) {
        connections[input].connect(this.effectNode);
      }

      // set to correct output node
      if (output && output !== this.props.output) {
        setOutput(this.effectNode, output);
      }
    }

    render() {
      return <WrappedComponent {...this.props} effectNode={this.effectNode} />;
    }
  };
};


export default makeSynth;
