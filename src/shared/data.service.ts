import { Injectable, ErrorHandler } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DailyItem } from '../model/daily-item.interface';
import { firestore } from 'firebase/app';

@Injectable()
export class DataService {

	constructor(private http: Http, private afs: AngularFirestore) { }

	public getDailyData(contentType: string, month: number, day: number): Promise<DailyItem> {
		// firestore()
		// 	.collection(contentType)
		// 	.where("Month", "==", +month)
		// 	.where("Day", "==", +day)
		// 	.get()
		// 	.then(querySnapshot => {
		// 		if (querySnapshot.size > 0) {
		// 			return querySnapshot.docs[0].data() as DailyItem;
		// 		}
		// 		else {
		// 			return null;
		// 		}
		// 	})
		// 	.catch(error => console.log(error));

		// return null;

		return new Promise((resolve, reject) => {
			firestore()
				.collection(contentType)
				.where("Month", "==", +month)
				.where("Day", "==", +day)
				.get()
				.then(snapshot => {
					resolve(snapshot.size > 0 ? snapshot.docs[0].data() as DailyItem : null)
				})
				.catch(error => reject(error));
		});
	}

	public seedDailyCalm(): Promise<void> {
		return this.seedDailyData('DailyCalm', 'assets/data/daily-calm.json');
	}

	public seedDailyMotivation(): Promise<void> {
		return this.seedDailyData('DailyMotivation', 'assets/data/daily-motivation.json');
	}

	public seedQuoteOfTheDay(): Promise<void> {
		return this.seedDailyData('QuoteOfTheDay', 'assets/data/quote-of-the-day.json');
	}

	public seedVisionBoard(): Promise<void> {
		return this.seedDailyData('VisionBoard', 'assets/data/vision-board.json');
	}

	private seedDailyData(collectionName: string, jsonFile: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.http
				.get(jsonFile)
				.map(response => response.json())
				.subscribe(
				data => {
					for (let item of data) {
						console.log(`Creating ${collectionName} document with Id = ${item.Id}...`);
						firestore().collection(collectionName).doc(item.Id).set(item);
					}
				},
				error => { reject(error); },
				() => { resolve(); })
		});
	}
}