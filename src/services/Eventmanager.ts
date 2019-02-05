export default class EventManager {
  __listeners__ : any = {};
  /**
   * register event listener
   * @param event event name
   * @param callback the callback function
   * @param context this context for the method
   */
  on(event: string, callback: Function, context?: any) {
    this.__listeners__[event] = this.__listeners__[event] || [];
    this.__listeners__[event].push({ callback, context });
  }
  /**
   * register event listener. will be called only once, then unregistered.
   * @param event event name
   * @param callback the callback function
   * @param context
   */
  once(event: string, callback: Function, context?: any) {
    let helper = (...args: any[]) => {
      callback.apply(context, args);
      this.off(event, helper);
    };
    this.on(event, helper, context);
  }
  /**
   * unregister event handler.
   * @param event the event name
   * @param callback the callback
   */
  off(event: string, callback: Function) {
    let callbacks = this.__listeners__[event];
    for (let i = 0; i < callbacks.length; i++)
      if (callbacks[i].callback === callback)
        callbacks.splice(i--, 1);
  }
  /**
   * trigger an event
   * @param event event name
   * @param args callback arguments
   */
  trigger(event: string, ...args: any[]) {
    let callbacks = this.__listeners__[event] || [];
    for (let i = 0; i < callbacks.length; i++)
      callbacks[i].callback.apply(callbacks[i].context, args);
  }
}

export interface QueuedEvent {
  event: string;
  parameters: any[]
}

export class QueuedEventManager extends EventManager {
  queue: QueuedEvent[] = [];

  queueEvent(event: string, ...parameters: any[]) {
    this.queue.push({ event, parameters });
  }

  executeQueue() {
    if (this.queue.length === 0)
      return;

    let queue = this.queue;
    this.queue = [];
    for (let i = 0, len = queue.length; i < len; i++) {
      let el = queue[i];
      this.trigger(el.event, ...el.parameters);
    }
  }

  emptyQueue() {
    this.queue = [];
  }
}