import { TestBed } from '@angular/core/testing';

import { EmployeeResolverService } from './employee-resolver.service';

describe('EmployeeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeResolverService = TestBed.get(EmployeeResolverService);
    expect(service).toBeTruthy();
  });
});
