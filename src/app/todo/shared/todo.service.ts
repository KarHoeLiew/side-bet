import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  gameList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getGameList() {
    this.gameList = this.firebasedb.list('games');
    return this.gameList;
  }

  
  addGame(gameName: string, dateTime: string, wager: string) {
    this.gameList.push({
      gameName: gameName,
      dateTime: dateTime,
      wager: wager,
      winner: "",
      status: 1
    });
  }


  checkOrUncheckTitleAlvin($key: string, flag: boolean) {
    this.gameList.update($key, { alvinIsWon: flag });
  }

  checkOrUncheckTitleLaw($key: string, flag: boolean) {
    this.gameList.update($key, { lawIsWon: flag });
  }

  //not in used
  removeGame($key: string) {
    this.gameList.remove($key);
  }

}
