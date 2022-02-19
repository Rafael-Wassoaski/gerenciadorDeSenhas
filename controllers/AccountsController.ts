import Account from "../interfaces/Account";
import Accounts from "../modules/Accounts";
import FilesController from "./FilesController";

export default class AccountController{
    private accounts: Map<string, Accounts>;
    private filesController: FilesController

    constructor(){
        this.accounts = new Map();
        this.filesController = new FilesController('../password/password.txt');

        this.loadAccountsToMemory();
    }

    loadAccountsToMemory(){
        const accountsFromFile = this.filesController.openFile();
        const parsedAccounts = String(accountsFromFile).split(';\n');

        for(const accountString of parsedAccounts){
            const [site, loginPassword] = accountString.split(':');
            const [login, password] = loginPassword.split(' ');
            const account = new Accounts(site, login, password);

            this.accounts.set(site, account);
        }
    }

    getAllAccounts(){
        return this.accounts;
    }

    createNewAccount(newAccount: Account){
        const {site, login, password} = newAccount;
        const account = new Accounts(site, login, password);

        if(!this.validateAccountData(account)){
            return;
        }

        this.accounts.set(account.getSite, account);
    }

    getAccountBySite(site: string){
        const accountIndex = this.getAccountIndexBySite(site);
        if(!accountIndex){
            throw new Error(`A conta com site ${site} não existe nas suas contas salvas`);
        }

        return this.accounts.get(accountIndex);
    }

    deleteAccount(accountSite: string){
        const accountIndex = this.getAccountIndexBySite(accountSite);
        if(!accountIndex){
            throw new Error(`A conta com site ${accountSite} não existe nas suas contas salvas`);
        }

        this.accounts.delete(accountIndex);
    }

    getAccountIndexBySite(site: string){
        for(const [key ,account] of this.accounts){
            if(account.getSite === site){
                return key;
            }
        }
    }

    validateAccountData(account: Accounts){
        try {
            this.validateString(account.getSite, 'Site');
            this.validateString(account.getLogin, 'Login');
            this.validateString(account.getPassword, 'Senha');
        } catch (error) {
            console.log(error)
            return false;
        }

        return true;
    }

    validateString(field: string, fieldName: string, minLength = 1){
        if(field === ' '){
            throw new Error(`${fieldName}: O campo não pode ser vazio`);
        }

        if(field.length < minLength){
            throw new Error(`${fieldName}: O campo não cumpre o tamanho mínimo de ${minLength}`);
        }
    }

    saveFile(){
        let newContent = '';

        for(const [,account] of this.accounts){
            newContent += `${account.getSite} : ${account.getLogin} ${account.getPassword} ;\n`;
        }

        try {
            this.validateString(newContent, 'Novos dados', 1);
        } catch (error) {
            console.log('Erro ao salvar seus dados, por favor tente novamente');
            return;
        }
        
        this.filesController.writeOnFile(newContent);
    }

}