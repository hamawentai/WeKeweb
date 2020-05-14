import { Injectable } from '@angular/core';
import {Reply} from "../domain/reply";
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Po} from "../domain/po";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  url: string = environment.myUrl+'replyApi/detail';
  url1 : string = environment.myUrl+'replyApi/saveReply';

  getReplys(commentId: string): Observable<Reply> {
    const params = new HttpParams()
      .set('commentId', commentId);
    return this.http.get<Reply>(this.url, {params});
  }

  saveReply(po: Po): Observable<any>{
     return this.http.post(this.url1,{
      "kind": po.kind,
      "id": po.id,
      "sb": po.sb,
      "content": po.content,
      "replyer": po.replyer
    });
  }

  constructor(private http: HttpClient) { }
}
