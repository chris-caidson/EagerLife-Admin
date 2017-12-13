import { Injectable, ErrorHandler } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { DailyItem } from '../model/daily-item.interface';

@Injectable()
export class DataService {

	constructor(private http: Http, private app: FirebaseApp) { }

	public getDailyData(contentType: string, month: number, day: number): Promise<DailyItem> {
		return new Promise((resolve, reject) => {
			this.app.firestore()
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

	public updateDailyData(contentType: string, dailyItem: DailyItem): Promise<DailyItem> {
		return new Promise((resolve, reject) => {
			this.app.firestore()
				.collection(contentType)
				.doc(dailyItem.Id)
				.update({
					Month: +dailyItem.Month,
					Day: +dailyItem.Day,
					Hour: +dailyItem.Hour,
					Minute: +dailyItem.Minute,
					Text: dailyItem.Text
				})
				.then(() => resolve(dailyItem))
				.catch(error => reject(error));
		})
	}

	public getImage(contentType: string, imageId: string): Promise<string> {
		return new Promise((resolve, reject) => {
			var img = this.app.storage().ref().child(`${contentType}/${imageId}.jpg`);

			try {
				img.getDownloadURL()
					.then(value => resolve(value))
					.catch(error => reject(error));
			}
			catch (error) {
				resolve(null);
			}
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
						this.app.firestore().collection(collectionName).doc(item.Id).set(item);
					}
				},
				error => { reject(error); },
				() => { resolve(); })
		});
	}
}