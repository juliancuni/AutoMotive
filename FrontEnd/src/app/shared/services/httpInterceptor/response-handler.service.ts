import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  constructor() { }

  handleReq(req: any, elapsed: number) {
    console.log(req.url + " - " + elapsed + " ms")
  }
}
