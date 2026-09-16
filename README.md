# 🎓 Painel do Aluno — LWC Playground
 
Projeto prático desenvolvido para treinar **Lightning Web Components (LWC)** e **JavaScript** no ecossistema Salesforce, consumindo dados de Apex com `@wire` e exibindo informações do aluno em cards reutilizáveis.
 
> Este é um projeto de estudo, focado em fixar conceitos como componentes reativos, comunicação com Apex, getters computados e renderização condicional (`lwc:if` / `lwc:elseif` / `lwc:else`).
 
---
 
## 📌 Sobre o projeto
 
A proposta simula uma tela de **registro do Aluno** (Record Page) no Salesforce, com dois componentes LWC que exibem informações vindas do objeto customizado `Aluno__c`:
 
- **Visão Geral do Aluno** — card resumido com nome, curso atual e status (ativo/inativo), com badge colorido.
- **Carteirinha Estudantil** — card com efeito de "carteirinha física", que pode ser virado (frente/verso) e mostra os dados só quando a matrícula está ativa.
Ambos os componentes consomem o mesmo método Apex (`AlunoService.buscarAluno`), reaproveitando a mesma fonte de dados.
 
---
 
## ⚙️ Funcionalidades
 
- ✅ Busca do aluno e sua matrícula ativa via SOQL relacionado (subquery)
- ✅ Exibição condicional de UI com base no `Status__c` do aluno
- ✅ Badge de status dinâmico (`slds-theme_success` / `slds-theme_error`)
- ✅ Card "flip" (frente/verso) via `lightning-button` e controle de estado local
- ✅ Tratamento de erro com `AuraHandledException` e feedback visual no componente
- ✅ Uso de `@wire` reativo com parâmetro dinâmico (`$recordId`)
---
 
## 🗂️ Estrutura do projeto
 
```
force-app/main/default/
├── classes/
│   └── AlunoService.cls              # Camada de serviço (Apex) — busca de dados do aluno
├── lwc/
│   ├── visaoGeralAluno/
│   │   ├── visaoGeralAluno.html
│   │   └── visaoGeralAluno.js
│   └── carteirinha/
│       ├── carteirinha.html
│       └── carteirinha.js
```
 
---
 
## 🧬 Modelo de dados
 
| Objeto           | Papel                                              |
|-------------------|-----------------------------------------------------|
| `Aluno__c`        | Objeto principal — dados cadastrais do aluno        |
| `Matricula__c`    | Relacionado (filho) ao Aluno, guarda o vínculo com o curso e o status da matrícula |
| `Curso__c`        | Referenciado pela Matrícula, guarda o nome do curso |
 
**Relacionamento:** `Aluno__c` 1—N `Matricula__c` N—1 `Curso__c`
 
Campos usados no projeto:
- `Aluno__c`: `Name`, `Status__c`, `CPF__c`, `Data_de_Nascimento__c`
- `Matricula__c` (relationship `Matricula__r`): `Status_Matricula__c`, `Curso__r.Name`
> ⚠️ O nome do relationship (`Matricula__r`) sugere que o child relationship name da lookup/master-detail está configurado como `Matricula`. Vale confirmar isso no Setup se for reaproveitar o projeto.
 
---
 
## 🚀 Como rodar / fazer deploy
 
Pré-requisitos:
- [Salesforce CLI (sf)](https://developer.salesforce.com/tools/salesforcecli) instalado
- Uma Scratch Org ou Sandbox autenticada
```bash
# Autenticar (se ainda não tiver feito)
sf org login web -a minhaOrg
 
# Deploy do projeto
sf project deploy start -o minhaOrg
```
 
Depois do deploy:
1. Vá até uma Record Page do objeto `Aluno__c`.
2. Edite a página no App Builder.
3. Arraste os componentes **Visão Geral do Aluno** e **Carteira de Identificação Estudantil** para o layout.
4. Ative a página e teste com um registro que tenha uma Matrícula com `Status_Matricula__c = 'Cursando'`.
---
 
## 🧠 Principais aprendizados no projeto
 
- Como usar `@wire` com parâmetro reativo (`$recordId`) para refazer a consulta automaticamente quando o `recordId` muda.
- Diferença entre tratar erro no Apex (`try/catch` + `AuraHandledException`) e tratar no client-side (`error` do `@wire`).
- Uso de **getters** no JS para centralizar lógica de apresentação (ex: `cursoAluno`, `badgeTheme`) sem poluir o HTML.
- Renderização condicional moderna do LWC (`lwc:if`, `lwc:elseif`, `lwc:else`) no lugar das antigas diretivas `if:true`/`if:false`.
- Controle de estado simples (flip de card) sem precisar de bibliotecas externas.
---
 
## 🔧 Possíveis melhorias futuras
 
- Padronizar o tratamento de erro entre os dois componentes (hoje um exibe mensagem na tela, o outro só loga no console).
- Extrair o `cursoAluno` e `badgeTheme` para um único componente pai, evitando duas queries Apex idênticas na mesma página.
- Adicionar testes unitários (Apex `@isTest` e Jest para os componentes LWC).
- Tratar o cenário de aluno sem nenhuma matrícula "Cursando" de forma mais explícita na Carteirinha.
---
 
## 📄 Documentação técnica
 
Para uma explicação detalhada, componente a componente, veja a documentação técnica anexa (`documentacao-tecnica.html`).
 
---
 
## 📃 Licença
 
Projeto pessoal de estudo — livre para reutilização como referência de aprendizado.
