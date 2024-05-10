import {Component, OnDestroy} from '@angular/core';
import {FirebaseAuthService} from "./services/auth/firebase-auth.service";
import {GetUserService} from "./services/api-requests/users/get-user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  userSubscription: Subscription = null!;
  constructor(private firebaseAuthService: FirebaseAuthService, private getUserService: GetUserService) {
    this.userSubscription = this.firebaseAuthService.currentUser$.subscribe(user => {
      if(user)
        this.getUserService.getUserAndUpdateStore(user.uid).subscribe();
    })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
