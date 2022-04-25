import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProgressStatus, ProgressStatusEnum } from '../../Models/fileProgress';
import { FileUploadService } from '../../Services/file-upload/file-upload.service';

@Component({
  selector: 'app-filemanager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  public files: string[] =[];
  public fileInDownload: string ='';
  public percentage: number = 0;
  public showProgress: boolean = false;
  public showDownloadError: boolean = false;
  public showUploadError: boolean = false;
  public listId: number = 0;


  constructor(private service: FileUploadService, private route :ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get('listId'))
    })

    this.getFiles();
  }

  private getFiles() {
    this.service.getFiles(this.listId.toString()).subscribe(
      data => {
        this.files = data;
      }
    );
  }

  public displayFileName(filepath: string): string {
    return filepath.substr(filepath.lastIndexOf("\\") +1)
  }

  public backToList() {
    this.router.navigate(['edit-list/' + this.listId.toString()]);
  }



  public downloadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showDownloadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showDownloadError = true;
        break;
    }
  }

  public uploadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        this.getFiles();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
  }
  public deleteStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        this.getFiles();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
  }

}
