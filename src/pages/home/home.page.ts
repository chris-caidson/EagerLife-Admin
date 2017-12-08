import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Utility } from '../../shared/utility.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.page.html'
})
export class HomePage {

	currentYear: number;

	constructor(public navCtrl: NavController, private utility: Utility) {

	}

	ionViewDidLoad() {
		this.currentYear = this.utility.getCurrentYear();
	}
}
