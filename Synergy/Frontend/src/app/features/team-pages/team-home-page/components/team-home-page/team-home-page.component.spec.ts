import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamHomePageComponent } from './team-home-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule, Store} from "@ngxs/store";

describe('TeamHomePageComponent', () => {
  let component: TeamHomePageComponent;
  let fixture: ComponentFixture<TeamHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamHomePageComponent],
      imports: [HttpClientTestingModule, NgxsModule.forRoot([])],
      providers: [Store]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
