import { TestBed } from '@angular/core/testing';

import { DepartmentResolverService } from './department-resolver.service';

describe('DepartmentResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentResolverService = TestBed.get(DepartmentResolverService);
    expect(service).toBeTruthy();
  });
});
