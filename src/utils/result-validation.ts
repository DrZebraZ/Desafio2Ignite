import { 
    errorListSchemaType, 
    errorSchema, 
    resultSchemaType, 
    tagListSchemaType, 
    addResultSchemaType, 
    addResultSchema, 
    addCookieSchemaType, 
    cookieBody 
} from './resultSchema';

export class ResultValidation {


    errorList:errorListSchemaType
    result:resultSchemaType

    constructor() {
        this.errorList = [];
        this.result = {};
    }

    concatErrors(resultValidation: ResultValidation) {
        this.errorList = this.errorList.concat(resultValidation.errorList)
    }

    addError(tag: String, message: String, isCritical:Boolean = false) {
        const erro = errorSchema.parse({tag, message, isCritical})
        this.errorList.push(erro);
    }

    setResult(result: addResultSchemaType) {
        const res = addResultSchema.parse(result)
        this.result['data'] = res.data;
    }

    setCookie(cookies: addCookieSchemaType){
        const cookie = cookieBody.parse(cookies)
        this.result['cookie'] ? this.result['cookie'].push(cookie) : this.result['cookie'] = [cookie]
    }

    dropCookies(){
        delete this.result['cookie']
    }

    hasError() {
        return this.errorList.length > 0;
    }

    hasCriticalError() {
        return this.errorList.filter(error => error.critical).length > 0;
    }

    getErrorList() {
        return this.errorList.map(error => { return {tag: error.tag, message: error.message} });
    }

    isResultEmpty() {
        return this.result === undefined || !this.result || this.result.data.length === 0;
    }

    getResult() {
        return this.result;
    }

    findErrorByTags(tagList: tagListSchemaType) {
        return this.errorList.filter(error => tagList.includes(error.tag)).length > 0;
    }
}

