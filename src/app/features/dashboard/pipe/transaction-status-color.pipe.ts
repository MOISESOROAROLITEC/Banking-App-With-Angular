import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionStatusColor'
})
export class TransactionStatusColorPipe implements PipeTransform {

  transform(status: string): string {
    let className: string
    switch (status) {
      case "Accepté":
        className = "transaction-approuved"
        break;
      case "Rejeté":
        className = "transaction-rejected"
        break;
      default:
        className = "transaction-processing"
        break;
    }
    return "transaction-status " + className
  }

}
