import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    var config = {
      apiKey: 'AIzaSyAo2DVcrZx7zezGy6p_FgSvbFlFvs1_8Jk',
      authDomain: 'logofposts.firebaseapp.com',
      databaseURL: 'https://blogofposts.firebaseio.com',
      projectId: 'blogofposts',
      storageBucket: 'blogofposts.appspot.com',
      messagingSenderId: '142320614625'
    };
    firebase.initializeApp(config);
  }
}
