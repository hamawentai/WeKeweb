import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {retry} from "rxjs/operators";
import {Video} from "../domain/video";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  url: string = environment.myUrl+'/videoApi/getVideo';

  constructor(private http: HttpClient) { }

  getVideo(catalogName: string, chapterName: string): Observable<Video>{
    const params = new HttpParams().set('catalogName', catalogName).set('chapterName', chapterName);
    return this.http.get<Video>(this.url, {params}).pipe(
      retry(3)
    );
  }
}
