import { Injectable } from '@angular/core';

@Injectable()
export class Utility {

	constructor() { }

	getCurrentYear() {
		return (new Date()).getFullYear();
	}
}