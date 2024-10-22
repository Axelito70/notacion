document.getElementById('NotacionPolaca').addEventListener('submit', function (event) {
    event.preventDefault();
    const expresion = document.getElementById('expresion').value; // Obtener la expresión ingresada

    // Validar si la expresión contiene letras o caracteres inválidos
    if (/[^0-9\s+\-*/]/.test(expresion)) {
        document.getElementById('error').style.display = 'block'; // Mostrar el error
        document.getElementById('resultado').innerText = ''; // Limpiar el resultado
        document.getElementById('polacaIngresada').innerText = ''; // Limpiar la notación polaca
        return; // Salir si hay caracteres inválidos
    } else {
        document.getElementById('error').style.display = 'none'; // Ocultar el error si no hay caracteres inválidos
    }

    const [expresionNormal, resultado] = evaluarPolaca(expresion); // Evaluar la expresión en notación polaca

    // Mostrar los resultados
    document.getElementById('resultado').innerText = `Expresión normal: ${expresionNormal}\nResultado: ${resultado}`;
    document.getElementById('polacaIngresada').innerText = expresion; // Mostrar la notación polaca ingresada
});

function evaluarPolaca(expresion) {
    const tokens = expresion.split(' ');
    const pila = [];
    const pilaNormal = [];

    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];
        if (!isNaN(token)) {
            pila.push(parseFloat(token)); // Si es un número, agregarlo a la pila
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
                    return ["Operador no válido", null];
            }

            pila.push(resultado);
            const notacionNormal = `(${pilaNormal.pop()} ${token} ${pilaNormal.pop()})`;
            pilaNormal.push(notacionNormal);
        }
    }

    return [pilaNormal.pop(), pila.pop()]; // Retornar la expresión normal y el resultado
}
