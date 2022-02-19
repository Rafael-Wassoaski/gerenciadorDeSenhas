export default class Files{
    private filePath: string;

    constructor(path: string){
        this.filePath = path;
    }

    get getFilePath(){
        return this.filePath
    }

}