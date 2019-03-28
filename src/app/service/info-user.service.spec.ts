import { TestBed, inject } from '@angular/core/testing';

import { InfoUserService } from './info-user.service';

describe('InfoUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoUserService]
    });
  });

  it('should be created', inject([InfoUserService], (service: InfoUserService) => {
    expect(service).toBeTruthy();
  }));
});
