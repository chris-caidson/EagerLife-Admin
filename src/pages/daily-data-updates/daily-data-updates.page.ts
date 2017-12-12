import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utility } from '../../shared/utility.service';
import { DataService } from '../../shared/data.service';
import { DailyItem } from '../../model/daily-item.interface';
import { CalendarMonth } from '../../model/calendar-month.interface';

@Component({
	selector: 'page-daily-data-updates',
	templateUrl: 'daily-data-updates.page.html',
})
export class DailyDataUpdatesPage {
	contentType: string = "DailyCalm";
	month: number = 1;
	day: number = 1;
	dailyContentResult: DailyItem = null;
	hasRetrievedDailyContent: boolean;
	months: CalendarMonth[] = [];
	isGettingDailyContent: boolean;
	isUpdatingDailyContent: boolean;
	currentYear: number;
	imageUrl: string;

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

	async getDailyContent() {
		this.isGettingDailyContent = true;
		this.dailyContentResult = await this.dataService.getDailyData(this.contentType, this.month, this.day);
		this.imageUrl = await this.dataService.getImage(this.contentType, this.dailyContentResult.Id);
		this.isGettingDailyContent = false;
		this.hasRetrievedDailyContent = true;
	}

	async updateDailyContent() {
		this.isUpdatingDailyContent = true;
		await this.dataService.updateDailyData(this.contentType, this.dailyContentResult);
		this.isUpdatingDailyContent = false;
	}
}
