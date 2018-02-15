import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { shallow } from "enzyme";

export const setupComponent = (Component, defaultProps) => propOverrides =>{
  const props = {
    ...defaultProps,
    ...propOverrides,
  };

  const wrapper = ReactTestRenderer.create(
    <Component {...props} />
  ).toJSON();

  const component = shallow(<Component {...props} />);

  return {
    props,
    wrapper,
    component,
  };
};

