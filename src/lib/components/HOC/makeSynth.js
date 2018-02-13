import React, { Component } from "react";
import { handleMonophonicNoteTriggers } from "../../helpers";
import PropTypes from "prop-types";

const makeSynth = options => WrappedComponent => {
  return class Enhancer extends Component {
    static contextTypes = {
      setOutput: PropTypes.func,
    }

    static propTypes = {
      midiMsg: PropTypes.object,
      output: PropTypes.string,
    }

    constructor() {
      super();

      this.synth = options.synth;
    }

    componentDidMount() {
      const { output } = this.props;
      const { setOutput } = this.context;

      // setup proper initial connections
      if (output) {
        setOutput(this.synth, output);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { output } = nextProps;
      const { setOutput } = this.context;

      // update outputs when necessary
      if (output && output !== this.props.output) {
        setOutput(this.synth, output);
      }
    }

    render() {
      const { midiMsg } = this.props;

      handleMonophonicNoteTriggers(midiMsg, this);
      return <WrappedComponent {...this.props} synth={this.synth} />;
    }
  };
};


export default makeSynth;
