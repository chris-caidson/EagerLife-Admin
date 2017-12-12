import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utility } from '../../shared/utility.service';
import { DataService } from '../../shared/data.service';
import { DailyItem } from '../../model/daily-item.interface';
import { CalendarMonth } from '../../model/calendar-month.interface';

@Component({
	selector: 'page-daily-data-seeding',
	templateUrl: 'daily-data-seeding.page.html',
})
export class DailyDataSeedingPage {
	
	isSeedingDailyCalm: boolean;
	isSeedingDailyMotivation: boolean;
	isSeedingQuoteOfTheDay: boolean;
	isSeedingVisionBoard: boolean;

	currentYear: number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private dataService: DataService,
		private utility: Utility) {	}

	ionViewDidLoad() {
		this.currentYear = this.utility.getCurrentYear();
	}

	async seedDailyCalm() {
		this.isSeedingDailyCalm = true;
		await this.dataService.seedDailyCalm();
		this.isSeedingDailyCalm = false;
	}

	async seedDailyMotivation() {
		this.isSeedingDailyMotivation = true;
		await this.dataService.seedDailyMotivation();
		this.isSeedingDailyMotivation = false;
	}

	async seedQuoteOfTheDay() {
		this.isSeedingQuoteOfTheDay = true;
		await this.dataService.seedQuoteOfTheDay();
		this.isSeedingQuoteOfTheDay = false;
	}

	async seedVisionBoard() {
		this.isSeedingVisionBoard = true;
		await this.dataService.seedVisionBoard();
		this.isSeedingVisionBoard = false;
	}
}
