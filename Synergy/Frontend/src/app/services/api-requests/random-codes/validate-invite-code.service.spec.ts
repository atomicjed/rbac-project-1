import { TestBed } from '@angular/core/testing';

import { ValidateInviteCodeService } from './validate-invite-code.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ValidateInviteCodeService', () => {
  let service: ValidateInviteCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ValidateInviteCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
