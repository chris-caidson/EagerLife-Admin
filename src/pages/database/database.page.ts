import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Utility } from '../../shared/utility.service';
import { DataService } from '../../shared/data.service';

@Component({
	selector: 'page-database',
	templateUrl: 'database.page.html',
})
export class DatabasePage {

	currentYear: number;

	isSeedingDailyCalm: boolean;
	isSeedingDailyMotivation: boolean;
	isSeedingQuoteOfTheDay: boolean;
	isSeedingVisionBoard: boolean;

	private timeDelay: number = 3000;


	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private utility: Utility,
		private dataService: DataService) {
	}

	ionViewDidLoad() {
		this.currentYear = this.utility.getCurrentYear();
	}

	seedAllDailyCalmData() {
		this.isSeedingDailyCalm = true;
		this.dataService.seedAllDailyCalmData(() => this.isSeedingDailyCalm = false);		
	}

	seedAllDailyMotivationData() {
		this.isSeedingDailyMotivation = true;
		this.dataService.seedAllDailyMotivationData(() => this.isSeedingDailyMotivation = false);		
	}

	seedAllQuoteOfTheDayData() {
		this.isSeedingQuoteOfTheDay = true;
		this.dataService.seedAllQuoteOfTheDayData(() => this.isSeedingQuoteOfTheDay = false);		
	}

	seedAllVisionBoardData() {
		this.isSeedingVisionBoard = true;
		this.dataService.seedAllVisionBoardData(() => this.isSeedingVisionBoard = false);		
	}
}
