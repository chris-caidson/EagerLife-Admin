import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Utility } from '../../shared/utility.service';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html',
})
export class AboutPage {

	currentYear: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, private utility: Utility) {
	}

	ionViewDidLoad() {
		this.currentYear = this.utility.getCurrentYear();
	}
}
