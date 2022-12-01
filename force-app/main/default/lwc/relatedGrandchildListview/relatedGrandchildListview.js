import { LightningElement, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getRelatedRecords from '@salesforce/apex/RelatedGCListviewController.getRelatedAddendums';

export default class RelatedGrandchildListview extends LightningElement {
	@api recordId;
	limitForRecords = 3;
	records;
	error;
	componentTitle = 'Addendums (0)';
	URL = '/';

	connectedCallback() {
		this.getRecords();
	}

	getRecords() {
		getRelatedRecords ({ incomingId: this.recordId })
			.then((result) => {
				this.records = result;
				let updatedRecords = [];
				this.records.forEach(record => {
					let recordData = record;
					//? modifications to the object
					recordData.addendumURL = this.URL + record.Id;
					recordData.parentURL = this.URL + record.Note__c;

					updatedRecords.push(recordData);
				});
				this.records = updatedRecords.slice(0, this.limitForRecords);
				let recordCount = updatedRecords.length > 3 ? '3+' : updatedRecords.length;
				this.componentTitle = this.componentTitle.replace('0', recordCount);
				this.error = undefined;
				console.log('this.records: ', JSON.parse(JSON.stringify(this.records)));
			})
			.catch((error) => {
				this.error = error;
				this.records = undefined;
				console.error('ERROR: ', this.error.message);
			});
	}
}