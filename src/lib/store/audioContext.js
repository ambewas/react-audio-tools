const EventEmitter = require("events").EventEmitter;

const CHANGE_EVENT = "audio-context-change";

class store extends EventEmitter {
  constructor() {
    super();
    this.connections = {};
  }

  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  }

  connectTo = (node, destination) => {
    this.connections[destination] = node;
    this.emit(CHANGE_EVENT);
  }

  getConnection = (connection) => {
    return this.connections[connection];
  }

  getConnections = () => {
    return this.connections;
  }
}

export default store;
