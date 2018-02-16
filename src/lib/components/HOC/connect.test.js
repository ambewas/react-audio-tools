import React from "react";
import connect from "./connect";
jest.mock("../../helpers/handleMonophonicNoteTriggers");
import { handleMonophonicNoteTriggers } from "../../helpers";
import { setupComponent } from "../../helpers/testHelpers";
import { shallow } from "enzyme";

const Component = (props) => <div {...props}></div>;
const audioNode = {
  triggerRelease: () => { },
};

const EnhancedComponent = connect({ audioNode: audioNode })(Component);
const setup = setupComponent(EnhancedComponent, {});


describe("connect HOC", () => {
  beforeAll(() => {
    jest.unmock("../../helpers/handleMonophonicNoteTriggers");
  });
  it("should return a new fn after being called once", () => {
    const newFn = connect();

    expect(typeof newFn).toBe("function");
  });

  it("should enhance a component with an audioNode prop", () => {
    const { wrapper } = setup();

    expect(wrapper.props.audioNode).toBe(audioNode);
  });

  it("should call setOutput from context, when output prop has been provided", () => {
    const component = shallow(<EnhancedComponent output="myoutput"/>,
      {
        context:
          {
            setOutput: jest.fn(),
          },
      });

    const context = component.context();

    expect(context.setOutput).toHaveBeenCalledWith(audioNode, "myoutput");
  });

  it("should NOT call setOutput from context, when output prop has not been provided", () => {
    const component = shallow(<EnhancedComponent />,
      {
        context:
          {
            setOutput: jest.fn(),
          },
      });

    const context = component.context();

    expect(context.setOutput).not.toBeCalled();
  });

  it("should connect to a given input on the context when an input prop has been provided", () => {
    const component = shallow(<EnhancedComponent input="myConnection"/>,
      {
        context:
          {
            connections: {
              myConnection: {
                connect: jest.fn(),
              },
            },
          },
      });

    const context = component.context();

    expect(context.connections.myConnection.connect).toHaveBeenCalledWith(audioNode);
  });

  it("should NOT connect to a given input on the context when an input prop has NOT been provided", () => {
    const component = shallow(<EnhancedComponent />,
      {
        context:
          {
            connections: {
              myConnection: {
                connect: jest.fn(),
              },
            },
          },
      });

    const context = component.context();

    expect(context.connections.myConnection.connect).not.toBeCalled();
  });

  it("should NOT connect to a given input on the context when an input prop has been provided that is not present on the connections", () => {
    const component = shallow(<EnhancedComponent input="myConnection"/>,
      {
        context:
          {
            connections: {
              myOtherconnection: {
                connect: jest.fn(),
              },
            },
          },
      });

    const context = component.context();

    expect(context.connections.myConnection).toBe(undefined);
    expect(context.connections.myOtherconnection.connect).not.toBeCalled();
  });

  it("should not trigger monophonic notes if a midimsg has not provided", () => {
    const { component } = setup();

    component.instance();

    expect(handleMonophonicNoteTriggers).not.toBeCalled();
  });

  it("should trigger monophonic notes if a midimsg has been provided", () => {
    const { component } = setup({ midiMsg: { type: "bla" } });

    component.instance();
    expect(handleMonophonicNoteTriggers).toBeCalled();
  });
});
