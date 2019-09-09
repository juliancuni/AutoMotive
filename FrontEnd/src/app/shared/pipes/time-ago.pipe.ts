// import { OnDestroy, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
// import { AsyncPipe } from '@angular/common';
// // import { Observable } from 'rxjs';
// import * as rx from 'rxjs';
// // import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/repeatWhen';
// // import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/takeWhile';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map'


// @Pipe({
//   name: 'dateAgo',
//   pure: false
// })
// export class TimeAgoPipe implements PipeTransform, OnDestroy {
//   private readonly async: AsyncPipe;

//   private isDestroyed = false;
//   private value: Date;
//   private timer: rx.Observable<string>;

//   constructor(ref: ChangeDetectorRef) {
//     this.async = new AsyncPipe(ref);
//   }

//   public transform(obj: any, ...args: any[]): any {
//     if (obj == null) {
//       return '';
//     }

//     if (!(obj instanceof Date)) {
//         obj = new Date(obj);
//     //   throw new Error('TimeAgoPipe works only with Dates');
//     }

//     this.value = obj;

//     if (!this.timer) {
//       this.timer = this.getObservable();
//     }

//     return this.async.transform(this.timer);
//   }

//   public now(): Date {
//     return new Date();
//   }

//   public ngOnDestroy() {
//     this.isDestroyed = true;
//     // on next interval, will complete
//   }

//   private getObservable() {

//     // timer(1000).subscribe(() => {
//     //     return this.elapsed()
//     // })

//     return rx.Observable
//       .of(1)
//       .repeatWhen(notifications => {
//         // for each next raised by the source sequence, map it to the result of the returned observable
//         return notifications.flatMap((x, i) => {
//           const sleep = i < 60 ? 1000 : 30000;
//           return rx.timer(sleep);
//         });
//       })
//       .takeWhile(_ => !this.isDestroyed)
//       .map((x, i) => this.elapsed());
//   };

//   private elapsed(): string {
//       console.log("called")
//     let now = this.now().getTime();

//     // time since message was sent in seconds
//     let delta = (now - this.value.getTime()) / 1000;

//     // format string
//     if (delta < 60) { // sent in last minute
//       return `${Math.floor(delta)}s ago`;
//     } else if (delta < 3600) { // sent in last hour
//       return `${Math.floor(delta / 60)}m ago`;
//     } else if (delta < 86400) { // sent on last day
//       return `${Math.floor(delta / 3600)}h ago`;
//     } else { // sent more than one day ago
//       return `${Math.floor(delta / 86400)}d ago`;
//     }
//   }
// }
// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//     name: 'dateAgo',
//     pure: true
// })
// export class TimeAgoPipe implements PipeTransform {
//     transform(value: any, args?: any): any {
//         if (value) {

//             const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
//             if (seconds < 29)
//                 return 'Sapo u krijua';
//             let intervals = {
//                 'viti': 31536000,
//                 'muaji': 2592000,
//                 'jave': 604800,
//                 'dite': 86400,
//                 'ore': 3600,
//                 'minute': 60,
//                 'sekonde': 1
//             };
//             let counter;
//             for (let i in intervals) {
//                 counter = Math.floor(seconds / intervals[i]);
//                 if (counter > 0)
//                     if (counter === 1) {
//                         return 'para ' + counter + ' ' + i;
//                     } else {
//                         if (i === 'viti') i = 'vjetësh'
//                         if (i === 'muaji') i = 'muajsh'
//                         if (i === 'jave') i = 'javësh'
//                         if (i === 'dite') i = 'ditësh'
//                         if (i === 'ore') i = 'orësh'
//                         if (i === 'minute') i = 'minutash'
//                         if (i === 'sekonde') i = 'sekondash'
//                         return 'para ' + counter + ' ' + i;
//                     }
//             }
//         }
//         return value;
//     }
// }

import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

moment.locale("sq");

@Pipe({
    name: 'dateAgo',
    pure: false
})
export class TimeAgoPipe implements PipeTransform {
    private timer: number;
    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) { }
    transform(value: string) {
        this.removeTimer();
        let d = new Date(value);
        let now = new Date();
        let seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        let timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
        this.timer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                }, timeToUpdate);
            }
            return null;
        });

        return moment(d).fromNow(true);

    }
    ngOnDestroy(): void {
        this.removeTimer();
    }
    private removeTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }
    private getSecondsUntilUpdate(seconds: number) {
        let min = 60;
        let hr = min * 60;
        let day = hr * 24;
        if (seconds < min) { // less than 1 min, update every 2 secs
            return 2;
        } else if (seconds < hr) { // less than an hour, update every 30 secs
            return 30;
        } else if (seconds < day) { // less then a day, update every 5 mins
            return 300;
        } else { // update every hour
            return 3600;
        }
    }
}
