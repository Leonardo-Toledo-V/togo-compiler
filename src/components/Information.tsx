import React from 'react'

export default function Information() {
    return (
        <div className="h-full bg-[#1e272e] w-full p-6 flex items-center flex-col">
            <div className="relative overflow-auto pt-6">
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-prose text-lg">
                        <h1>
                            <span className="block text-center text-lg font-semibold text-[#dfe6e9]">
                                Información
                            </span>
                            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-[#dfe6e9] sm:text-4xl">
                                Togo Lang
                            </span>
                        </h1>
                        <p className="mt-8 text-gray-500">
                            Togo, es un lenguaje de programación pensado y diseñado para ser
                            fácil de leer, escribir y entender, con el único propósito
                            académico para la asignatura de{' '}
                            <strong>Compiladores e Intérpretes</strong> de la carrera de IS
                            de la <strong>Universidad Politécnica de Chiapas</strong>.
                        </p>
                    </div>
                    <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
                        <p>
                            Está basado en lenguajes de programación como{' '}
                            <strong>Go</strong>, <strong>Python</strong> y{' '}
                            <strong>Javascript</strong>.
                        </p>
                        <p>
                            En esta sección verás cómo es la gramática de cuatro estructuras
                            del lenguaje, y en el panel derecho, podrás escribir y probar el
                            lenguaje.
                        </p>
                        <br />
                        <h2 className="font-bold text-xl">Variables:</h2>
                        <p>La declaración de variables siguen la siguiente estructura:</p>
                        <code>type name: value;</code>
                        <p>
                            Donde{' '}
                            <code className="bg-[#353b48] rounded-md px-3">type</code> puede ser
                            algunos de los tipos de variable permitidas en Togo, como:{' '}
                            <code className="bg-[#353b48] rounded-md px-3">num</code>,{' '}
                            <code className="bg-[#353b48] rounded-md px-3">str</code>,{' '}
                            <code className="bg-[#353b48] rounded-md px-3">bool</code>.
                        </p>
                        <p>
                            Ahora,
                            <code className="bg-[#353b48] rounded-md px-3">name</code> hace
                            referencia al nombre que se le asignará a la variable, este
                            puede ser por ejemplo:
                            <code className="bg-[#353b48] rounded-md px-3">counter1</code>.
                        </p>
                        <br />
                        <h2 className="font-bold text-xl">Funciones</h2>
                        <p>La estructura principal de la funciones es la siguiente:</p>
                        <code className="bg-[#353b48] rounded-md px-3">
                            fn name(type param):typereturn{ }
                        </code>
                        <p>
                            El símbolo <code className="bg-[#353b48] rounded-md px-3">fn</code>,
                            es una palabra clave reservada, utilizada definir una función,
                            mientras que
                            <code className="bg-[#353b48] rounded-md px-3">name</code> es el
                            nombre de la función, que al igual que los nombres de variable,
                            puede ser cualquier nombre alfanumérico, que no empiece con un
                            dígito.
                        </p>
                        <p>
                            Posteriormente, se localizan los parámetros de la función, que
                            van encerrados entre símbolos de parentesis (<code
                                className="bg-[#353b48] rounded-md px-3"
                            >()</code
                            >), y dentro, los parámetros tienen la siguiente estructura:
                            <code className="bg-[#353b48] rounded-md px-3">type param</code>,
                            donde
                            <code className="bg-[#353b48] rounded-md px-3">type</code>
                            corresponde al tipo de parámetro que recibirá la función, que
                            pueden ser los mismos tipos que tienen las variables:
                            <code className="bg-[#353b48] rounded-md px-3">num</code>,
                            <code className="bg-[#353b48] rounded-md px-3">str</code> y
                            <code className="bg-[#353b48] rounded-md px-3">bool</code>; y
                            <code className="bg-[#353b48] rounded-md px-3">param</code>, que
                            corresponde al nombre del parámetro, que puede ser cualquiera,
                            siempre que contenga únicamente carácteres alfanuméricos y no
                            empiece con dígito.
                        </p>
                        <h2 className="font-bold text-xl mt-8">Condicionales</h2>
                        <p>Las condicionales en Togo tienen la siguiente estructura:</p>
                        <code className="bg-[#353b48] rounded-md px-3"
                        >if var op var {'{code}'}</code>
                        <p>
                            Donde <code className="bg-[#353b48] rounded-md px-3">if</code> es la
                            palabra clave reservada para definir una condicional. La clave
                            <code className="bg-[#353b48] rounded-md px-3">var</code>
                            puede ser un nombre de varible declarada con anterioridad, un
                            string o un número.
                        </p>
                        <p>
                            La referencia
                            <code className="bg-[#353b48] rounded-md px-3">op</code> hace
                            referencia a los operadores admitidos en Togo, como pueden ser
                            <code className="bg-[#353b48] rounded-md px-3">{'>'}</code>,
                            <code className="bg-[#353b48] rounded-md px-3">{'<'}</code>,
                            <code className="bg-[#353b48] rounded-md px-3">==</code>,
                            <code className="bg-[#353b48] rounded-md px-3">!=</code>.
                        </p>
                        <p>
                            Y por último, dentro de las llaves <code
                                className="bg-[#353b48] rounded-md px-3"
                            >{'{}'}</code> podrá ir cualquier otra instrucción.
                        </p>
                        <h2 className="font-bold text-xl mt-6">Ciclo <em>for</em></h2>
                        <p>
                            Togo permite una única forma te iteración, que es a través un
                            ciclo <code className="bg-[#353b48] rounded-md px-3">for</code>, el
                            cual sigue la siguiente estructura:
                        </p>
                        <code className="bg-[#353b48] rounded-md px-3">
                            for(iterable: initial, iterable op goal, iterable increment){
                                '{code}'}
                        </code>
                        <p>
                            Donde <code className="bg-[#353b48] rounded-md px-3">for</code> es
                            la palabra clave reservada para iniciar un ciclo, luego continua
                            con la declaración de las variables iterables, que van dentro de
                            paréntesis (<code className="bg-[#353b48] rounded-md px-3">()</code
                            >), y en la referencia
                            <code className="bg-[#353b48] rounded-md px-3">iterable</code>,
                            damos a entender el valor inicial de nuestra variable que será
                            con la que se iterarás, esta pueda ser definida dentro del ciclo
                            o únicamente llamada.
                        </p>
                        <code className="bg-[#353b48] rounded-md px-3">
                            {'for(alumno: 0, alumno < 30, alumno++){code}'}
                        </code>
                        <p>
                            O bien, puedes poner el nombre de una sola variable, que ya haya
                            sido declarada para usarla dentro del for, como se muestra a
                            continuación:
                        </p>
                        <code className="bg-[#353b48] rounded-md px-3">
                            {'for(alumno, alumno < 30, alumno++){ code }'}
                        </code>
                        <p>
                            Siguiendo con la estructura del for, tenemos la parte de
                            <code className="bg-[#353b48] rounded-md px-3"
                            >iterable op goal</code
                            >, que hace referencia al valor donde el ciclo deberá detenerse,
                            donde
                            <code className="bg-[#353b48] rounded-md px-3">iterable</code> es el
                            valor que definimos como iterador inicial,
                            <code className="bg-[#353b48] rounded-md px-3">op</code> hace
                            referencia al operador lógico, que son los mismos que usan
                            dentro de las condicionales:
                            <code className="bg-[#353b48] rounded-md px-3">{'>'}</code>,
                            <code className="bg-[#353b48] rounded-md px-3">{'<'}</code>,
                            <code className="bg-[#353b48] rounded-md px-3">==</code>,
                            <code className="bg-[#353b48] rounded-md px-3">!=</code>; y
                            <code className="bg-[#353b48] rounded-md px-3">goal</code>
                            es el valor al cual se debe de comparar el iterable para que
                            termine el ciclo, que puede ser otra variable, o un numero
                            escrito, como se muestra en el siguiente segmento de código:
                        </p>
                        <code className="bg-[#353b48] rounded-md px-3">
                            {'for(alumno, alumno < 30, alumno++){ code }'}
                        </code>
                        <p>
                            Luego continuamos con la sección de
                            <code className="bg-[#353b48] rounded-md px-3"
                            >iterator increment</code
                            >, donde
                            <code className="bg-[#353b48] rounded-md px-3">increment</code> hace
                            referencia a los operadores de incremento y decremento de Togo,
                            que son <code className="bg-[#353b48] rounded-md px-3">++</code> y
                            <code className="bg-[#353b48] rounded-md px-3">--</code>.
                        </p>
                        <h3>Ejemplos</h3>
                        <code className="bg-[#353b48] rounded-md px-3">
                            {'for(foo: 1, foo < 5, foo++){ code }'} <br />
                        </code>
                        <h2 className="font-bold text-xl mt-6">Autores</h2>
                        <p>Lenguaje diseñado y programado por:</p>
                        <ul className="mb-12">
                            <li>Leonardo Toledo Velazco</li>
                            <li>Alexander Pérez Mendoza</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
