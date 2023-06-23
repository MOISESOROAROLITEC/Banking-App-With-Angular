import { TransactionStatusColorPipe } from './transaction-status-color.pipe';

describe('TransactionStatusColorPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionStatusColorPipe();
    expect(pipe).toBeTruthy();
  });
});
