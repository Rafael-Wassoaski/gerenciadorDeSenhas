import Files from '../modules/Files';
import * as path from 'path';
import {readFileSync, writeFileSync, existsSync} from 'fs';

export default class FilesController{
    private file: Files;

    constructor(filePath: string){
        this.file = new Files(filePath);

        if(!this.checkFileExistence(filePath)){
            this.writeOnFile('');
        }
    }

    private checkFileExistence(filePath: string){
        return existsSync(path.resolve(filePath));
    }

    openFile(): Buffer {
        const file = readFileSync(path.resolve(this.file.getFilePath));
        
        return file
    }

    writeOnFile(newContent: string){        
        writeFileSync(path.resolve(this.file.getFilePath), newContent);
    }
}