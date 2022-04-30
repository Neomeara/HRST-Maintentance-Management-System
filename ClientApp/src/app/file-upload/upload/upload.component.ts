import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatus, ProgressStatusEnum } from '../../Models/fileProgress';
import { FileUploadService } from '../../Services/file-upload/file-upload.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html'
})

export class UploadComponent {
  @Input() public disabled: boolean = false;
  public listId: number = 0;
  public listItemId?: number|undefined;
  @Output() public uploadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef = null!;

  constructor(private service: FileUploadService, private route:ActivatedRoute) {
    this.uploadStatus = new EventEmitter<ProgressStatus>();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get('listId'));
      this.listItemId = Number(params.get('listItemId'));
    })
  }

  public upload(event:any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadStatus.emit({ status: ProgressStatusEnum.START, percentage:0 });
      this.service.uploadFile(file, this.listId.toString(), this.listItemId?.toString()).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatus.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total!) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatus.emit({ status: ProgressStatusEnum.COMPLETE, percentage:100 });
                break;
            }
          }
        },
        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatus.emit({ status: ProgressStatusEnum.ERROR, percentage:50 });
        }
      );
    }
  }
}

