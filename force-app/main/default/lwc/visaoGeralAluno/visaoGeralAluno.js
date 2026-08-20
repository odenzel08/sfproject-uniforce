import { LightningElement, api, wire } from 'lwc';
import buscarAluno from '@salesforce/apex/AlunoService.buscarAluno';

export default class VisaoGeralAluno extends LightningElement {
    @api recordId;

    aluno;
    error;
    
    @wire(buscarAluno, {id: '$recordId'})
    wiredAlunos({error, data}){
        if (data){
            this.aluno = data;
            this.error = undefined;
        }
        else if (error){
            this.error = error;
            this.aluno = undefined;

            console.error(error);
        }
    }
    
    //Getter responsavel por informar ao front qual o tema do badge de acordo com o status do aluno
    get badgeTheme(){
        return this.aluno.Status__c === 'Ativo' ? 'slds-theme_success' : 'slds-theme_error';
    }

    get cursoAluno() {
        return this.aluno?.Matricula__r?.[0]?.Curso__r?.Name ?? 'Nenhum curso matriculado';
    }
}