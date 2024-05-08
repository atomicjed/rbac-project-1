import { TestBed } from '@angular/core/testing';

import { GetUserService } from './get-user.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule} from "@ngxs/store";

describe('GetUserPermissionsService', () => {
  let service: GetUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      NgxsModule.forRoot([])]
    });
    service = TestBed.inject(GetUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
