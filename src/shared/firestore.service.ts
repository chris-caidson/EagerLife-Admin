import { Injectable, ErrorHandler } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DailyItem } from '../model/daily-item.interface';

@Injectable()
export class Firestore {
	dailyCalmCollection: AngularFirestoreCollection<DailyItem>;
	dailyMotivationCollection: AngularFirestoreCollection<DailyItem>;
	quoteOfTheDayCollection: AngularFirestoreCollection<DailyItem>;
	visionBoardCollection: AngularFirestoreCollection<DailyItem>;

	constructor(private http: Http, private afs: AngularFirestore) {
		this.dailyCalmCollection = this.afs.collection<DailyItem>('DailyCalm');
		this.dailyMotivationCollection = this.afs.collection<DailyItem>('DailyMotivation');
		this.quoteOfTheDayCollection = this.afs.collection<DailyItem>('QuoteOfTheDay');
		this.visionBoardCollection = this.afs.collection<DailyItem>('VisionBoard');
	}

	seedAllDailyData() {
		this.seedAllDailyCalmData();
		this.seedAllDailyMotivationData();
		this.seedAllQuoteOfTheDayData();
		this.seedAllVisionBoardData();
	}

	seedAllDailyCalmData() {
		this.seedDailyData('assets/data/daily-calm.json', this.dailyCalmCollection);
	}

	seedAllDailyMotivationData() {
		this.seedDailyData('assets/data/daily-motivation.json', this.dailyMotivationCollection);
	}

	seedAllQuoteOfTheDayData() {
		this.seedDailyData('assets/data/quote-of-the-day.json', this.quoteOfTheDayCollection);
	}

	seedAllVisionBoardData() {
		this.seedDailyData('assets/data/vision-board.json', this.visionBoardCollection);
	}

	private seedDailyData(jsonFile: string, collection: any) {
		this.http.get(jsonFile)
			.map(response => response.text())
			.subscribe(data => {
				var json = JSON.parse(data);

				for (let item of json) {
					collection.add(item);
				}
			});
	}
}