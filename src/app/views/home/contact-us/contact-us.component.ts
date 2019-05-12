import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  rForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      Fullname: ['', Validators.required],
      Cellphone: ['', Validators.required],
      Email: ['', Validators.required],
      Message: ['', Validators.required],
    });
  }

  submit() {
    alert('hey')
  }

}
