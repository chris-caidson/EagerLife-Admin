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

	private batchSize: number = 100;

	constructor(private http: Http, private afs: AngularFirestore) {

	}

	public seedAllDailyCalmData(callback: Function) {
		this.deleteCollection('DailyCalm', () => this.seedDailyData('assets/data/daily-calm.json', 'DailyCalm', callback));
	}

	public seedAllDailyMotivationData(callback: Function) {
		this.deleteCollection('DailyMotivation', () => this.seedDailyData('assets/data/daily-motivation.json', 'DailyMotivation', callback));
	}

	public seedAllQuoteOfTheDayData(callback: Function) {
		this.deleteCollection('QuoteOfTheDay', () => this.seedDailyData('assets/data/quote-of-the-day.json', 'QuoteOfTheDay', callback));
	}

	public seedAllVisionBoardData(callback: Function) {
		this.deleteCollection('VisionBoard', () => this.seedDailyData('assets/data/vision-board.json', 'VisionBoard', callback));
	}

	private seedDailyData(jsonFile: string, collectionName: string, callback: Function) {
		this.http.get(jsonFile)
			.map(response => response.json())
			.subscribe(
			data => {
				for (let item of data) {
					console.log('Creating ' + collectionName + ' document with Id = ' + item.Id + '...');
					firestore().collection(collectionName).doc(item.Id).set(item);
				}
			},
			error => {
				console.log(error);
			},
			() => {
				callback();
			});
	}

	private deleteCollection(collectionName: string, callback: Function) {
		firestore().collection(collectionName).get()
			.then(fullSnapshot => {
				if (!fullSnapshot || fullSnapshot.size == 0) {
					console.log('Finished deleting the ' + collectionName + ' collection.');
					callback();
					return;
				}

				firestore().collection(collectionName).orderBy("Id").limit(this.batchSize).get()
					.then(snapshot => {
						var batch = firestore().batch();

						snapshot.docs.forEach(function (doc) {
							console.log('Deleting ' + collectionName + ' document with Id = ' + doc.id + '...');
							batch.delete(doc.ref);
						})

						batch.commit();
						this.deleteCollection(collectionName, callback)
					}, reason => console.log("Inner failure reason: " + reason));
			},
			reason => console.log("Outer failure reason: " + reason));
	}
}