import { TestBed } from '@angular/core/testing';

import { RegisterTeamService } from './register-team.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RegisterTeamService', () => {
  let service: RegisterTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RegisterTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
