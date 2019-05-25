import { DocumentsService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  file: File;
  message: string;

  constructor(private documentsService:DocumentsService) { }

  ngOnInit() {
  }
  filesChanged(files) {
    this.file = <File>files[0];
    console.log(this.file);
    
  }
  uplaodFile() {
    if (!this.file) {
      this.message = "Please select the files!";
      return false;
    }
    this.documentsService.uploadFile(this.file).subscribe(response => {
     alert(response);
    });
  }
}
