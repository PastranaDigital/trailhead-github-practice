import { LightningElement, api } from 'lwc';
// import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//? Apex class that is called
import getRelatedRecords from '@salesforce/apex/RelatedGCListviewController.getRelatedAddendums';

export default class RelatedGrandchildListview extends LightningElement {
	@api recordId;  //? native Salesforce functionality that gives us the recordId of the current page
	limitForRecords = 3;
	records;  //? list of results
	error;  //? allows us to toggle the error state of the component
	componentTitle = 'Addendums (0)'; //? will later be updated to show the correct number of results
	URL = '/';

	//? lifecycle method of the LWC component that is called only once at the beginning
	connectedCallback() {
		this.getRecords();
	}

	//? Houses all the setup work that needs to be done at the beginning of the component
	getRecords() {
		//? Calling Apex Imperatively & sending in the recordId
		getRelatedRecords ({ incomingId: this.recordId })
			.then((result) => {
				this.records = result;
				let updatedRecords = [];
				//? iterate over the list of records (Array of Objects)
				this.records.forEach(record => {
					let recordData = record;
					//? modifications to the record & adding anything that is needed
					recordData.addendumURL = this.URL + record.Id;
					recordData.parentURL = this.URL + record.Note__c;

					//? add this record to the list of all the updated records
					updatedRecords.push(recordData);
				});
				//? records to display are going to be only the first few
				this.records = updatedRecords.slice(0, this.limitForRecords);

				//? changes the number in the title based on the limitForRecords variable
				//? will show the number (3) or the limitForRecords number as (3+)
				let recordCount = updatedRecords.length > this.limitForRecords ? `${this.limitForRecords}+` : updatedRecords.length;
				
				//? swap out the 0 for the correct number of records in the componentTitle
				this.componentTitle = this.componentTitle.replace('0', recordCount);
				this.error = undefined;
			})
			.catch((error) => {
				this.error = error;
				this.records = undefined;
				console.error('ERROR: ', this.error.message);
			});
	}
}

/** EXAMPLE OF RESULTS (Array of Objects)
[
	{
		"Id": "a02Dn000001DpibIAC",
		"Name": "A-00002",
		"Signed_By__c": "Stacia Oehme",
		"Signed__c": false,
		"Note__c": "a01Dn0000053qffIAA",
		"Note__r": {
			"Name": "N-00030",
			"Case__r": {
				"Id": "500Dn000002IvK0IAK",
				"CaseNumber": "00001024"
			}
		}
  	},
  	{
		"Id": "a02Dn000001DpifIAC",
		"Name": "A-00006",
		"Signed_By__c": "Stacia Oehme",
		"Signed__c": true,
		"Note__c": "a01Dn0000053qffIAA",
		"Note__r": {
			"Name": "N-00030",
			"Case__r": {
				"Id": "500Dn000002IvK0IAK",
				"CaseNumber": "00001024"
			}
		}
  	},
  	{
		"Id": "a02Dn000001DpijIAC",
		"Name": "A-00010",
		"Signed_By__c": "Stacia Oehme",
		"Signed__c": false,
		"Note__c": "a01Dn0000053qffIAA",
		"Note__r": {
		"Name": "N-00030",
		"Case__r": {
			"Id": "500Dn000002IvK0IAK",
			"CaseNumber": "00001024"
		}
		}
	},
]
 */