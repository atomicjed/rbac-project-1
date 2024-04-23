import { TestBed } from '@angular/core/testing';

import { AddUserService } from './add-user.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddUserService', () => {
  let service: AddUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AddUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
