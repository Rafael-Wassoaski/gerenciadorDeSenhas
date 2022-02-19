import * as readLine from 'readline';
import AccountController from '../controllers/AccountsController';
import * as util from 'util';

class Principal{
    private accountController: AccountController;
    private scanf: readLine.Interface;
    private inputLine: readLine.Interface;

    constructor(){
        this.accountController = new AccountController();
        this.scanf = this.createConsoleInput();
    }

    start(){
        while(true){
            console.log('Digite 1 para cadastrar uma conta\n');
            console.log('Digite 2 para buscar uma conta pelo site\n');
            console.log('Digite 3 para listar suas contas cadastradas\n');
            console.log('Digite 4 para sair\n');
           
            this.scanf.question('Digite 1 para cadastrar uma conta\n' +
            'Digite 2 para buscar uma conta pelo nome\n' +
            'Digite 3 para listar suas contas cadastradas\n' +
            'Digite 4 para sair\n', this.executeOption)
        }
    }

    createConsoleInput(): readLine.Interface{
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return rl;
    }

    validateOption(option: number): boolean{
        if(option < 0 || option > 4){
            return false;
        }

        return true;
    }

    executeOption(option: string){
        const optionToNumber = Number(option);

        if(this.validateOption(optionToNumber)){
            console.log('Opcao invalida, por favor selecione uma das opcoes abaixo:');
            return
        }

        switch(option){
            case 1:

            break;

            case 2:

            break;

            case 3:

            break

            case 4: 
            
            break

        }
    }

    createNewAccount(){
        const site = this.scanf.
    }
}