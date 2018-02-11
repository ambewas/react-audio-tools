/* eslint-disable react/prop-types */

import React from "react";
import ReactDOM from "react-dom";
import ComputerKeyboard from "./ComputerKeyboard";

describe("ComputerKeyboard", () => {

	it("ComputerKeyboard renders without crashing", () => {
		const div = document.createElement("div");

		ReactDOM.render(<ComputerKeyboard>{() => null}</ComputerKeyboard>, div);
	});

	it("should throw an error if direct child is not a function", () => {
		const div = document.createElement("div");

		expect(() => ReactDOM.render(<ComputerKeyboard />, div)).toThrow(); // eslint-disable-line
	});

	it("should pass a midi message to the child-as-a-function", () => {
		const childFunction = msg => msg;



	});
});
