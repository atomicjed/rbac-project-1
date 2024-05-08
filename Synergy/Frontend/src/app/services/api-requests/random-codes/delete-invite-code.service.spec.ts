import { TestBed } from '@angular/core/testing';

import { DeleteInviteCodeService } from './delete-invite-code.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DeleteInviteCodeService', () => {
  let service: DeleteInviteCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DeleteInviteCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
