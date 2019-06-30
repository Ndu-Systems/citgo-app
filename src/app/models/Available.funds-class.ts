import { Clientwithdrawals } from "./client.withdrawals.model";
import { Bonus } from "./bonus.model";
import { Investment } from "./Investment.model";

export class AvailableFunds {
  investments: Investment[] = [];
  bonuses: Bonus[];
  clientwithdrawals: Clientwithdrawals[];
  amountRequested: number;
  myBalance = new MyBalance();
  constructor(
    investments: Investment[],
    bonuses: Bonus[],
    clientwithdrawals: Clientwithdrawals[],
    amountRequested: number
  ) {
    this.investments = investments;
    this.bonuses = bonuses;
    this.clientwithdrawals = clientwithdrawals;
    this.amountRequested = amountRequested;

    //proccess
    this.getAllBonusAmount();
    this.getAllProfitAmount();
    this.withdraw();
  }

  getAllBonusAmount() {
    debugger
    let sum: number = 0;
    this.bonuses.forEach(bonus => {
      let sum_single_withdrawn: number = 0;
      let checkIfbonuswithdrawn: Clientwithdrawals[] = this.clientwithdrawals.filter(
        val => val.SourceBonusId == bonus.bonusId
      );
      if (checkIfbonuswithdrawn.length > 0) {
        // means the bonus was withdrawn
        checkIfbonuswithdrawn.forEach(val => {
          sum_single_withdrawn += Number(val.Amount);
        });
      }

      if (bonus.Amount <= sum_single_withdrawn) {
        // update that bonus to status withdrwann = 10
        bonus.StatusId = 10;
        this.myBalance.withdrawnBonues.push(bonus);
      } else {
        sum += Number(bonus.Amount) - sum_single_withdrawn;
        this.myBalance.bonusWithdrawn += sum_single_withdrawn;
      }
    });

    this.myBalance.bonuses = sum;
    this.myBalance.bonusWithdrawable =
      this.myBalance.bonuses - this.myBalance.bonusWithdrawn;
  }

  getAllProfitAmount() {
    debugger
    let sum: number = 0;
    let sum_withdrawn: number = 0;

    this.investments.forEach(share => {
      sum += share.Growth;
      let checkIfProfitWithdrawn: Clientwithdrawals[] = this.clientwithdrawals.filter(
        val => val.SourceInvestmentId == share.InvestmentId
      );
      if (checkIfProfitWithdrawn.length > 0) {
        // means the bonus was withdrawn
        checkIfProfitWithdrawn.forEach(val => {
          sum_withdrawn += Number(val.Amount);
        });
      }
    });

    this.myBalance.profit = sum;
    this.myBalance.profitWithdrawn = sum_withdrawn;
    this.myBalance.bonusWithdrawable = sum - sum_withdrawn;
    this.myBalance.bonuses - this.myBalance.bonusWithdrawn;
  }

  withdraw() {
    let amount = 0;

    //can I get all my money from my bonuses only
    if (this.amountRequested <= this.myBalance.bonusWithdrawable) {
      let activeBonus: Bonus[] = this.bonuses.filter(x => x.StatusId != 10);
      let i = 0;
      while (amount < this.amountRequested) {
        amount += Number(activeBonus[i].Amount) - amount;
        activeBonus[i].Amount = Number(activeBonus[i].Amount) - amount;
        this.myBalance.sourceAmounts.push({
          SourceBonusId: activeBonus[i].bonusId,
          Amount: Number(activeBonus[i].Amount),
          ClientId: activeBonus[i].ClientId
        });
        i++;
      }
    }

    //let get bonuses and shares(profit)
    else {
      if (this.myBalance.bonusWithdrawable > 0) {
        let activeBonus: Bonus[] = this.bonuses.filter(x => x.StatusId != 10);

        activeBonus.forEach(bonus => {
          amount += Number(bonus.Amount);
          this.myBalance.sourceAmounts.push({
            SourceBonusId: bonus.bonusId,
            Amount: Number(bonus.Amount),
            ClientId: bonus.ClientId
          });
        });
      }

      //add from profit too
      if (amount < this.amountRequested) {
        this.investments.forEach(share => {
          amount += Number(share.Growth) - amount;
          this.myBalance.sourceAmounts.push({
            SourceBonusId: share.InvestmentId,
            Amount: Number(share.Amount),
            ClientId: share.ClientId
          });
        });
      }
    }
    this.myBalance.amoutToWithdraw = amount;
  }
  public  get():MyBalance {
    return this.myBalance;
  }
}

/*

User request to withdraw R1500

-------------USER BALANCE ---------------
bonus 1 = 1000   ---- remaining = 500  
bonus 2 = 1000
bonus 3 = 1000


---shares profit------------
share 1  (3 mnts )5000  sum[750,750,750]= 2250  
but mnt1 withdrawn 750 = balence = 1500

share2 (2 mnt) 500 sum[750,750] = 1500

Total Shares = 2250 + 1500 =  3750
*/

// let define the interface that will hold the balances
export class MyBalance {
  bonuses?: number = 0; // all bonues =3000
  withdrawnBonues?: Bonus[] = []; // all items to update to status 10
  bonusWithdrawable?: number = 0; //2500 =   3000 - 500 from bonus 1
  bonusWithdrawn?: number = 0; // total bonus withdrawn  500

  profit?: number = 0; // all profit made = 3750
  profitWithdrawable?: number = 0; //  3750 -  750 = 3000
  profitWithdrawn?: number = 0; // total profit withdrawn  750

  totalWithdrawn?: number = 0; // 750 +500 =  1250 to the client so far;
  sourceAmounts?: Clientwithdrawals[] = []; // 750 +500 =  1250 to the client so far;
  amoutToWithdraw?: any = 0;
}
