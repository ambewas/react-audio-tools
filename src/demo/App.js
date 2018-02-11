import React, { Component } from "react";
import { ComputerKeyboard } from "../lib";

class App extends Component {
	state = {  }
	render() {
		return (
			<div>
				<ComputerKeyboard controlled keyboardLayout="azerty">
					{
						midimsg => {
							// this will eventually render a new component with midimsg prop input.
							console.log("midimsg", midimsg);
							return <div>{midimsg.pitch}</div>;
						}
					}
				</ComputerKeyboard>
			</div>

		);
	}
}

export default App;
