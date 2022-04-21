import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../../../main';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseApiUrl = getBaseUrl() + 'api/lists/upload/';

  constructor(private http: HttpClient) { }

  upload(file: File, id:number): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.baseApiUrl + id.toString(),formData)
  }
}
