A set of React components to build things with the webAudio/webMidi API.

## install

`npm i react-audio-tools`

## usage

Here's an example of the ComputerKeyboard component. Note the child-as-a-function pattern.

```js
import React, { Component } from "react";
import { ComputerKeyboard } from "react-audio-tools";

class App extends Component {
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
```