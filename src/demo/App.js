import React, { Component } from "react";
import { ComputerKeyboard } from "../lib";

class App extends Component {
	state = {  }
	render() {
		return (
			<div>
				<ComputerKeyboard controlled keyboardLayout="azerty">
					{midimsg => {
						console.log("midimsg", midimsg);
						return null;
					}
					}
				</ComputerKeyboard>
			</div>

		);
	}
}

export default App;
