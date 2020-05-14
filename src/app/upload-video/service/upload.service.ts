import { Injectable } from '@angular/core';
import {Catalog} from "../domain/catalog";
import {HttpClient} from "@angular/common/http";
import {Upload} from "../domain/upload";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  catalog: Catalog[] = [new Catalog("章节名称",null)];
  url: string = environment.myUrl+"uploadApi/saveChapter";

  saveCatalogs(upload: Upload): void {
    this.http.post(this.url, upload).subscribe();
  }

  constructor(private http: HttpClient) { }
}
