export default class Cpf {
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
        let totalMultiplier = 0;
        let counterMultiplier = 10;
        for(let index = 0; index <= 8; index++){
            totalMultiplier = totalMultiplier + (parseInt(cpfArray[index]) * counterMultiplier);
            counterMultiplier--;
        }
        const rest = (totalMultiplier % 11)
        const firstDigit = 11 - rest;
        return firstDigit
    }

    validateSecondVerifierDigit = (cpfArray: Array<string>, firstDigit: number): number => {
        let totalMultiplier = 0;
        let counterMultiplier = 11;
        for(let index = 0; index <= 8; index++){
            totalMultiplier = totalMultiplier + (parseInt(cpfArray[index]) * counterMultiplier);
            counterMultiplier--;
        }
        const totalWithFirstDigit = totalMultiplier + (firstDigit * 2);      
        const rest = (totalWithFirstDigit % 11)
        const secondDigit = 11 - rest;
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