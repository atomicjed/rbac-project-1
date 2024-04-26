import { TestBed } from '@angular/core/testing';

import { GetUserPermissionsService } from './get-user-permissions.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GetUserPermissionsService', () => {
  let service: GetUserPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetUserPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
