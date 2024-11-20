import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teamSelectedGuard } from './team-selected.guard';

describe('teamSelectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teamSelectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
