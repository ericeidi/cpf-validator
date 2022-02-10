export default class Cpf {
    
    totalFirstDigitMultiplied: number;
    cpfLength: number;
    totalSecondDigitMultiplied: number;
    
    constructor(){
        this.totalFirstDigitMultiplied = 0;
        this.totalSecondDigitMultiplied = 0;
        this.cpfLength = 11;
    }

    validateCpf = (cpfParams: string): boolean => {
        if (cpfParams.length < 11 || cpfParams.length > 14 || cpfParams == null || cpfParams == undefined) return false;
        const cpfSanitized = this.cpfSanitizer(cpfParams);
        const cpfArray = [...cpfSanitized]
        const firstDigit = this.validateFirstVerifierDigit(cpfArray)
        const secondDigit = this.validateSecondVerifierDigit(cpfArray, firstDigit)
        const cpfValidated = this.createValidCpfArray(cpfArray, firstDigit, secondDigit);
        return this.verifyIsValidArrayCpf(cpfValidated, cpfArray)
    }

    cpfSanitizer = (cpfParams: string): string => {
        return cpfParams
        .replace('.','')
        .replace('.','')
        .replace('-','')
        .replace(" ","");  
    }

    validateFirstVerifierDigit = (cpfArray: Array<string>): number => {
        let cpfLengthMultiplier = 11;
        for(let index = 0; index <= 8; index++){
            this.totalFirstDigitMultiplied += (parseInt(cpfArray[index]) * (cpfLengthMultiplier - 1));
            cpfLengthMultiplier--;
        }
        const rest = (this.totalFirstDigitMultiplied % this.cpfLength)
        const firstDigit = this.cpfLength - rest;
        return firstDigit
    }

    validateSecondVerifierDigit = (cpfArray: Array<string>, firstDigit: number): number => {
        const firstDigitMultiplier = 2;
        let cpfLengthMultiplier = 11;
        for(let index = 0; index <= 8; index++){
            this.totalSecondDigitMultiplied += (parseInt(cpfArray[index]) * cpfLengthMultiplier);
            cpfLengthMultiplier--;
        }
        const totalWithFirstDigit = this.totalSecondDigitMultiplied + (firstDigit * firstDigitMultiplier);      
        const rest = (totalWithFirstDigit % this.cpfLength)
        const secondDigit = this.cpfLength - rest;
        return secondDigit
    }

    createValidCpfArray = (cpfArray: Array<string>, firstDigit: number, secondDigit: number): Array<string> => {
        const validatedCpfArray = [...cpfArray];
        validatedCpfArray.splice(10, 1); 
        validatedCpfArray.splice(9, 1); 
        validatedCpfArray.push(firstDigit.toString())
        validatedCpfArray.push(secondDigit.toString())
        return validatedCpfArray;
    }

    verifyIsValidArrayCpf = (cpfValidated: Array<string>, cpfArray: Array<string>): boolean => {
        return JSON.stringify(cpfValidated) == JSON.stringify(cpfArray)
    }
   
}