import { LightningElement, api, wire } from 'lwc';
import buscarAluno from '@salesforce/apex/AlunoService.buscarAluno';

export default class Carteirinha extends LightningElement {
    //Recebe o ID do registro da página
    @api recordId;
    //Armazena os dados do aluno recuperado buscado pelo wire
    aluno;    
    //Busca o aluno passando o Id do registro como parametro 
    @wire(buscarAluno, { id: '$recordId' })
    wiredAluno({ error, data }){
        //Se data for 'true' pega o dados retornado do método apex e atribui a aluno
        if (data) {
            this.aluno = data;
        } else if (error) {
            //Se erro for 'true' exibe a mensagem de erro retornada pelo método apex e exibe no log
            console.log(error);
        }
    }

    //Verifica se o Aluno está com a matricula ativa
    get matriculaAtiva(){
        return this.aluno?.Status__c === 'Ativo';
    }

    get cursoAluno(){
        const curso = this.aluno?.Matricula__r?.Curso__r?.Name;
        return curso ?? 'Sem curso matrículado';
    }



}