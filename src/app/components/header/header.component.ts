import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';

@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router,private pp:PassUploadedDataService) { }

  ngOnInit() {
  }

  onFileUpload(event) {
    let inputElem = event.currentTarget;
    if (inputElem.files && inputElem.files[0]) {

      let reader = new FileReader();
      reader.onload = (e) => {
        this.router.navigate(['/upload']);
      }
      reader.readAsDataURL(inputElem.files[0]);
    }
  }
}
