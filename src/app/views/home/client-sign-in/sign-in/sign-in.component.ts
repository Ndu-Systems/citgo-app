import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExitModalEventEmmiter } from 'src/app/models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() closeSigninModalAction: EventEmitter<ExitModalEventEmmiter> = new EventEmitter();
  rForm: FormGroup;
  loading = false;
  error = ''; // TODO : Authentication Service
  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
  ) {
    this.rForm = this.fb.group({
      Email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      Password: [null, Validators.required]
    });
  }

  ngOnInit() {
  }
  closeModal() {
    this.closeSigninModalAction.emit({
      close: true
    });
  }

  // convinient for easy form(rForm) data access
  get f() { return this.rForm.controls; }

  signIn() {
    this.loading = true;
    this.routeTo.navigate(['dashboard']);    
  }

}
