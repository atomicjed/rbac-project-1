import { TestBed } from '@angular/core/testing';

import { GetTeamsService } from './get-teams.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule, Store} from "@ngxs/store";

describe('GetTeamsService', () => {
  let service: GetTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([])],
      providers: [Store]
    });
    service = TestBed.inject(GetTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
