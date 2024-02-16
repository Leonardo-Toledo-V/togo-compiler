import { Data } from "@/components/Compiler"

export interface Token {
    type: string;
    value: string;
}

const TogoDictionary: { tipo: string; regex: RegExp }[] = [
    { tipo: "Palabra reservada", regex: /^fn\b/ },
    { tipo: "Palabra reservada", regex: /^str\b/ },
    { tipo: "Palabra reservada", regex: /^void\b/ },
    { tipo: "Palabra reservada", regex: /^bool\b/ },
    { tipo: "Palabra reservada", regex: /^num\b/ },
    { tipo: "Palabra reservada", regex: /^if\b/ },
    { tipo: "Palabra reservada", regex: /^for\b/ },
    { tipo: "Palabra reservada", regex: /^(true|false)\b/ },
    { tipo: "Identificador", regex: /^"([^"]*)"/ },
    { tipo: "Identificador", regex: /^\d+(\.\d+)?/ },
    { tipo: "Identificador", regex: /^[a-zA-Z_][a-zA-Z0-9_]*/ },
    { tipo: "Operador", regex: /^\+\+/ },
    { tipo: "Operador", regex: /^--/ },
    { tipo: "Paréntesis", regex: /^\(/ },
    { tipo: "Paréntesis", regex: /^\)/ },
    { tipo: "Llaves", regex: /^\{/ },
    { tipo: "Llaves", regex: /^\}/ },
    { tipo: "Simbolos", regex: /^:/ },
    { tipo: "Simbolos", regex: /^,/ },
    { tipo: "Simbolos", regex: /^;/ },
    { tipo: "Simbolos", regex: /^\=\=\=/ },
    { tipo: "Simbolos", regex: /^\=\=/ },
    { tipo: "Simbolos", regex: /^=/ },
    { tipo: "Simbolos", regex: /^\!\=\=/ },
    { tipo: "Simbolos", regex: /^\!\=/ },
    { tipo: "Simbolos", regex: /^\<\=/ },
    { tipo: "Simbolos", regex: /^\>\=/ },
    { tipo: "Simbolos", regex: /^</ },
    { tipo: "Simbolos", regex: /^>/ },
];

let palabrasReservadasList: string[] = [];
let identificadoresList: string[] = [];
let operadorList: string[] = [];
let parentesisList: string[] = [];
let llavesList: string[] = [];
let simbolosList: string[] = [];
let unknownList: string[] = [];

export class Lexer {
    input: string;
    pos: number;
    dictionary: { tipo: string; regex: RegExp }[];

    constructor(input: string) {
        this.input = input;
        this.pos = 0;
        this.dictionary = TogoDictionary;
    }

    nextToken(): Token | null {
        this.skipWhitespace();
        if (this.pos >= this.input.length) {
            return null;
        }

        for (const { tipo, regex } of this.dictionary) {
            const match = this.input.substr(this.pos).match(regex);
            if (match && match.index === 0) {
                const value = match[0];
                this.addToTokenList(tipo, value);
                this.pos += value.length;
                return { type: tipo, value };
            }
        }

        let char = this.input[this.pos];

        if (/[a-zA-Z0-9_]/.test(char)) {
            let word = '';
            while (this.pos < this.input.length && /[a-zA-Z0-9_]/.test(char)) {
                word += char;
                this.pos++;
                char = this.input[this.pos];
            }
            this.addToTokenList('Identificador', word);
            return { type: 'Identificador', value: word };
        }

        this.pos++;
        this.addToTokenList('UNKNOWN', char);
        return { type: 'UNKNOWN', value: char };
    }

    skipWhitespace() {
        while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
            this.pos++;
        }
    }

    addToTokenList(tipo: string, value: string) {
        switch (tipo) {
            case 'Palabra reservada':
                palabrasReservadasList.push(value);
                break;
            case 'Identificador':
                identificadoresList.push(value);
                break;
            case 'Operador':
                operadorList.push(value);
                break;
            case 'Paréntesis':
                parentesisList.push(value);
                break;
            case 'Llaves':
                llavesList.push(value);
                break;
            case 'Simbolos':
                simbolosList.push(value);
                break;
            case 'UNKNOWN':
                unknownList.push(value);
        }
    }
}

export const validateBtn = (editor: string | undefined): Data => {
    if (editor === undefined) {
        throw new Error("El editor no puede ser undefined");
    }
    palabrasReservadasList = [];
    identificadoresList = [];
    operadorList = [];
    parentesisList = [];
    llavesList = [];
    simbolosList = [];
    unknownList = [];
    const lexer = new Lexer(editor);
    let token;
    while ((token = lexer.nextToken())) { }
    const data: Data = {
        reservedWordsList: Array.from(palabrasReservadasList).join(' , '),
        identifiersList: Array.from(identificadoresList).join(' , '),
        operatorList: Array.from(operadorList).join(' , '),
        parenthesesList: Array.from(parentesisList).join(' , '),
        bracesList: Array.from(llavesList).join(' , '),
        symbolsList: Array.from(simbolosList).join(' , '),
        unknownList: Array.from(unknownList).join(' , '),
    };
    return data;
};

export const cleanBtn = (): string => {
    palabrasReservadasList = [];
    identificadoresList = [];
    operadorList = [];
    parentesisList = [];
    llavesList = [];
    simbolosList = [];
    unknownList = [];
    return '';
};

export const exampleBtn = (): string => {
    const examples: string[] = [
        'fn setPassowrd(str pwd): void{}',
        'if 12 == age {}',
        'if algo != algo {}',
        'for(i = 0, 1 < 5, i ++){}',
        'str name: "leo";',
        'num age: 30;',
        'bool married: true;',
    ];
    return examples[Math.floor(Math.random() * examples.length)];
};
