import { TestBed } from '@angular/core/testing';

import { IqacServiceService } from './iqac-service.service';

describe('IqacServiceService', () => {
  let service: IqacServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IqacServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
