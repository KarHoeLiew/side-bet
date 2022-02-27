import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'firebase-angular-auth';
  isSignedIn = false
  constructor(public firebaseService : AuthService){}
  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }
  async onSignup(email:string,password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password).catch(function(ex){
      console.log('wrong');
      alert('Wrong email or password!');
    });

    if(this.firebaseService.isLoggedIn) {
      this.isSignedIn = true
    }

  }

  handleLogout(){
    this.isSignedIn = false
  }

}