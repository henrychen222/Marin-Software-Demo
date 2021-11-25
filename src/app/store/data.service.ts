import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private store = new Map();
  private listenerMap = new Map<string, BehaviorSubject<any>[]>();

  set(key: string, value: any) {
    this.store.set(key, value ? {...value} : null);
    if (this.listenerMap.get(key)) {
      this.listenerMap.get(key)?.forEach(subject => {
        subject.next(value ? {...value} : null);
      });
    }
  }

  remove(key: string) {
    this.store.delete(key);
  }

  get(key: string): any {
    if (this.store.get(key)) {
      return {...this.store.get(key)};
    }
    return null;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  getListener(key: string): BehaviorSubject<any> {
    const subject = new BehaviorSubject<any>(this.get(key) ? {...this.get(key)} : null);
    if (!this.listenerMap.get(key)) {
      this.listenerMap.set(key, []);
    }
    this.listenerMap.get(key)?.push(subject);
    return subject;
  }

  deepMerge(target: any, source: any) {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], this.deepMerge(target[key], source[key]));
      }
    }
    return {...target, ...source};
  }
}
