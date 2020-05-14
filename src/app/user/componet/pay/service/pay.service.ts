import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Msg} from "./msg";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PayService {

  url: string = environment.myUrl+"payApi/queryOrder";

  jungleOrder(userName: string, orderId: string): Observable<Msg>{
    const params = new HttpParams().set("userName",userName).set("orderId",orderId);
    return this.http.get<Msg>(this.url,{params});
  }

  constructor(private http: HttpClient) { }
}
