import EventEmitter from 'events'
const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // unlimit listenter
export const emitter = _emitter