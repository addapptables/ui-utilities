import { Injectable } from '@angular/core';
import { CommunicateServiceModel } from './models/communicate.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  private communicateAnnouncedList: Array<CommunicateServiceModel<any>>;

  constructor() {
    this.communicateAnnouncedList = new Array();
  }

  observe<T>(name: string) {
    const eventObservable = this.communicateAnnouncedList.find(
      x => x.name === name,
    );
    let observable = eventObservable
      ? eventObservable.observable
      : undefined;
    if (!eventObservable) {
      const communicateSource = new Subject<T>();
      observable = communicateSource.asObservable();
      this.communicateAnnouncedList.push({
        name,
        observable,
        communicateSource,
      });
    }
    return observable;
  }

  communicate<T>(name: string, value?: T) {
    const eventObservable = this.communicateAnnouncedList.find(
      x => x.name === name,
    );
    if (eventObservable) {
      eventObservable.communicateSource.next(value);
    }
  }
}
