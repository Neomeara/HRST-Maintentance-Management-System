import { TestBed } from '@angular/core/testing';

import { MaintenanceListService } from './maintenance-list.service';

describe('MaintenanceListService', () => {
  let service: MaintenanceListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
