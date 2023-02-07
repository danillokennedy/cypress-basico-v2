describe('Central de Atendimento ao Cliente TAT - Política de privacidade', function() {

    it.only('testa a página da política de privavidade de forma independente', function() {
        const Texto = 'Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino. Talking About Testing'
   
        cy.visit('./src/privacy.html')
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('#white-background', Texto).should('be.visible')
    })
})