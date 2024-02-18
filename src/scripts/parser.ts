import { todo } from 'node:test';
import { Lexer, Token } from './lexer';

export class Parser {
    lexer: Lexer;

    constructor(input: string) {
        this.lexer = new Lexer(input);
    }

    parse(): void {
        while (true) {
            let token: Token | null = this.lexer.nextToken();
            if (token === null) {
                break;
            }
            switch (token.value) {
                case 'str':
                case 'num':
                case 'bool':
                    this.parseVariableDeclaration(token.value);
                    break;
                case 'fn':
                    this.parseFunctionDeclaration();
                    break;
                case 'if':
                    this.parseConditional();
                    break;
                case 'for':
                    this.parseForLoop();
                    break;
            }
        }
    }

    parseVariableDeclaration(type: any): void {
        let token: Token | null = this.lexer.nextToken();
        if (token !== null && token.type === 'Identificador') {
            token = this.lexer.nextToken();
            if (token !== null && token.type === 'Simbolos' && token.value === ':') {
                token = this.lexer.nextToken();
                if (token !== null && (token.type === 'Identificador' || token.type === 'Simbolos' || token.type === 'Palabra reservada')) {
                    const valorVariable = token.value;
                    const tipoDato = type;
                    token = this.lexer.nextToken();
                    if (token !== null && token.type === 'Simbolos' && token.value === ';') {
                        if ((tipoDato === 'str' && /^".*"$/.test(valorVariable)) ||
                            (tipoDato === 'num' && /^-?\d+(\.\d+)?$/.test(valorVariable)) ||
                            (tipoDato === 'bool' && (valorVariable === 'true' || valorVariable === 'false'))) {
                            console.log(`Declaración de variable válida`);
                        } else {
                            console.log(`Error: El valor "${valorVariable}" no coincide con el tipo de dato "${tipoDato}".`);
                        }
                    } else {
                        console.log('Error: Se esperaba ";" después del valor.');
                    }
                } else {
                    console.log('Error: Se esperaba un valor para la variable.');
                }
            } else {
                console.log('Error: Se esperaba ":" después del identificador.');
            }
        } else {
            console.log('Error: Se esperaba un identificador para la variable.');
        }
    }


    parseFunctionDeclaration(): void {
        // TODO falta agregar el codigo extra
        // fn suma(num a, num b): num { codigo extra} 
        let token: Token | null = this.lexer.nextToken();
        if (token !== null && token.type === 'Identificador') {
            token = this.lexer.nextToken();
            if (token !== null && token.type === 'Paréntesis' && token.value === '(') {
                token = this.lexer.nextToken();
                const isComplete = this.parseParamater(token);
                token = this.lexer.nextToken();
                if (isComplete) {
                    if (token !== null && token.type === 'Simbolos' && token.value === ':') {
                        token = this.lexer.nextToken();
                        if (token !== null && token.type === 'Palabra reservada' && (token.value === 'str' || token.value === 'num' || token.value === 'bool' || token.value === 'void')) {
                            token = this.lexer.nextToken();
                            if (token !== null && token.type === 'Llaves' && token.value === '{') {
                                token = this.lexer.nextToken();
                                if (token !== null && token.type === 'Llaves' && token.value === '}') {
                                    console.log('Función declarada.')
                                } else {
                                    throw new Error('Error: Se esperaba "}" después del código de la función.');
                                }
                            } else {
                                throw new Error('Error: Se esperaba "{" después del tipo de dato.');
                            }
                        } else {
                            throw new Error('Error: Se esperaba un tipo de dato de retorno.');
                        }
                    } else {
                        throw new Error('Error: Se esperaba ":" después de los parámetros.');
                    }
                } else {
                    throw new Error('Error: no completo');
                }
            } else {
                throw new Error('Error: Se esperaba "(" después del identificador.');
            }
        } else {
            throw new Error('Error: Se esperaba un identificador para la función.');
        }
    }

    parseConditional(): void {
        // if age > limit { codigo extra} , if age 12 == age { codigo extra} , if algo != algo { codigo extra}
        let token: Token | null = this.lexer.nextToken();
        if(token !== null && token.type === 'Identificador'){
            token = this.lexer.nextToken();
            if(token !== null && token.type === 'Simbolos' && (token.value === '==' || token.value === '!=' || token.value === '!==' || token.value === '===' || token.value === '<' || token.value === '<=' || token.value === '>' || token.value === '>=')){
                token = this.lexer.nextToken();
                if(token !== null && token.type === 'Identificador'){
                    token = this.lexer.nextToken();
                    if(token !== null && token.type === 'Llaves' && token.value === '{'){
                        token = this.lexer.nextToken();
                        if(token !== null && token.type === 'Llaves' && token.value === '}'){
                            console.log('Condición válida.');
                        }else{
                            throw new Error('Error: Se esperaba "}" después del código de la condición.');
                        }
                    }else{
                        throw new Error('Error: Se esperaba "{" después de la condición.');
                    }
                }else{
                    throw new Error('Error: Se esperaba un valor para la condición.');
                }
            }else{
                throw new Error('Error: Se esperaba un operador de comparación.');
            }
        }else{
            throw new Error('Error: Se esperaba un identificador.');
        }
    }

    parseForLoop(): void {
        let token: Token | null = this.lexer.nextToken();
        if(token !== null && token.type === 'Paréntesis' && token.value === '('){
            token = this.lexer.nextToken();
            if(token !== null && token.type === 'Identificador'){
                token = this.lexer.nextToken();
                if(token !== null && token.type === 'Simbolos' && token.value === ':'){
                    token = this.lexer.nextToken();
                    if(token !== null && token.type === 'Identificador'){
                        token = this.lexer.nextToken();
                        if(token !== null && token.type === 'Simbolos' && token.value === ','){
                            token = this.lexer.nextToken();
                            if(token !== null && token.type === 'Identificador'){
                                token = this.lexer.nextToken();
                                if(token !== null && token.type === 'Simbolos' && (token.value === '==' || token.value === '!=' || token.value === '!==' || token.value === '===' || token.value === '<' || token.value === '<=' || token.value === '>' || token.value === '>=')){
                                    token = this.lexer.nextToken();
                                    if(token !== null && token.type === 'Identificador'){
                                        token = this.lexer.nextToken();
                                        if(token!== null && token.type === 'Simbolos' && token.value ===','){
                                            token = this.lexer.nextToken();
                                            if(token !== null && token.type === 'Identificador'){
                                                token = this.lexer.nextToken();
                                                if(token !== null && token.type === 'Operador' && (token.value === '++' || token.value === '--')){
                                                    token = this.lexer.nextToken();
                                                    if(token !== null && token.type === 'Paréntesis' && token.value === ')'){
                                                        token = this.lexer.nextToken();
                                                        if(token !== null && token.type === 'Llaves' && token.value === '{'){
                                                            token = this.lexer.nextToken();
                                                            if(token !== null && token.type === 'Llaves' && token.value === '}'){
                                                                console.log('Ciclo for válido.');
                                                            }else{
                                                                throw new Error('Error: Se esperaba "}" después del código del ciclo for.');
                                                            }
                                                        }else{
                                                            throw new Error('Error: Se esperaba "{" después de la condición.');
                                                        }
                                                    }else{
                                                        throw new Error('Error: Se esperaba ")" después del código del ciclo for.');
                                                    }
                                                }else{
                                                    throw new Error('Error: Se esperaba "++" o "--" después de la variable.');
                                                }
                                            }else{
                                                throw new Error('Error: Se esperaba un identificador para la condición.');
                                            }
                                        }else{
                                            throw new Error('Error: Se esperaba "," después de la condición.');
                                        }
                                    }else{
                                        throw new Error('Error: Se esperaba un identificador para la condición.');
                                    }
                                }else{
                                    throw new Error('Error: Se esperaba un operador de comparación.');
                                }
                            }else{
                                throw new Error('Error: Se esperaba un identificador para la condición.');
                            }
                        }else{
                            throw new Error('Error: Se esperaba "," después del valor inicial.');
                        }
                    }else{
                        throw new Error('Error: Se esperaba un identificador para la condición.');
                    }
                }else{
                    throw new Error('Error: Se esperaba "=" después del identificador.');
                }
            }else{
                throw new Error('Error: Se esperaba un identificador para la variable.');
            }
        }else{
            throw new Error('Error: Se esperaba "(" después de la palabra reservada "for".');
        }
    }

    parseParamater(token: Token | null): boolean {
        if (token !== null && token.type === 'Palabra reservada' && (token.value === 'str' || token.value === 'num' || token.value === 'bool')) {
            token = this.lexer.nextToken();
            if (token !== null && token.type === 'Identificador') {
                token = this.lexer.nextToken();
                if (token !== null && token.type === 'Simbolos' && token.value === ',') {
                    token = this.lexer.nextToken();
                    if (token !== null && token.type === 'Paréntesis' && token.value === ')') {
                        throw new Error('Error: Se esperaba otro parámetro en la funcion.');
                    } else {
                        return this.parseParamater(token);
                    }
                }
            } else {
                throw new Error('Error: Se esperaba un identificador para el parámetro.');
            }
        } else if (token !== null && token.type === 'Simbolos' && token.value === ')') {
            return true;
        }
        return true;
    }
}

export const analyzeString = (input: string | undefined): void => {
    if (input === undefined) {
        const error = console.error('No input provided.');
        return error;
    }
    try {
        const parser = new Parser(input);
        return parser.parse();
    } catch (error: any) {
        const errorMsg = console.error('Error during analysis:', error.message);
        return errorMsg;
    }
}