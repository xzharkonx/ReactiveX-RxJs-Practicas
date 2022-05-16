import { of } from "rxjs";


// const obs$ = of(1,2,3,4,5,6); 
// Otra forma de enviarle argumentos puede ser con
// el operador sprear o combinando.
// Recuerda tipar la devolución y la entrada
const obs$ = of<number[]>(...[1,2,3,4,5,6],7,8,9); 


console.log('Inicio del Obs$');
// obs$.subscribe(
//     next => console.log('nex', next),
//     null,
//     () => console.log('Terminamos la secuencia')
// )

// Otra forma
// obs$.subscribe({
//     next: (next) => console.log('nex', next),
//     error: () => { null},
//     complete: () => console.log('Terminamos la secuencia')
// })

// Esto es lo mismo de arriba.
const subs1 = obs$.subscribe(console.log);
const subs2 = obs$.subscribe(console.log);
console.log('Fin del Obs$');

