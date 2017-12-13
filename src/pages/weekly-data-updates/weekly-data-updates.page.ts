import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utility } from '../../shared/utility.service';
import { DataService } from '../../shared/data.service';
import { DailyItem } from '../../model/daily-item.interface';
import { CalendarMonth } from '../../model/calendar-month.interface';

@Component({
	selector: 'page-weekly-data-updates',
	templateUrl: 'weekly-data-updates.page.html',
})
export class WeeklyDataUpdatesPage {
	contentType: string = "TheWeekAhead";
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
		private utility: Utility) { }

	ionViewDidLoad() {
		this.currentYear = this.utility.getCurrentYear();
	}
}
