import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { a } from "@angular/core/src/render3";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.scss"]
})
export class CalculatorComponent implements OnInit {
  rForm: FormGroup;
  data: any;
  explainContract = "";
  currency:'R';
  profits: number[] = [65, 59, 80, 81, 56, 55, 40];
  widrawalDay: any='Date not set';
  total: number=0;
  profit: any=0;
  widrawalDayAmount: number;
  constructor(private fb: FormBuilder) {
    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Your shares",
          data: this.profits,
          fill: true,
          borderColor: "#440082"
        }
      ]
    };
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      Amount: ["", Validators.required],
      Period: ["12 months"],
      Rate: ["15 %"],
      Capitalization: ["", Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
      let capitalization = Number(data.Capitalization);
      let amount = data.Amount;
      var today = new Date();

      if (capitalization > 0) {
        //contact
        this.explainContract =
          "Your shares will increase with 15% Compounded  Monthly";
        var widrawDate = new Date(
          today.setMonth(today.getMonth() + capitalization)
        );
        this.widrawalDay = `${this.formatDate(widrawDate)}`;
        this.getCompoundGrowth(amount, capitalization);
      } else {
        // month ro month
        this.explainContract =
          "Only your share value  will increase with 15% Monthly, No compond amount aligable,";
        var widrawDate = new Date(today.setMonth(today.getMonth() + 1));
        this.widrawalDay = `${this.formatDate(widrawDate)}`;
        this.geFlatGrowth(amount);
      }
    });
  }
  formatDate(date: Date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return (
      date.getDay() +
      " " +
      monthNames[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  }
  getCompoundGrowth(amount: number, months: number) {
    if (!amount || !months) return false;
     this.total = amount;
    for (let i = 0; i <= 12; i++) {
    // for (let i = 0; i <= months; i++) {
      this.total += this.total*.15;
      if(i===months){
        this.widrawalDayAmount = Math.abs(amount-this.total);
      }
    }
    this.profit = Math.abs(amount-this.total);
  }
  geFlatGrowth(amount: number) {
    if (!amount) return false;
    this.total = amount;
   for (let i = 0; i <= 12; i++) {
   // for (let i = 0; i <= months; i++) {
     this.total += amount*.15;
     if(i===1){
       this.widrawalDayAmount = Math.abs(amount-this.total);
     }
   }
   this.profit = Math.abs(amount-this.total);
  }
}
