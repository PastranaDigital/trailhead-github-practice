public with sharing class RelatedGCListviewController {
    @AuraEnabled
	public static List<Addendum__c> getRelated(Id incomingId) {
		System.debug(incomingId);
		return [
			SELECT Id, Signed_By__c, Signed__c, Note__c, Note__r.Name, Note__r.Case__r.Id, Note__r.Case__r.CaseNumber 
			FROM Addendum__c 
			WHERE Note__r.Case__r.Id = :incomingId
			WITH SECURITY_ENFORCED
			];
    }
}
