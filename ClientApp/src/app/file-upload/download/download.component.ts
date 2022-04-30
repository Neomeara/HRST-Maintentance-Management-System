import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatus, ProgressStatusEnum } from '../../Models/fileProgress';
import { FileUploadService } from '../../Services/file-upload/file-upload.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: 'download.component.html'
})

export class DownloadComponent {
  @Input() public disabled: boolean = false;
  @Input() public fileName: string ='';
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Output() public deleteStatus: EventEmitter<ProgressStatus>;

  public listId: number = 0;
  public listItemId?: number|undefined;

  constructor(private service: FileUploadService, private route:ActivatedRoute) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.deleteStatus = new EventEmitter<ProgressStatus>();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get('listId'))
      this.listItemId = Number(params.get('listItemId'))
    })

  }

  public download() {
    this.downloadStatus.emit({ status: ProgressStatusEnum.START, percentage:0 });
    this.service.downloadFile(this.fileName, this.listId.toString(),this.listItemId?.toString()).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data!.total!) * 100) });
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit({ status: ProgressStatusEnum.COMPLETE,percentage:100 });
            const downloadedFile = new Blob([data.body! ], { type: data.body!.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit({ status: ProgressStatusEnum.ERROR,percentage:50 });
      }
    );
  }

  public deleteFile() {
    this.service.deleteFile(this.fileName, this.listId.toString(),this.listItemId?.toString()).subscribe(() => {
      this.deleteStatus.emit({ status: ProgressStatusEnum.COMPLETE, percentage: 100 });

    });
  }

}


