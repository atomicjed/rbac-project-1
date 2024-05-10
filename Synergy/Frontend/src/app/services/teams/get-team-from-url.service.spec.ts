import { TestBed } from '@angular/core/testing';

import { GetTeamFromUrlService } from './get-team-from-url.service';
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('GetTeamFromUrlService', () => {
  let service: GetTeamFromUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])]
    });
    service = TestBed.inject(GetTeamFromUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
