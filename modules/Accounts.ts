export default class Accounts{
    private site: string;
    private login: string;
    private password: string;

    constructor(site: string, login: string, password: string){
        this.site = site;
        this.login = login;
        this.password = password;
    }

    get getSite(){
        return this.site;
    }

    get getLogin(){
        return this.login;
    }

    get getPassword(){
        return this.password;
    }
}