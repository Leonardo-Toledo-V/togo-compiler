"use client"
import { Button } from "@nextui-org/react";
import { cleanBtn, validateBtn, exampleBtn } from "../scripts/lexer"
import { analyzeString } from "../scripts/parser"
import { useState } from "react"
import MonacoEditor from 'react-monaco-editor';

export interface Data {
    reservedWordsList: string;
    identifiersList: string;
    operatorList: string;
    parenthesesList: string;
    bracesList: string;
    symbolsList: string;
    unknownList: string;
}

export default function Compiler() {
    const [information, setInformation] = useState<string>();
    const [data, setData] = useState<Data | undefined>(undefined);
    const [msg, setMsg] = useState<string[]>([]);
    const [msgError, setMsgError] = useState<string[]>([]);

    const handleCleanBtn = () => {
        const value = cleanBtn();
        setData({
            reservedWordsList: "",
            identifiersList: "",
            operatorList: "",
            parenthesesList: "",
            bracesList: "",
            symbolsList: "",
            unknownList: "",
        })
        setMsg([]);
        setMsgError([]);
        setInformation(value);
    };

    const handleExampleBtn = () => {
        const value = exampleBtn();
        setInformation(value);
    };

    const handleValidateBtn = () => {
        const data = validateBtn(information);
        setData(data)
    };

    function isError(message: any) {
        return message.startsWith("Error:");
    }

    const handleSynatxBtn = () => {
        setMsg([]);
        setMsgError([]);
        const msg = analyzeString(information);
        const newMsg = [];
        const newMsgError = [];
        
        console.log(msg);
        for (let i = 0; i < msg.length; i++) {
            if (isError(msg[i])) {
                newMsgError.push(msg[i]);
            } else {
                newMsg.push(msg[i]);
            }
        }

        setMsg(newMsg);
        setMsgError(newMsgError);
    };



    return (
        <div className="bg-[#1e272e] border-l border-gray-500 w-full p-6 h-screen flex flex-col items-center overflow-auto">
            <div className="flex justify-center items-center text-2xl">
                <h3 className="text-[#dfe6e9] mt-6 font-medium">Analizador léxico</h3>
            </div>
            <div className="flex flex-col w-full gap-y-4">
                <MonacoEditor
                    className="pt-2"
                    height="170"
                    language="plaintext"
                    theme="vs-dark"
                    value={information}
                    onChange={setInformation}
                />
                <Button
                    onPress={handleValidateBtn}
                    radius='sm'
                    variant="ghost"
                >
                    Analizar
                </Button>
                <Button
                    onPress={handleSynatxBtn}
                    radius='sm'
                    variant="ghost"
                >
                    Sintaxis
                </Button>
                <Button
                    onPress={handleExampleBtn}
                    radius='sm'
                    variant="ghost"
                >
                    Ejemplos
                </Button>
                <Button
                    onPress={handleCleanBtn}
                    radius='sm'
                    variant="ghost"
                >
                    Limpiar
                </Button>
            </div>
            <div className="w-full">
                <h3 className="text-[#dfe6e9] mt-6 font-medium">Analizador léxico</h3>
                <div
                    className="-mx-4 mt-4 ring-1 ring-gray-500 sm:-mx-6 md:mx-0 md:rounded-sm"
                >
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400"
                                >
                                    Tokens
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"
                                >
                                    Lexema
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.reservedWordsList && (
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Palabras Reservadas:</td>
                                    <td className="pr-4 pl-3 text-sm text-[#dfe6e9]">{data.reservedWordsList}</td>
                                </tr>
                            )}
                            {data?.identifiersList && (
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Identificadores:</td>
                                    <td className="pr-4 pl-3 text-sm text-[#dfe6e9]">{data.identifiersList}</td>
                                </tr>
                            )}
                            {data?.operatorList && (
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Operadores:</td>
                                    <td className="pr-4 pl-3 text-sm text-[#dfe6e9]">{data.operatorList}</td>
                                </tr>
                            )}
                            {data?.parenthesesList && (
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Paréntesis:</td>
                                    <td className="pr-4 pl-3 text-sm text-[#dfe6e9]">{data.parenthesesList}</td>
                                </tr>
                            )}
                            {data?.bracesList && (
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Llaves:</td>
                                    <td className="pr-4 pl-3 text-sm text-[#dfe6e9]">{data.bracesList}</td>
                                </tr>
                            )}
                            {data?.symbolsList && (
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Símbolos:</td>
                                    <td className="pr-4 pl-3 text-sm text-[#dfe6e9]">{data.symbolsList}</td>
                                </tr>
                            )}
                            {data?.unknownList && (
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Desconocido:</td>
                                    <td className="pr-4 pl-3 text-sm text-[#dfe6e9]">{data.unknownList}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h3 className="text-[#dfe6e9] mt-6 font-medium">Analizador Sintáctico:</h3>
                <div className="text-[#dfe6e9] mt-6 font-sm">
                    {msg.map((item, i) => (
                        <p key={i} className="bg-[#05c46ba6] pl-4 pt-0.5 text-[#dfe6e9] font-bold rounded-md mb-3">
                            {item}
                        </p>
                    ))}
                    {msgError && msgError.length > 0 && (
                        msgError.map((item, i) => (
                            <p key={i} className="bg-[#ff6b6b] pl-4 pt-0.5 text-[#dfe6e9] font-bold rounded-md mb-3">
                                {item}
                            </p>
                        ))
                    )}

                </div>
            </div>
        </div>
    )
}
