import { Lexer, Token } from './lexer';

export class Parser {
    lexer: Lexer;
    openKey: number
    closeKey: number
    messages: string[]


    constructor(input: string) {
        this.lexer = new Lexer(input)
        this.openKey = 0;
        this.closeKey = 0;
        this.messages = []
    }

    parse(): string[] {
        try {
            while (true) {
                let token: Token | null = this.lexer.nextToken();
                if (token === null) {
                    break;
                }
                switch (token.value) {
                    case 'str':
                    case 'num':
                    case 'bool':
                        this.parseVariableDeclaration(token.value, token);
                        break;
                    case 'fn':
                        this.parseFunctionDeclaration(token);
                        break;
                    case 'if':
                        this.parseConditional(token);
                        break;
                    case 'for':
                        this.parseForLoop(token);
                        break;
                }
            }
        } catch (error: any) {
            this.messages.push(error.message);
        }
        return this.messages;
    }

    parseVariableDeclaration(type: any, token: Token | null): void {
        token = this.lexer.nextToken();
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
                            this.messages.push(`Declaración de variable válida de tipo ${tipoDato} con valor ${valorVariable}`);
                        } else {
                            throw new Error(`Error: El valor "${valorVariable}" no coincide con el tipo de dato "${tipoDato}".`);
                        }
                    } else {
                        throw new Error(`Error: Se esperaba ";" después del valor.`);
                    }
                } else {
                    throw new Error(`Error: Se esperaba un valor para la variable.`);
                }
            } else {
                throw new Error(`Error: Se esperaba ":" después del identificador.`);
            }
        } else {
            throw new Error(`Error: Se esperaba un identificador para la variable.`);
        }
    }


    parseFunctionDeclaration(token: Token | null): void {
        // fn suma(num a, num b): num { codigo extra} 
        token = this.lexer.nextToken();
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
                                this.openKey++
                                token = this.lexer.nextToken();
                                this.parseBodyCode(token);
                                if (this.openKey === this.closeKey) {
                                    this.messages.push("Función correcta")
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

    parseConditional(token: Token | null): void {
        // if age > limit { codigo extra} , if age 12 == age { codigo extra} , if algo != algo { codigo extra}
        token = this.lexer.nextToken();
        if (token !== null && token.type === 'Identificador') {
            token = this.lexer.nextToken();
            if (token !== null && token.type === 'Simbolos' && (token.value === '==' || token.value === '!=' || token.value === '!==' || token.value === '===' || token.value === '<' || token.value === '<=' || token.value === '>' || token.value === '>=')) {
                token = this.lexer.nextToken();
                if (token !== null && token.type === 'Identificador') {
                    token = this.lexer.nextToken();
                    if (token !== null && token.type === 'Llaves' && token.value === '{') {
                        this.openKey++
                        token = this.lexer.nextToken();
                        this.parseBodyCode(token);
                        if (this.openKey === this.closeKey) {
                            this.messages.push("Condicional correcta")
                        } else {
                            throw new Error('Error: Se esperaba "}" después del código de la función.');
                        }
                    } else {
                        throw new Error('Error: Se esperaba "{" después del tipo de dato.');
                    }
                } else {
                    throw new Error('Error: Se esperaba un identificador para la condición.');
                }
            } else {
                throw new Error('Error: Se esperaba un operador de comparación.');
            }
        } else {
            throw new Error('Error: Se esperaba un identificador para la condición.');
        }
    }

    parseForLoop(token: Token | null): void {
        token = this.lexer.nextToken();
        if (token !== null && token.type === 'Paréntesis' && token.value === '(') {
            token = this.lexer.nextToken();
            if (token !== null && token.type === 'Identificador') {
                token = this.lexer.nextToken();
                if (token !== null && token.type === 'Simbolos' && token.value === ':') {
                    token = this.lexer.nextToken();
                    if (token !== null && token.type === 'Identificador') {
                        token = this.lexer.nextToken();
                        if (token !== null && token.type === 'Simbolos' && token.value === ',') {
                            token = this.lexer.nextToken();
                            if (token !== null && token.type === 'Identificador') {
                                token = this.lexer.nextToken();
                                if (token !== null && token.type === 'Simbolos' && (token.value === '==' || token.value === '!=' || token.value === '!==' || token.value === '===' || token.value === '<' || token.value === '<=' || token.value === '>' || token.value === '>=')) {
                                    token = this.lexer.nextToken();
                                    if (token !== null && token.type === 'Identificador') {
                                        token = this.lexer.nextToken();
                                        if (token !== null && token.type === 'Simbolos' && token.value === ',') {
                                            token = this.lexer.nextToken();
                                            if (token !== null && token.type === 'Identificador') {
                                                token = this.lexer.nextToken();
                                                if (token !== null && token.type === 'Operador' && (token.value === '++' || token.value === '--')) {
                                                    token = this.lexer.nextToken();
                                                    if (token !== null && token.type === 'Paréntesis' && token.value === ')') {
                                                        token = this.lexer.nextToken();
                                                        if (token !== null && token.type === 'Llaves' && token.value === '{') {
                                                            this.openKey++
                                                            token = this.lexer.nextToken();
                                                            this.parseBodyCode(token);
                                                            if (this.openKey === this.closeKey) {
                                                                this.messages.push("Ciclo for correcto")
                                                            } else {
                                                                throw new Error('Error: Se esperaba "}" después del código de la función.');
                                                            }
                                                        } else {
                                                            throw new Error('Error: Se esperaba "{" después del tipo de dato.');
                                                        }
                                                    } else {
                                                        throw new Error('Error: Se esperaba ")" después del código del ciclo for.');
                                                    }
                                                } else {
                                                    throw new Error('Error: Se esperaba "++" o "--" después de la variable.');
                                                }
                                            } else {
                                                throw new Error('Error: Se esperaba un identificador para la condición.');
                                            }
                                        } else {
                                            throw new Error('Error: Se esperaba "," después del valor inicial.');
                                        }
                                    } else {
                                        throw new Error('Error: Se esperaba un identificador para la condición.');
                                    }
                                } else {
                                    throw new Error('Error: Se esperaba un operador de comparación.');
                                }
                            } else {
                                throw new Error('Error: Se esperaba un identificador para la condición.');
                            }
                        } else {
                            throw new Error('Error: Se esperaba "," después del valor inicial.');
                        }
                    } else {
                        throw new Error('Error: Se esperaba un identificador para la variable.');
                    }
                } else {
                    throw new Error('Error: Se esperaba ":" después del identificador.');
                }
            } else {
                throw new Error('Error: Se esperaba un identificador para la variable.');
            }
        } else {
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

    parseBodyCode(token: Token | null): void {
        while (true) {
            if (token === null) {
                break;
            }
            switch (token.value) {
                case 'str':
                case 'num':
                case 'bool':
                    this.parseVariableDeclaration(token.value, token);
                    break;
                case 'fn':
                    this.parseFunctionDeclaration(token);
                    break;
                case 'if':
                    this.parseConditional(token);
                    break;
                case 'for':
                    this.parseForLoop(token);
                    break;
                case '}':
                    this.closeKey++
                    break;
                default:
                    throw new Error('Error: Se esperaba una declaración de variable, función, condición o ciclo for. dentro del cuerpo de la función.');
                    break;
            }
            token = this.lexer.nextToken();
        }
    }
}

export const analyzeString = (input: string | undefined): any => {
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