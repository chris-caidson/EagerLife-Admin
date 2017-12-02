import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpModule } from '@angular/http';
import { environment } from '../shared/environment';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabasePage } from '../pages/database/database';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utility } from '../shared/utility.service';
import { Firestore } from '../shared/firestore.service';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		DatabasePage,
		AboutPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule.enablePersistence()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		DatabasePage,
		AboutPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Utility,
		Firestore,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
