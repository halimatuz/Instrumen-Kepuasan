import { TestBed } from '@angular/core/testing';

import { FakultasService } from './fakultas.service';

describe('FakultasService', () => {
  let service: FakultasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakultasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
