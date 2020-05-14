import {Injectable} from '@angular/core';
import {Person} from '../../msgInput/domain/person';
import {Observable, of} from 'rxjs';
import {History} from '../domian/history';
import {HttpClient} from "@angular/common/http";
import {retry} from "rxjs/operators";
import {Menu} from "../../freeCourse/kind/domain/menu";
import {Photourl} from "../domian/photourl";
import {OrderMsg} from "../domian/orderMsg";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url: string = environment.myUrl+'userApi/getUser';
  url2: string = environment.myUrl+'userApi/changeUser';
  url3: string = environment.myUrl+'upload/photo';
  url4: string = environment.myUrl+'payApi/tobePublisher';

  history: History[] = [];

  getPersonById(): Observable<Person> {
    // 通过Id返回Person信息
    return this.http.get<Person>(this.url).pipe(
      retry(3)
    );
  }

  getHistoryById():Observable<History[]> {
    // 通过Id返回History信息
    const loginInfoUrl = environment.baseUrl + "user/userLoginInfo?userName="+localStorage.getItem('userName');
    return this.http.get<History[]>(loginInfoUrl).pipe();
  }

  uploadPhoto(file: FormData): Observable<Photourl>{
    return this.http.post<Photourl>(this.url3,file);
  }

  savaPerson(person: Person) {
    this.http.post(this.url2, {
      "url": person.url,
      "nickname": person.nickname,
      "job": person.job,
      "address": person.address,
      "sex": person.sex,
      "info": person.info,
      "permission": person.permission
    }).pipe(
      retry(3)
    ).subscribe();
  }

  jungleOrderNo(userName: string): Observable<OrderMsg> {
    return this.http.post<OrderMsg>(this.url4,{
      'userName': userName
    });
  }

  constructor(private http: HttpClient) {
  }
}
