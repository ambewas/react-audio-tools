import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleMonophonicNoteTriggers } from "../../helpers";

const makeSynth = options => WrappedComponent => {
  return class Enhancer extends Component {
    static propTypes = {
      output: PropTypes.string,
      input: PropTypes.string,
      midiMsg: PropTypes.object,
    }

    static contextTypes = {
      setOutput: PropTypes.func,
      connections: PropTypes.object,
    }

    constructor() {
      super();
      this.audioNode = options.audioNode;
    }

    componentDidMount() {
      const { input, output } = this.props;
      const { connections, setOutput } = this.context;

      // setup proper initial connections
      if (input && connections[input]) {
        connections[input].connect(this.audioNode);
      }

      if (output) {
        setOutput(this.audioNode, output);
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
        connections[input].connect(this.audioNode);
      }

      // set to correct output node
      if (output && output !== this.props.output) {
        setOutput(this.audioNode, output);
      }
    }

    render() {
      const { midiMsg } = this.props;

      if (midiMsg) {
        handleMonophonicNoteTriggers(midiMsg, this);
      }

      return <WrappedComponent {...this.props} audioNode={this.audioNode} />;
    }
  };
};


export default makeSynth;
