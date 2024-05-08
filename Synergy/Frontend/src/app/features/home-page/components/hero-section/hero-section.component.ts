import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";
import {UserStateModel} from "../../../../store/states/user.state";

interface User {
  userId: string,
  role: string;
  permissions: string[]
}

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnDestroy {
  role: string = '';
  permissions: string[] = [];
  heroTitle: string = '';
  heroText: string = '';
  heroBtn: string = '';
  @Select((state: {user: UserStateModel}) => state.user.loggedInUser)
  user$! : Observable<User>;
  userSubscription = this.user$.subscribe(user => {
    this.role = user.role;
    this.permissions = user.permissions;
    this.setHeroTitle();
  })

  constructor(private router: Router) {
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  setHeroTitle() {
    switch (this.role) {
      case 'Manager':
        this.heroTitle = "Management, organised.";
        this.heroText = "Fitness, pre-season, social, more. Your team's culture starts with Synergy.";
        this.heroBtn = "Register a Team";
        break;
      case 'Player':
        this.heroTitle = "Player title";
        this.heroText = "Player text";
        this.heroBtn = "My Fitness Plans";
        break;
      case 'Personal Trainer':
        this.heroTitle = "Personal Trainer Title";
        this.heroText = "Personal trainer text";
        this.heroBtn = "My Players"
        break;
    }
  }

  navigateToTeamsPage() {
    this.router.navigate(['my-teams']).then()
  }
  onButtonClick() {
    switch (this.role) {
      case 'Manager':
        this.router.navigate(['register-team']).then()
        break;
      case 'Player':
        this.router.navigate(['fitness-plans']).then()
        break;
      case 'Personal Trainer':
        this.router.navigate(['my-players']).then()
        break;
    }
  }
}
