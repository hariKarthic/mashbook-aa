import { TestBed, inject } from '@angular/core/testing';

import { IsmobileService } from './ismobile.service';

describe('IsmobileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsmobileService]
    });
  });

  it('should ...', inject([IsmobileService], (service: IsmobileService) => {
    expect(service).toBeTruthy();
  }));
});
