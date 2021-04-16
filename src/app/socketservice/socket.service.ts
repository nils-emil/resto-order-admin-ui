import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private RECEIVE_REFRESH_ORDER_COMMAND = 'REFRESH-ORDERS'
  private RECEIVE_ALL_ORDERS = 'ALL_ORDERS'
  private EMIT_FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS'
  private MARK_ORDER_SERVICED = 'MARK_ORDER_SERVICED'


  constructor(private socket: Socket) { }

  sendMessage(msg: string){
    this.socket.emit("message", msg);
  }

  allOrdersRefreshed() {
    return this.socket
      .fromEvent(this.RECEIVE_ALL_ORDERS)
      .pipe(map((data: any[]) => data));
  }


  orders() {
    return this.socket
      .fromEvent("NEW-ORDER")
      .pipe(map((data) => data));
  }

  serviceCalls() {
    return this.socket
      .fromEvent("NEW-SERVICE-CALL")
      .pipe(map((data) => data));
  }


  listenForTablesThatAreServiced() {
    return this.socket
      .fromEvent("TABLE-SERVICED")
      .pipe(map((data: any) => data));
  }

  emitOrdersShouldBeReloaded() {
    this.socket.emit(this.EMIT_FETCH_ALL_ORDERS)
  }

  organizationOrdersShouldBeRefreshed() {
    return this.socket
      .fromEvent(this.RECEIVE_REFRESH_ORDER_COMMAND)
      .pipe(map((data) => data));
  }

  markServices(args) {
    this.socket.emit(this.MARK_ORDER_SERVICED, args)
  }


}
