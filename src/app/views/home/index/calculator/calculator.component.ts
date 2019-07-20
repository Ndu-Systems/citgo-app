import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.scss"]
})
export class CalculatorComponent implements OnInit {
  rForm: FormGroup;
  data: any;
  explainContract =
    "Your shares will increase with the fixed interest rate of 15% monthly";
  currency: "R";
  profits: number[] = [];
  widrawalDay: any = "Date not set";
  total: number = 0;
  profit: any = 0;
  error:string=''
  widrawalDayAmount: number;
  today: Date = new Date();
  loading=false;
  monthNames = [
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
  maturityDate: Date;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.rForm = this.fb.group({
      Amount: ["", [
        Validators.required,
        Validators.min(5000),
        Validators.max(200000)
      ]],
      Period: ["12 months"],
      Rate: ["15 %"],
      Capitalization: [12, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
 
      let capitalization = Number(data.Capitalization);
      let amount = data.Amount;


      if (amount >= 5000 && amount <=200000) {
        this.maturityDate =  new Date(new Date().setFullYear(new Date().getFullYear() + 1))

        this.geFlatGrowth(amount);

      } 
      //load form
      let months: string[] = this.get12Months();
      this.data = {
        labels: months,
        datasets: [
          {
            label: "Your shares",
            data: this.profits,
            fill: true,
            borderColor: "#440082"
          }
        ]
      };
    });
  }
  get12Months(): string[] {
    let months = [];
    let thisMonthIndex = this.today.getMonth();
  
    for (let i =thisMonthIndex ; i < 12; i++) {
      months.push(this.monthNames[i]);
    }
    
    for (let i =0 ; i < thisMonthIndex; i++) {
      months.push(this.monthNames[i]);
    }

    return months;
  }
  formatDate(date: Date) {
    return (
      date.getDay() +
      " " +
      this.monthNames[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  }
  getCompoundGrowth(amount: number, months: number) {
    this.profits = [];

    if (!amount || !months) return false;
    this.total = amount;
    for (let i = 0; i < 12; i++) {
      this.total += this.total * 0.15;
      if (i === months) {
        this.widrawalDayAmount = Math.abs(amount - this.total);
      }
      this.profits.push(Math.round(this.total));
    }
    if(months == 12){
      this.widrawalDayAmount = Math.abs(amount - this.total);

    }
    this.profit = Math.abs(amount - this.total);
 
  }
  geFlatGrowth(amount: number) {
    this.profits = [];
    if (!amount) return false;
    this.total = amount;
    for (let i = 0; i < 12; i++) {
      this.total += amount * 0.15;
      this.profits.push(Math.round(this.total));

      if (i === 0) {
        this.widrawalDayAmount = Math.abs(amount - this.total);
      }
    }
    this.profit = Math.abs(amount - this.total);
  }
  buy(data){ 
    
  }

}
