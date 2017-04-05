import {EventEmitter} from 'events';
interface IEvent<TType extends string, TData extends any> {
  type: TType;
  data: TData;
}

type IDataEvent = IEvent<'data', { foo: 'bar' }>;
type IErrorEvent = IEvent<'error', Error>;
type IMyEvents = IDataEvent | IErrorEvent;


class MyEmitter extends EventEmitter {
  on<TEvt extends IMyEvents>(type:TEvt['type'], onEvt:(evt: TEvt['data']) => any):this {
    return super.on(type, onEvt)
  };

  emit<TEvt extends IMyEvents>(type:TEvt['type'], data:TEvt['data']):boolean {
    return super.emit(type, data);
  }
}

const emitter = new MyEmitter();
emitter.on<IDataEvent>('data', (data) => {
  console.log(data.foo);
});

emitter.emit<IDataEvent>('data', { foo: 'bar' });