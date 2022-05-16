import { Observable, Observer, Subject } from "rxjs";

// # Subscription y unsubscribe

// 2da Forma de manejar el subscribe (Mediante un Observer, más controlado)
// Importamos esta interfaz
const observer: Observer<any> = {

    next: value => console.log('siguiente [next]: ', value),
    error: error => console.warn('error [obs]: ', error),
    complete: () => console.log("Completado [obs]")

}

const intervalo$ = new Observable<number>(subs => {
    
    const intervalID = setInterval(
        () => {
            subs.next( Number( (  Math.random()*10  ).toFixed(2) ) );
            // Se seguira ejecutando por que aun no lo hemos
            // unsubscrito.
            console.log("Ejecutando...");
        },
        1000);
        // ----------------------------------------------------
        // O a menos de que hagamos un subs.complete()
        // Pero esto sería aquí por dentro, y queremos verlo
        // por fuera en el subject.

        // setTimeout(() => {
        // Inmediatamente se ejecute está función
        // se ejecutará también el return del Observable,
        // y si se llamará al unsubscribe despues, este
        // ya no enjecutaría nada del return.
        //     subs.complete();
        //     }, 3500);
        // ---------------------------------------------------

        return () => {
            // No se ejecutará a menos de que lo hayamos unsubscrito.
            clearInterval(intervalID);
            console.log('Intervalo destruido');            
        };
});

// * Creamos las subscripciones para poder ejecutar.
// - Mira que trabajan de forma independiente generando números 
// const subs1 = intervalo$.subscribe( rnd => console.log('subs1', rnd)); 
// const subs2 = intervalo$.subscribe( rnd => console.log('subs2', rnd)); 

// random distintos, pero ahora haremos que corran de forma igual
// con los mismos valores.

// ## Caracteristicas del Subject
/**
 * 1- Casteo múltiple
 * 2- También es un observer
 * 3- Next, error y complete
 */

// * Al subscribirlo en un Observable podemos producirle data a ese observable
// * con next() o hacer un complete() a ese observable.
const subject$ = new Subject(); 
                                

// Ahora añadiremos el subject$ a nuestro subscribe de intervalos.
// Para poder utilizar un unsubscribe es necesario colocarla en una variable.
const subscription = intervalo$.subscribe(subject$);

// Fue como un paso adicional aquí, pero ahora hacemos el subscribe
// desde el subject$.
// const subs1 = subject$.subscribe( rnd => console.log('subs1', rnd)); 
// const subs2 = subject$.subscribe( rnd => console.log('subs2', rnd));
const subs1 = subject$.subscribe( observer); // Se convertira en una subscripción.
const subs2 = subject$.subscribe( observer); // Se convertira en una subscripción.

// Mirá como ahora si trabajan de forma asincrona.

// Ahora trataremos de detenerlos luego de 3.5 segundos.
// Mira que cuando lo hacemos, enviamos nuevamente el valor de 10
// por que también el subject es un observer y también se detiene
// porque el complete se ejecuta y tiene una logica en el return del
// Observable para detener el timeout.
setTimeout( () => {
    subject$.next(10);
    // Con el complete solo detendremos el Observable pero no al
    // timeout que tiene corriendo dentro, para detenerlo
    // hay que desubscribirlo.
    subject$.complete();
    // Al desubscribir ejecutará el return del Observable
    // y detendrá el timeout.
    // subs1.unsubscribe(); // Puedes desubscribir solo este.
    subscription.unsubscribe(); // Puedes desubscribir todos a la vez.
}, 3500 );

// * Cuando la data es producida por el observable en sí mismo, es
// * considerado un "Cold Observable". Pero cuando la data es
// * producida FUERA del observable es llamado Hot Observable.

// Entonces un subject nos permite transformar un Cold Observable
// en un Hot Observable