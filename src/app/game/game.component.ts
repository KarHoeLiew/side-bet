import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../shared/game.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
  GameListArray: any[];
  @Output() isLogout = new EventEmitter<void>();

  constructor(private gameService: GameService, public authService: AuthService) { }

  ngOnInit() {
    this.gameService.getGameList().snapshotChanges()
      .subscribe(item => {
        this.GameListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.GameListArray.push(x);
        });
        // sort array ischecked false -> true
        // this.GameListArray.sort((a, b) => {
        //   return a.isChecked - b.isChecked;
        // });
      });
  }

  onAdd(gameName, dateTime, wager) {
    this.gameService.addGame(gameName.value, dateTime.value, wager.value);
    gameName.value = null;
    dateTime.value = null;
    wager.value = "";
  }

  alterCheckAlvin($key: string, isChecked) {
    this.gameService.checkOrUncheckTitleAlvin($key, !isChecked);
  }
  
  alterCheckLaw($key: string, isChecked) {
    this.gameService.checkOrUncheckTitleLaw($key, !isChecked);
  }

  //not yet used
  onDelete($key: string) {
    this.gameService.removeGame($key);
  }

  logout(){
    this.authService.logout()
    this.isLogout.emit()
  }

}
