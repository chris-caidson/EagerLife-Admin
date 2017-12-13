import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { DailyDataSeedingPage } from '../pages/daily-data-seeding/daily-data-seeding.page';
import { DailyDataUpdatesPage } from '../pages/daily-data-updates/daily-data-updates.page';
import { WeeklyDataUpdatesPage } from '../pages/weekly-data-updates/weekly-data-updates.page';
import { AboutPage } from '../pages/about/about.page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utility } from '../shared/utility.service';
import { DataService } from '../shared/data.service';

const firebaseConfig = {
	production: false,
	firebase: {
		apiKey: "AIzaSyBM-Cr1zQ6ZcFvlq1FCP8LDAQWrRZLfOJk",
		authDomain: "eager-life.firebaseapp.com",
		databaseURL: "https://eager-life.firebaseio.com",
		projectId: "eager-life",
		storageBucket: "gs://eager-life.appspot.com",
		messagingSenderId: "21340103556"
	}
};

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		DailyDataSeedingPage,
		DailyDataUpdatesPage,
		WeeklyDataUpdatesPage,
		AboutPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig.firebase),
		AngularFirestoreModule.enablePersistence()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		DailyDataSeedingPage,
		DailyDataUpdatesPage,
		WeeklyDataUpdatesPage,
		AboutPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Utility,
		DataService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
