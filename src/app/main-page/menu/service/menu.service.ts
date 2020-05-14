import {Injectable, OnInit} from '@angular/core';
import {MenuList} from '../../domain/menuList';
import {TecDetail} from '../../domain/tecDetail';
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: string = environment.myUrl+'page/direction';

  getMenuList(): Observable<Array<MenuList>>{
     return this.http.get<Array<MenuList>>(this.url).pipe(
       retry(3)
     );
  }
  constructor(private http: HttpClient) { }

}
