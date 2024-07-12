import * as data from "../helpers/default_data.json" 
import * as main_page from "../locators/main_page.json" 
import * as result_page from "../locators/result_page.json" 
import * as recovery_password_page from "../locators/recovery_password_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');//есть крестик и он виден для пользователя
    });


    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login);//ввели верный логин
         cy.get(main_page.password).type(data.password);//ввели верный пароль
         cy.get(main_page.login_button).click();//нажал войти

         cy.wait(5000);

         cy.get(result_page.title).contains('Авторизация прошла успешно');//проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible');//текст виден пользователю
     })

     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);//ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7');//ввели неверный пароль
        cy.get(main_page.login_button).click();//нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible');//текст виден пользователю
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login);//ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio2');//ввели неверный пароль
        cy.get(main_page.login_button).click();//нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible');//текст виден пользователю
    })

    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');//ввел логин без @
        cy.get(main_page.password).type(data.password);//ввели верный пароль
        cy.get(main_page.login_button).click();//нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации');//проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible');//текст виден пользователю
    })

    it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();//нажимаю восстановить пароль
        cy.get(recovery_password_page.email).type(data.login);//ввел почту для восстановления 
        cy.get(recovery_password_page.send_button).click();//нажал отправить код


        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');//проверяю на совпадение текст
        cy.get(result_page.title).should('be.visible');//текст виден пользователю
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');//ввел логин с заглавными буквами
        cy.get(main_page.password).type(data.password);//ввели верный пароль
        cy.get(main_page.login_button).click();//нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible');//текст виден пользователю
    })


 })
 



 //План
//+Найти поле логин и ввести верный логин
//+Найти поле пароль и ввести правильный пароль
//+Найти кнопку войти и нажать на нее 
//Проверить, что авторизация прошла успешно
