import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthRoutsGuard } from './routes.guard';

describe('authRoutsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AuthRoutsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
