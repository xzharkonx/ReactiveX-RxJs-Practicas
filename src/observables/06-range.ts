 
//  # Range
// * Nos crea un Observable que emite una secuencia de numeros en base a un rango.
// * Por defecto son sincornos pero pueden ser asincronos utilzando asyncScheduler.

import { asyncScheduler, of, range } from 'rxjs';

// - Con of lo que haremos será ir recorriendo ese listado de argumentos uno por uno,
// - por lo que para muchos datos sería muy tedioso llenarlo todo.
// const src$ = of(1,2,3,4,5);

// ## Trabajando con Range
// - El primer argumento determinará el inicio.
// - El segundo argumento determinará el fin.
// ! El tercer argumento es el scheduler pero se verá más adelante.
const src$ = range(0,10); // 0,1,2,3,4,5,6,7,8,9

// -- Para este caso, como el primer agumento tiene un valor base de 0,
// -- entonces con el argumento que agregamos definiremos cuantos numeros
// -- hacia adelante o hacia atras queremos contando incluso el 0 como una posición.
const src2$ = range(5); // 0,1,2,3,4

// !! Con valores negativos no trabaja.
const src3$ = range(-20); // No arroja ningún dato.



src$.subscribe(console.log);
src2$.subscribe(console.log);
src3$.subscribe(console.log); // !! No mostrará nada.  

// - Lo podemos transformar de manera asincrona mandando un asyncScheduler.
// - Básicamente cualquier función que resiva este asyncScheduler rage podemos
// - transformarla de ser sincrona a asincrona.
// -- Si eso es verdad veremos los mensajes de Inicio y Fin seguidos y luego
// -- el rango de números.

// const src4$ = range(1,5) // ! sincrono
const src4$ = range(1,5,asyncScheduler) // ? asincrono

console.log('Inicio');
src4$.subscribe(console.log);
console.log('Fin');