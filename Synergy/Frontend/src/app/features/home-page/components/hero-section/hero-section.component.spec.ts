import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';
import {HomePageModule} from "../../home-page.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router, RouterModule} from "@angular/router";
import {By} from "@angular/platform-browser";
import {NgxsModule, Store} from "@ngxs/store";
import {of} from "rxjs";

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSectionComponent],
      imports: [HomePageModule, HttpClientTestingModule, RouterModule.forRoot([]),
      NgxsModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct content depending on the role', () => {
    component.role = 'Manager';
    component.setHeroTitle();
    fixture.detectChanges();

    expect(component.heroTitle).toBe('Management, organised.');
  })

  it('should navigate to the correct route when button clicked', () => {
    component.role = 'Manager';
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('#dynamic-button'));

    button.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['register-team']);
  })
});
