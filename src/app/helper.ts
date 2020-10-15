export class Helper {
    constructor() { }

    public translate = function(objTrans, transKey){
        return objTrans.store.translations[objTrans.currentLang || objTrans.defaultLang][transKey];
    }
}
