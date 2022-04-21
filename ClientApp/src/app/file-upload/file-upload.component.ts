import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getBaseUrl } from '../../main';
import { FileUploadService } from '../Services/file-upload/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() listId: number = 1;

  public progress: number = 0;
  public message: string = '';
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  public uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(getBaseUrl() + 'api/lists/upload/' + this.listId.toString(), formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if ( event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event!.loaded / event!.total!);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.http.get(getBaseUrl() + 'api/list/getImage/' +this.listId.toString() + '/'+ fileToUpload.name).subscribe();
        }
      });
  }

}
