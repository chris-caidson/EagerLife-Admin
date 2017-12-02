import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Utility } from '../../shared/utility.service';
import { Firestore } from '../../shared/firestore.service';

@Component({
	selector: 'page-database',
	templateUrl: 'database.html',
})
export class DatabasePage {

	currentYear: number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private utility: Utility,
		private firestore: Firestore) {
	}

	ionViewDidLoad() {
		this.currentYear = this.utility.getCurrentYear();
	}
}
