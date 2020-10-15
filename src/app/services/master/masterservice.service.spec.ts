import { TestBed, inject } from '@angular/core/testing';

import { MasterserviceService } from './masterservice.service';

describe('MasterserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterserviceService]
    });
  });

  it('should be created', inject([MasterserviceService], (service: MasterserviceService) => {
    expect(service).toBeTruthy();
  }));
});
