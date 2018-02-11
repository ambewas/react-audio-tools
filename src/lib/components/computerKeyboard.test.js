import React from "react";
import ComputerKeyboard from "./ComputerKeyboard";
import ReactTestRenderer from "react-test-renderer";
import { shallow } from "enzyme";

const setup = propOverrides => {
	const props = Object.assign({
		keyboardLayout: "azerty",
		controlled: true,
		children: () => null,
	}, propOverrides);

	const wrapper = ReactTestRenderer.create(
		<ComputerKeyboard {...props} />
	).toJSON();

	const component = shallow(<ComputerKeyboard {...props} />);

	return {
		props,
		wrapper,
		component,
	};
};

const map = {};

window.addEventListener = jest.fn().mockImplementation((event, cb) => {
	map[event] = cb;
});


describe("ComputerKeyboard", () => {
	xit("should render without crashing", () => {
		const { wrapper } = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it("should throw an error if direct child is not a function", () => {
		const { component } = setup({
			children: (msg) => {
				return <div {...msg}></div>;
			},
		});

		// const children = wrapper.children;
		map.keydown({ keyCode: 16 });
		console.log("component", component.state());
		// console.log("children", children);
		// expect(wrapper).toThrow(); // eslint-disable-line
	});

	// it("should pass a midi message to the child-as-a-function", () => {
	// 	const childFunction = msg => msg;
	// });
});
