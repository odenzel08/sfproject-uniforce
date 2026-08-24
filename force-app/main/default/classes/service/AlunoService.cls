public with sharing class AlunoService {
    
    @AuraEnabled(cacheable=true)
    public static Aluno__c buscarAluno(String id){
        try {
            return [SELECT Id, Name, Status__c, CPF__c, Data_de_Nascimento__c,
                         (SELECT Id, Curso__r.Name FROM Matricula__r WHERE Status_Matricula__c = 'Cursando' LIMIT 1) 
                    FROM Aluno__c 
                    WHERE Id = :id];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}