import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'LeagueRoulette';

  playersArr: FormArray = new FormArray([]);

  players = [{
    name: "Ramzar",
    order: ["Top", "Jungle", "Mid", "Bottom", "Supp"]
  },
  {
    name: "PartMan",
    order: ["Top", "Jungle", "Mid", "Bottom", "Supp"]
  }];

  ngOnInit(): void {
    this.addPlayer();
    console.log((this.playersArr.controls[0] as FormGroup).controls["name"].value);
  }

  addPlayer(): void {
    let newPlayer = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
    this.playersArr.push(newPlayer);
  }

  calculateRoles(): void {
    let roles = ["Top", "Jungle", "Mid", "Bottom", "Supp"];

    this.players = [];
    for (let group of this.playersArr.controls) {
      let player = {
        name: (group as FormGroup).controls["name"].value,
        order: []
      };
      
      this.players.push(player);
    }

    let runs = 0;

    while (runs < roles.length) {
      let orderOk = true;
      let tempRoles = [...roles];
      
      for (let j = 0; j < 100; j++) {
        let index1 = Math.floor(Math.random() * tempRoles.length);
        let index2 = Math.floor(Math.random() * tempRoles.length);

        if (index1 === index2) { continue; }

        let tempRole = tempRoles[index1];
        tempRoles[index1] = tempRoles[index2];
        tempRoles[index2] = tempRole;
      }

      for (let j = 0; j < this.players.length; j++) {
          if (this.players[j].order.includes(tempRoles[j])) { orderOk = false; }
      }
  
      if (orderOk) {
          for (let j = 0; j < this.players.length; j++) {
            this.players[j].order.push(tempRoles[j]);
          }
          runs++;
          console.log(runs);
      }
    }
  }
}
