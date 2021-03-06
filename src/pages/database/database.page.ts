import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utility } from '../../shared/utility.service';
import { DataService } from '../../shared/data.service';
import { DailyItem } from '../../model/daily-item.interface';
import { CalendarMonth } from '../../model/calendar-month.interface';

@Component({
	selector: 'page-database',
	templateUrl: 'database.page.html',
})
export class DatabasePage {
	contentType: string = "DailyCalm";
	month: number = 1;
	day: number = 1;
	dailyContentResult: DailyItem = null;
	hasRetrievedDailyContent: boolean;
	months: CalendarMonth[] = [];

	isGettingDailyContent: boolean;
	isSeedingDailyCalm: boolean;
	isSeedingDailyMotivation: boolean;
	isSeedingQuoteOfTheDay: boolean;
	isSeedingVisionBoard: boolean;

	currentYear: number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private dataService: DataService,
		private utility: Utility) {
		this.months.push(
			{ Index: 1, Name: 'January', TotalDays: 31 },
			{ Index: 2, Name: 'February', TotalDays: 29 },
			{ Index: 3, Name: 'March', TotalDays: 31 },
			{ Index: 4, Name: 'April', TotalDays: 30 },
			{ Index: 5, Name: 'May', TotalDays: 31 },
			{ Index: 6, Name: 'June', TotalDays: 30 },
			{ Index: 7, Name: 'July', TotalDays: 31 },
			{ Index: 8, Name: 'August', TotalDays: 31 },
			{ Index: 9, Name: 'September', TotalDays: 30 },
			{ Index: 10, Name: 'October', TotalDays: 31 },
			{ Index: 11, Name: 'November', TotalDays: 30 },
			{ Index: 12, Name: 'December', TotalDays: 31 });
	}

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

	async getDailyContent() {
		this.isGettingDailyContent = true;
		this.dailyContentResult = await this.dataService.getDailyData(this.contentType, this.month, this.day);
		this.isGettingDailyContent = false;
		this.hasRetrievedDailyContent = true;
	}
}
