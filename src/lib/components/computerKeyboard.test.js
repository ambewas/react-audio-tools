import React from "react";
import ReactDOM from "react-dom";
import ComputerKeyboard from "./ComputerKeyboard";

it("ComputerKeyboard renders without crashing", () => {
	const div = document.createElement("div");
	const Component = () => (
		<ComputerKeyboard>
			{() => null}
		</ComputerKeyboard>
	);

	ReactDOM.render(<Component />, div);
});
