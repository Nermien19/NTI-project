import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminAuthGuard } from './admin-auth.guard';

describe('adminAuthGuard', () => {
  let executeGuard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    executeGuard = adminAuthGuard;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
