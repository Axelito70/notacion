document.getElementById('NotacionPolaca').addEventListener('submit', function (event) {
    event.preventDefault();
    const expresion = document.getElementById('expresion').value; // Obtener la expresion ingresada del usuaro
    const [expresionNormal, resultado] = evaluarPolaca(expresion); // Evaluar la expresion en notación polaca
    document.getElementById('resultado').innerText = `Expresión normal: ${expresionNormal}\nResultado: ${resultado}`;
});

function evaluarPolaca(expresion) {
    const tokens = expresion.split(' '); 
    const pila = []; // Crear una pila para los operandos
    const pilaNormal = []; // Crear una pila para la notación normal

    // Iterar sobre los tokens
    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i]; // Obtener el token actual
        if (!isNaN(token)) {
            pila.push(parseFloat(token)); // Si es un numero, agregarlo a la pila
            pilaNormal.push(token); // También agregar a la pila de notación normal
        } else {
            const operando1 = pila.pop(); 
            const operando2 = pila.pop(); 

            let resultado;
            // Realizar la operación según el operador
            switch (token) {
                case '+':
                    resultado = operando1 + operando2;
                    break;
                case '-':
                    resultado = operando1 - operando2;
                    break;
                case '*':
                    resultado = operando1 * operando2;
                    break;
                case '/':
                    resultado = operando1 / operando2;
                    break;
                default:
                    return ["Operador no valido", null]; // Manejar caso no valido
            }

            
            pila.push(resultado);

            // Crear la expresion en notasion normal
            const notacionNormal = `(${pilaNormal.pop()} ${token} ${pilaNormal.pop()})`;
            pilaNormal.push(notacionNormal); 
        }
    }

    return [pilaNormal.pop(), pila.pop()]; // Retornar la expresion normal y el resultado final
}
