class Store {
    constructor(initialState = {}) {
      this.state = initialState;
      this.listeners = [];
    }
  
    getState() {
      return this.state;
    }
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this._notify();
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    _notify() {
      this.listeners.forEach(listener => listener(this.state));
    }
  }
  
  export default Store;