import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  rForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      Amount: ['', Validators.required],
      Period: ['12 months'],
      Rate: ['15 %'],
      Capitalization: ['', Validators.required],
    });

  
  }

}
