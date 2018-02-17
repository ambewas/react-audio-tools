import ComputerKeyboard from "./ComputerKeyboard";
import { setupComponent } from "../../../helpers/testHelpers";

const setup = setupComponent(ComputerKeyboard, {
  keyboardLayout: "azerty",
  controlled: true,
  children: () => null,
});

const eventMocker = {};

window.addEventListener = jest.fn().mockImplementation((event, cb) => {
  eventMocker[event] = cb;
});

describe("ComputerKeyboard", () => {
  it("should render without crashing", () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });


  it("should set a sustain message to state when shift is pressed", () => {
    const { component } = setup();

    eventMocker.keydown({ keyCode: 16 });
    const state = component.state();

    expect(state.midiMsg.type).toBe("cc64");
    expect(state.midiMsg.velocity).toBe(127);
  });

  it("should set a sustain OFF message to state when shift is released", () => {
    const { component } = setup();

    eventMocker.keyup({ keyCode: 16 });
    const state = component.state();

    expect(state.midiMsg.type).toBe("cc64");
    expect(state.midiMsg.velocity).toBe(0);
  });

  it("should return early out of the keydown if the key had already been pressed", () => {
    const { component } = setup();

    eventMocker.keydown({ keyCode: 81 });
    const state = component.state();

    eventMocker.keydown({ keyCode: 81 });
    const secondState = component.state();

    expect(state.midiMsg.pitch).toBe(secondState.midiMsg.pitch);
  });

  it("should set a noteon message to state when a note key is pressed", () => {
    const { component } = setup();

    eventMocker.keydown({ keyCode: 81 });
    const state = component.state();

    expect(state.midiMsg.type).toBe("noteon");
  });

  it("should set a noteoff message to state when a note key is lifted", () => {
    const { component } = setup();

    eventMocker.keydown({ keyCode: 81 });
    eventMocker.keyup({ keyCode: 81 });

    const state = component.state();

    expect(state.midiMsg.type).toBe("noteoff");
  });


  it("should set the correct octave to state when w or x is pressed on an azerty keyboard", () => {
    const { component } = setup();

    expect(component.state().currentOctave).toBe(3);
    eventMocker.keydown({ keyCode: 87 });
    expect(component.state().currentOctave).toBe(2);
    eventMocker.keydown({ keyCode: 88 });
    eventMocker.keyup({ keyCode: 88 });
    eventMocker.keydown({ keyCode: 88 });
    expect(component.state().currentOctave).toBe(4);
  });


  it("should set the correct octave to state when z or x is pressed on a qwerty keyboard", () => {
    const { component } = setup({ keyboardLayout: "qwerty" });

    expect(component.state().currentOctave).toBe(3);
    eventMocker.keydown({ keyCode: 90 });
    expect(component.state().currentOctave).toBe(2);
    eventMocker.keydown({ keyCode: 88 });
    eventMocker.keyup({ keyCode: 88 });
    eventMocker.keydown({ keyCode: 88 });
    expect(component.state().currentOctave).toBe(4);
  });


  it("should ignore keypresses we are not listening for", () => {
    const { component } = setup();

    eventMocker.keydown({ keyCode: 45 });
    expect(component.state().midiMsg).toEqual({});
  });


  it("should ignore keypresses if the component is not controlled", () => {
    const { component } = setup({ controlled: false });

    eventMocker.keydown({ keyCode: 81 });
    expect(component.state().midiMsg).toEqual({});
  });


  it("should set a C note midiMsg when the A key on a qwerty keyboard is pressed", () => {
    const { component } = setup({ keyboardLayout: "qwerty" });

    eventMocker.keydown({ keyCode: 65 });
    expect(component.state().midiMsg.pitch).toBe(36);
  });
});
