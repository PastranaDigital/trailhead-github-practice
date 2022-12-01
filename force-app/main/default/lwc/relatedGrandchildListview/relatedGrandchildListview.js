import { LightningElement, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getRelatedRecords from '@salesforce/apex/RelatedGCListviewController.getRelated';

export default class RelatedGrandchildListview extends LightningElement {
	@api recordId;
	records;
	error;

	connectedCallback() {
		this.getRecords();
	}

	getRecords() {
		getRelatedRecords ({ incomingId: this.recordId })
			.then((result) => {
				this.records = result;
				this.error = undefined;
				console.log('this.records: ', JSON.parse(JSON.stringify(this.records)));
			})
			.catch((error) => {
				this.error = error;
				this.records = undefined;
				console.log('error', this.error);
			});
	}
}