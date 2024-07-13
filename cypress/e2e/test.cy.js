describe("Login tests", () => {
    beforeEach(()=> {
        cy.visit("http://localhost:5173/")
    });
    //test 1
    it("Form Success test", ()=> {
        cy.get("[data-cy='email-input']").type("ali@bas.com")
        cy.get("[data-cy='password-input']").type("415511Lb")
        cy.get("[data-cy='terms-input']").check();
        cy.get("[data-cy='submit-btn']").should("be.enabled");
    })
    //test 2
    it("Email validation test", ()=> {
        cy.get("[data-cy='email-input']").type("alibas.com")
        cy.get("[data-cy='password-input']").type("415511Lb")
        cy.get("[data-cy='terms-input']").check();

        cy.contains("Lütfen geçerli bir email adresi giriniz!").should("be.visible");
    })

    //test 3
    it("Email&Password validation test", ()=> {
        cy.get("[data-cy='email-input']").type("alibas.com")
        cy.get("[data-cy='password-input']").type("415")
        cy.get("[data-cy='terms-input']").check();

        cy.contains("Lütfen geçerli bir email adresi giriniz!").should("be.visible");
        cy.contains("Lütfen büyük/küçük harflerden ve en az bir rakamdan oluşan bir şifre giriniz!").should("be.visible");
    })

    it("Terms validation test", ()=> {
        cy.get("[data-cy='email-input']").type("ali@bas.com")
        cy.get("[data-cy='password-input']").type("415511Lb")

        cy.get("[data-cy='submit-btn']").should("be.disabled");
    })

    
})
