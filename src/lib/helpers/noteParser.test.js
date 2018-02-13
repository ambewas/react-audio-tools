import { noteParser } from "./noteParser";

describe("noteParser", () => {
  it("should return the correct note-notation from a valid midi pitch", () => {
    expect(noteParser(61)).toBe("C#5");
    expect(noteParser(50)).toBe("D4");
    expect(noteParser(0)).toBe("C0");
    expect(noteParser(127)).toBe("G10");
  });

  it("should return undefined if an invalid midi pitch has been provided", () => {
    expect(noteParser(-1)).toBe(undefined);
    expect(noteParser(128)).toBe(undefined);
  });
});
