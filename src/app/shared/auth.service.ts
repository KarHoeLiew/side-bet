import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;

  constructor(public firebaseAuth : AngularFireAuth, private firebasedb: AngularFireDatabase) { }

  async signin(email: string, password : string){
    await this.firebaseAuth.auth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  
  async signup(email: string, password : string){
    await this.firebaseAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      const user = this.firebaseAuth.auth.currentUser;
      if (user) {
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user));
        console.log('res', user.uid);
        this.firebasedb.list('users').push(
          {
            id: user.uid,
            name: user.email,
            coins: 0,
            status: 1
          }
        );

      } else {
        // No user is signed in.
        alert("User not signed in yet")
      }
    });

  }

  logout(){
    this.firebaseAuth.auth.signOut()
    localStorage.removeItem('user')
  }



}