import { Observable, Observer } from "rxjs";

// Subscription y unsubscribe

// 2da Forma de manejar el subscribe (Mediante un Observer, más controlado)
// Importamos esta interfaz
const observer: Observer<any> = {

    next: value => console.log('siguiente [next]: ', value),
    error: error => console.warn('error [obs]: ', error),
    complete: () => console.log("Completado [obs]")

}

const intervalo$ = new Observable<number>(suscriber => {
   
    let contador: number = 0;
    
    // Para poder cancelar este intervalo y no se siga ejecutando
    // crearemos una reverencia a este.
    const interval = setInterval(()=>{
        
        suscriber.next(contador +=1)
        console.log(contador);
    },1000);

    setTimeout(() => {
        // Inmediatamente se ejecute está función
        // se ejecutará también el return del Observable,
        // y si se llamará al unsubscribe despues, este
        // ya no enjecutaría nada del return.
        suscriber.complete();
    }, 2500);

    // En este observable podemos mandar el return regresando
    // una función () => {} y dentro de las llaves el procedimiento
    // que quiero que se ejecute cuando se hace un unsubscribe.
    return () => {
        // Limpiamos el intervalo
        clearInterval(interval);
        console.log('Intervalo destruido');
    }
});

// Este suscribe nos retornará una Subscription
// que nos servirá para cancelar la subscripcion. 
// const subscription1 = intervalo$.subscribe(console.log);
const subscription1 = intervalo$.subscribe(observer);

// Aqui entramos con temas importantes de fugas de memoria.
// Creamos varias subscripciones.
// Mira que todo se repite el numero de veces según el número
// de subscripciones esto es porque tenemos ese número de observables.
// const subscription2 = intervalo$.subscribe(console.log);
const subscription2 = intervalo$.subscribe(observer);
const subscription3 = intervalo$.subscribe(observer);
 
// Es como si cada uno trabajara por su cuenta propia.

// Podemos encadenar subscripciones a la subscripción original.
// El add agrega un tear down que podría ser visto como una función
// cuando se llame el unsubscribe y también es usada para añadir una 
// subscripcion hija.
// De esa manera cuando yo llame al unsubscribe de la subscripcion1
// va a llamar la función que me va a limpiar el intervalo (la función
// return del observable).
subscription1.add(subscription2.add(subscription3));
// Así es como si ejecutaría todos los ubsubscribe simultaneamente.


// Mira que despues de 3 segundos cancelamos la subscripcion.
setTimeout(() => {
    
    // Cuando hacemos un unsubscribe se ejecuta el return del Observable.
    // Pero si ya se ejecuto el subscriber.complete() entonces el return
    // se ejecutará también por lo que ya no volverá a ejecutar el return.

    // Si se hace un ubsubscribe para una subscripcion derivada de un
    // observable obs$, entonces dejara de emitir lo del Observable,
    // y ejecutará el return pero solo para este observable (Variable),
    // sin embargo el Observable seguirá enviando información a los demás
    // observables. Tendrías que hacer un unsubscribe para cada uno de ellos.
    // Pero pueden encadenarse con add().
    // Como están encadenados con add, solo basta con
    // hacer un unsubscribe para la primera y así se
    // desubscribiran todos simultaneamente.
    // También solo ejecutará una sola vez la información del complete
    // del Observer en vez de que lo haga 1 por cada observer.
    subscription1.unsubscribe();
    // subscription2.unsubscribe();
    // subscription3.unsubscribe();
    console.log('Completado timeout');
}, 3000);
