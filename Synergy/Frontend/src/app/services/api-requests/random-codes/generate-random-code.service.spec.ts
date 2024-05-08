import { TestBed } from '@angular/core/testing';

import { GenerateRandomCodeService } from './generate-random-code.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GenerateRandomCodeService', () => {
  let service: GenerateRandomCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GenerateRandomCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
