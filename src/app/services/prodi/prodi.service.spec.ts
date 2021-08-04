import { TestBed } from '@angular/core/testing';

import { ProdiService } from './prodi.service';

describe('ProdiService', () => {
  let service: ProdiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
