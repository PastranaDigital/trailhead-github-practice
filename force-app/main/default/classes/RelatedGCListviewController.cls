public with sharing class RelatedGCListviewController {
    @AuraEnabled
	public static List<Addendum__c> getRelatedAddendums(Id incomingId) {
		return [
			SELECT Id, Name, Signed_By__c, Signed__c, Note__c, Note__r.Name, Note__r.Case__r.Id, Note__r.Case__r.CaseNumber 
			FROM Addendum__c 
			WHERE Note__r.Case__r.Id = :incomingId
			WITH SECURITY_ENFORCED
		];
    }
}
