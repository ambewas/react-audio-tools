/* eslint-disable react/prop-types */

import React from "react";
import ComputerKeyboard from "./ComputerKeyboard";
import shallow from "react-test-renderer/shallow";

const setup = propOverrides => {
	const props = Object.assign({
		keyboardLayout: "azerty",
		controlled: true,
		children: () => null,
	}, propOverrides);

	const renderer = new shallow();

	renderer.render(<ComputerKeyboard {...props} />);

	const wrapper = renderer.getRenderOutput();

	return {
		props,
		wrapper,
	};
};

describe("ComputerKeyboard", () => {
	it("should render without crashing", () => {
		const { wrapper } = setup();

		expect(wrapper).toMatchSnapshot();
	});

	// it("should throw an error if direct child is not a function", () => {
	// 	const div = document.createElement("div");

	// 	expect(() => ReactDOM.render(<ComputerKeyboard />, div)).toThrow(); // eslint-disable-line
	// });

	// it("should pass a midi message to the child-as-a-function", () => {
	// 	const childFunction = msg => msg;
	// });
});
