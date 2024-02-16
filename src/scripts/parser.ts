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
                default:
                    console.log('Error: Palabra reservada no reconocida.');
                    break;
            }
        }
    }

    parseVariableDeclaration(type : any): void {
        let token: Token | null = this.lexer.nextToken();
        if (token !== null && token.type === 'Identificador') {
            token = this.lexer.nextToken();
            if (token !== null && token.type === 'Simbolos' && token.value === ':') {
                token = this.lexer.nextToken();
                if (token !== null && (token.type === 'Identificador' || token.type === 'Simbolos' || token.type === 'Palabra reservada')) {
                    const valorVariable = token.value;
                    const tipoDato = type; // El tipo de dato es el identificador en este punto
    
                    token = this.lexer.nextToken();
                    if (token !== null && token.type === 'Simbolos' && token.value === ';') {
                        if ((tipoDato === 'str' && /^".*"$/.test(valorVariable)) ||
                            (tipoDato === 'num' && /^-?\d+(\.\d+)?$/.test(valorVariable)) || // Permitir números enteros y decimales, positivos y negativos
                            (tipoDato === 'bool' && (valorVariable === 'true' || valorVariable === 'false'))) {
                            console.log(`Declaración de variable válida, variable de tipo ${type}`);
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
        console.log('Declaración de función.');
    }

    parseConditional(): void {
        console.log('Condición evaluada.');
    }

    parseForLoop(): void {
        console.log('Ciclo for.');
    }
}

export const analyzeString = (input: string | undefined): void => {
    if (input === undefined) {
        console.error('No input provided.');
        return;
    }
    try {
        const parser = new Parser(input);
        parser.parse();
    } catch (error: any) {
        console.error('Error during analysis:', error.message);
    }
}