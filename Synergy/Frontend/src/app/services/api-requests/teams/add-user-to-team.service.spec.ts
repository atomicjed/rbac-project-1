import { TestBed } from '@angular/core/testing';

import { AddUserToTeamService } from './add-user-to-team.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddUserToTeamService', () => {
  let service: AddUserToTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AddUserToTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
