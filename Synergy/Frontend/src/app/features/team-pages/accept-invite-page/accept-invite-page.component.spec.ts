import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptInvitePageComponent } from './accept-invite-page.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AcceptInvitePageComponent', () => {
  let component: AcceptInvitePageComponent;
  let fixture: ComponentFixture<AcceptInvitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptInvitePageComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptInvitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
