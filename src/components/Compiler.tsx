"use client"
import { Textarea, Button } from "@nextui-org/react";
import { cleanBtn, validateBtn, exampleBtn } from "../scripts/lexer"
import {analyzeString} from "../scripts/parser"
import { useState } from "react"

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

    const handleSynatxBtn = () => {
        console.log(information)
        const data = analyzeString(information);
        console.log(data)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInformation(event.target.value);
    };
    return (
        <div className="bg-[#1e272e] border-l border-gray-500 w-full p-6 h-screen flex flex-col items-center overflow-auto">
            <div className="flex justify-center items-center text-2xl">
                <h3 className="text-[#dfe6e9] mt-6 font-medium">Analizador léxico</h3>
            </div>
            <div className="flex flex-col w-full gap-y-2">
                <Textarea
                    key="underlined"
                    variant="underlined"
                    id="editor"
                    label="Code"
                    value={information}
                    onChange={handleChange}
                    color='success'
                    labelPlacement="outside"
                    placeholder="Enter your example code"
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0"
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
            </div>
        </div>
    )
}
