import { Component } from "react";
import PropTypes from "prop-types";
import connect from "./connect";
import { parameterTypes } from "../../constants";

const generateEffectComponent = (name, options, UIrenderer) => {
  const paramKeys = Object.keys(options.parameterTypes);

  const paramShape = paramKeys.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: PropTypes.number,
    };
  }, {});


  class Effect extends Component {
    static displayName = name;

    static propTypes = {
      audioNode: PropTypes.object,
      renderer: PropTypes.func,
      onChange: PropTypes.func.isRequired,
      params: PropTypes.shape(paramShape).isRequired,
    }

    static defaultProps = {
      params: options.defaultParameters,
    }

    constructor(props) {
      super(props);
      this.audioNode = this.props.audioNode;
    }

    getValueType = (param, value) => {
      switch (options.parameterTypes[param]) {
      case parameterTypes.NORMALRANGE:
        return value / 100;

      case parameterTypes.FULL:
        return value;

      default:
        return value;
      }
    }

    checkNextPropShape = (nextProps) => {
      if (nextProps.params) {
        // throw error if nextProps does not contain exactly all keys that the effect requires
        const nextPropParamKeys = Object.keys(nextProps.params);
        const uniques = paramKeys.reduce((acc, curr) => {
          if (nextPropParamKeys.find(item => item === curr)) {
            return acc;
          }
          return acc.concat(curr);
        }, []);

        if (uniques && uniques.length > 0) {
          throw new Error(`Check your prop updating code. You probably did not pass through all the expected default parameters for the ${name} effect`);
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      const { params } = nextProps;

      this.checkNextPropShape(nextProps);

      // TODO -- this should be a lot more precise. Right now it's all a little bit chaotic and unclear about mins and maxes;
      for (const param in params) {
        const newValue = this.getValueType(param, params[param]);

        if (this.audioNode[param].rampTo) {
          this.audioNode[param].rampTo(newValue);
        } else {
          this.audioNode[param] = newValue;
        }
      }
    }

    getComponentRenderer() {
      const { renderer, onChange, params } = this.props;

      if (renderer) {
        return renderer();
      }

      return UIrenderer(onChange, params);
    }

    render() {
      return this.getComponentRenderer();
    }
  }

  return connect(options.connectOptions)(Effect);
};


export default generateEffectComponent;
