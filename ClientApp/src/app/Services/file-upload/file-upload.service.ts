import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl } from '../../../main';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseApiUrl: string;
  private apiDownloadUrl: string;
  private apiDeleteUrl: string;
  private apiUploadUrl: string;
  private apiFileUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = getBaseUrl() +'api/files/';
    this.apiDownloadUrl = this.baseApiUrl + 'download/';
    this.apiDeleteUrl = this.baseApiUrl + 'delete/';
    this.apiUploadUrl = this.baseApiUrl + 'upload/';
    this.apiFileUrl = this.baseApiUrl + 'files/';
    
  }

  public downloadFile(file: string, listId:string): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'GET',
      `${this.apiDownloadUrl + listId}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public deleteFile(file: string, listId: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'DELETE',
      `${this.apiDeleteUrl + listId}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public uploadFile(file: Blob, listId:string): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.request(new HttpRequest(
      'POST',
      this.apiUploadUrl + listId,
      formData,
      {
        reportProgress: true
      }));
  }

  public getFiles(listId:string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFileUrl + listId);
  }
}


