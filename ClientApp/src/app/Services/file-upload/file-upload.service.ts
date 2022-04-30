import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
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

  public downloadFile(file: string, listId: string, listItemId: string|undefined): Observable<HttpEvent<Blob>> {
    let filePath = '';
      filePath = this.apiDownloadUrl + listId;
    if (listItemId === undefined) {
      return this.httpClient.request(new HttpRequest(
        'GET',
        `${filePath}?file=${file}`,
        null,
        {
          reportProgress: true,
          responseType: 'blob'
        }));
    }
    else {
      let params = new HttpParams;
      params = params.append('listItemId', listItemId);
      return this.httpClient.request(new HttpRequest(
        'GET',
        `${filePath}?file=${file}`,
        null,
        {
          reportProgress: true,
          responseType: 'blob',
          params:params
        }));
    }
   
  }

  public deleteFile(file: string, listId: string, listItemId: string|undefined): Observable<HttpEvent<Blob>> {
    let filePath = '';
      filePath = this.apiDeleteUrl + listId;
    if (listItemId === undefined) {
      return this.httpClient.request(new HttpRequest(
        'DELETE',
        `${filePath}?file=${file}`,
        null,
        {
          reportProgress: true,
          responseType: 'blob'
        }));
    }
    else {
      let params = new HttpParams;
      params = params.append('listItemId', listItemId);
      return this.httpClient.request(new HttpRequest(
        'DELETE',
        `${filePath}?file=${file}`,
        null,
        {
          reportProgress: true,
          responseType: 'blob',
          params:params
        }));
    }
   
  }

  public uploadFile(file: Blob, listId: string, listItemId?: string|undefined): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);
    let filePath = '';
      filePath = this.apiUploadUrl + listId;
    if (listItemId === undefined) {
      return this.httpClient.request(new HttpRequest(
        'POST',
        filePath,
        formData,
        {
          reportProgress: true
        }));
    }
    else {
      let params = new HttpParams;
      params = params.append('listItemId', listItemId);
      return this.httpClient.request(new HttpRequest(
        'POST',
        filePath,
        formData,
        {
          reportProgress: true,
          params:params
        }));
    }

    
  }

  public getFiles(listId: string, listItemId?: string | undefined): Observable<string[]> {
    if (listItemId === undefined) {

      return this.httpClient.get<string[]>(this.apiFileUrl + listId);
    }
    else {
    let params = new HttpParams;
    params = params.append('listItemId',listItemId)
      return this.httpClient.get<string[]>(this.apiFileUrl + listId, {params:params});

    }
  }
}


