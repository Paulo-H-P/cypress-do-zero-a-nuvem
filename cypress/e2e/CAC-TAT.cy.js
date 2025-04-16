/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})*/

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')    
  })

  function Formulario (nome1 , sobrenome1 , email1 , texto1){

    cy.get('#firstName').type(nome1)
    cy.get('#lastName').type(sobrenome1)
    cy.get('#email').type(email1)
    cy.get('#open-text-area').type(texto1)
    cy.get('button[type="submit"]').click()


  }
  it('verifica o título da aplicação', () => {
    
    cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT') //busca o titulo e o be.equal confirma que o titulo é Central de Atendimento ao Cliente TAT

  })
  it('preenche os campos obrigatórios e envia o formulário',() => {
    cy.get('#firstName').type('paulo')
    cy.get('#lastName').type('pinheiro')
    cy.get('#email').type('fredysoh@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() => {
    cy.get('#firstName').type('paulo')
    cy.get('#lastName').type('pinheiro')
    cy.get('#email').type('fredysohgmail.com') // e-mail errado
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })

  it('validar que, se um valor não-numérico for digitado, seu valor continuará vazio.',() => {
    cy.get('#phone')
      .type('abc')// vai digitar letras ao invés de numeros , como o campo é tipo number o mesmo deve ficar em branco    
      .should('have.value', '') // // o have.value vai confirmar se o campo está em branco através das duas aspás vazias

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
    cy.get('#firstName').type('paulo')
    cy.get('#lastName').type('pinheiro')
    cy.get('#email').type('fredysohgmail.com') 
    cy.get('[for="phone-checkbox"]').click() //vai marcar o checkbox telefone , como não tem numero de telefone o sistema deve exibir o erro
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

   

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone',() => {

  cy.get('#firstName')
      .type('paulo')
      .should('have.value', 'paulo') // confirma se o campo de nome está preenchido
      .clear()                       // limpa o campo de nome
      .should('have.value' , '')     // confirma se o campo nome foi limpo

    cy.get('#lastName')
      .type('pinheiro')
      .should('have.value', 'pinheiro')
      .clear()
      .should('have.value' , '')

    cy.get('#email')
      .type('fredysoh@gmail.com')
      .should('have.value', 'fredysoh@gmail.com')
      .clear()
      .should('have.value' , '')

    cy.get('#phone')
      .type('999999999')
      .should('have.value', '999999999')
      .clear()
      .should('have.value' , '')
    
    })
    

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado',() => {

      cy.PreencheFOrmulario() // preenchimento utilizando o Cypress.Commands criado na pasta commands.js

      cy.get('.success').should('be.visible')      

    })

    it('envia o formuário com sucesso usando um comando customizado podendedo alterar as informações',() => {
      const data = {  //È criado uma constante passando as informações de cadastro, depois criado um comando personalizado chamando essa constante no commands.js 
        firstName: 'fred',
        lastName: 'pinheiro',
        email: 'fredysoh@gmail.com',
        text: 'teste'
      }

      cy.PreencheFOrmulario2(data) // aqui chamamos o comando personalizado , que puxa os valores da constante acima.

      cy.get('.success').should('be.visible')      
    
    })

    it('seleciona um produto (YouTube) por seu texto',() => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value' , 'youtube')       

    })

    it('seleciona um produto (Mentoria) por seu valor (value)',() => {
      cy.get('#product ')
        .select('mentoria')
        .should('have.value' , 'mentoria')   
    })    

    it('seleciona um produto (Blog) por seu índice',() => {
      cy.get('#product')
        .select(1)
        .should('have.value' , 'blog') 

    })

    it('marca o tipo de atendimento Feedback',() => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')

    })

    it('Marca o tipo de atendimento', () => {
      //                                    função
      cy.get('input[type="radio"]').each((TipoAtendimento) => {      // each pega uma lista de elementos e percorre um por um dentro dele se cria uma função para 
        //guardar todos os elementos , no caso a função criada foi TipoAtendimento
        cy.wrap(TipoAtendimento)// clica em cada um dos elementos
        .check() 
        .should('be.checked')

         })      
              
    })

    it('marca ambos checkboxes, depois desmarca o último',() => {
      cy.get('input[type="checkbox"]')  // vai pegar todas as caixas de checkbox
      .check()  //vai marcar todas
      .should('be.checked')  // vai confirmar que todas estão marcadas
      .last()  //vai pegar o ultimo checkbox
      .uncheck() //vai desmarcar o ultimo checkbox
      .should('not.be.checked')  // vai copnfirmar que o ultimo checkbox foi desmarcado 
           
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
      cy.get('#phone-checkbox')
      .check()
      .should('be.checked')
      cy.get('.button').click()
      cy.get('.error').should('be.visible')

    })

    it('seleciona um arquivo da pasta fixtures',() => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json') //seleciona o local onde o arquivo está
      .should('be.visible' ,'example.json')
      

    })

    it('seleciona um arquivo simulando um drag-and-drop',() => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json' , { action: 'drag-drop'}) // simula o ato de arrastar o arquivo e soltar para que o upload seja feito
      .should('be.visible' ,'example.json')
      

    })

    
    it('seleciona um arquivo da pasta fixtures',() => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json') //seleciona o local onde o arquivo está
      .should('be.visible' ,'example.json')
      

    })

    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',() => {        
      cy.contains('a' , 'Política de Privacidade')
      .should('have.attr' , 'href' , 'privacy.html')  // tem o atributo href  privacy.html
      .and('have.attr' , 'target' , '_blank')  // e deve ter o attr com valor target _blank     
      
      
        

    })

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link',() => {
      cy.get('#privacy a') // seleciona o link a que está dentro do id #privacy
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click() //Remove o _blank para abrir a pagina na mesma aba

      cy.contains('h1' ,'CAC TAT - Política de Privacidade').should('be.visible') //Confirma se está na página certa

      

    })



    

    



      
      

   })
