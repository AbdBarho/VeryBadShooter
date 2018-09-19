import Engine from "../engine";

class EngineWorker extends Engine {
  constructor() {
    super();
    self.addEventListener("message", (e) => this.onMessage(e));
  }

  onMessage(e) {
    console.log("I am engine WORKER", e);
  }

  postMessage(...data) {
    return self.postMessage(...data);
  }
}

export default new EngineWorker();