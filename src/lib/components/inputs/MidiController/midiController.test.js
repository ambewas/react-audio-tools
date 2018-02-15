import { setupComponent } from "../../../helpers/index";
import MidiController from "./MidiController";
import webmidi from "webmidi";

const setup = setupComponent(MidiController, {
  children: () => null,
});

describe("MidiController", () => {
  it("should render without crashing", () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe("without midi access", () => {
    beforeAll(() => {
      webmidi.enable = jest.fn(err => err({ someError: "someError" }));
    });

    it("should set a canAccessMidi static on the class to false if midi is not available", () => {
      const { component } = setup();
      const componentInstance = component.instance();

      expect(webmidi.enable).toBeCalled();
      expect(componentInstance.canAccessMidi).toBe(false);
    });
  });

  describe("with midi access", () => {
    beforeAll(() => {
      webmidi.enable = jest.fn(err => err());
    });

    it("should set a canAccessMidi static on the class to true if midi available", () => {
      const { component } = setup();
      const componentInstance = component.instance();

      expect(webmidi.enable).toBeCalled();
      expect(componentInstance.canAccessMidi).toBe(true);
    });
  });
});
