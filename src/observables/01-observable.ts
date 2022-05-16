import { Observable, Observer } from "rxjs";

// 2da Forma de manejar el subscribe (Mediante un Observer, más controlado)
// Importamos esta interfaz
const observer: Observer<any> = {

    // next(){},
    // error(){},
    // complete(){}

    next: value => console.log('siguiente [next]: ', value),
    error: error => console.warn('error [obs]: ', error),
    complete: () => console.log("Completador [obs]")

}

// La Sintaxis de las variables finalizará con un signo de $
// para indicar que será un observable, esto por buenas prácticas.

// Esta es poco común, casi nunca se haría
// de esta manera.
// const obs$ = Observable.create();

// Tiene un tipo <unknown> el cuál podemos cambiar por 
// cualquiera como <string>
// Dentor del Objeto vamos a tener al subscriber de tipo Subscriber
// Por lo que es importarte siempre indicarle que trabajaremos
// con algún tipo de dato en específico.

// Esta definición de new Observable() nos va a permitir 
// crear "susbcripciones".
// Las subscripciones serán como gente que estará pendiente de las
// las emiciones del observable.

// Para que un Observable se ejecute tiene que tener por lo menos
// una subscripción. Tiene sentido porque nuestro subscriber va a
// notificar a las subscripciones y si no hay, pues no tiene que notificar.
// const obs$ = new Observable(subs => {
const obs$ = new Observable<string>(subs => {
    
    // Emitamos algún valor.
    subs.next("Hola")
    // Podemos clonar la línea y mira
    // que en consecuencia se ejecuta también.
    subs.next("Mundo")
    
    
    // Mira como le pasa ese valor y se lo envia de retorno
    // a la funcion subscribe.
    
    //  El error tiene que suceder antes de que el subscriber
    // emita el complete.
    // Forzar un error
    const a = undefined;
    a.luis = "Luis";

    // Mira que complete es la barrera del emisor
    // por lo que vaya despues no se emitira.
    subs.complete();
    subs.next("Hola")
    subs.next("Mundo")





});

// 1ra Forma de manejar el subscribe (enviando solo la respuesta).
// Para ver la respuesta que tenemos.
// obs$.subscribe(resp => console.log(resp));
// Cambiamos lo de arriba por lo de abajo es igual y más simple.
obs$.subscribe(console.log);

// Si le enviamos la misma información en el subscribe a otro, RxJs lo
// reconocerá, por lo tanto no enviará 2 veces lo mismo colocado
// en el Observable

// Hay 3 posibles argumentos que nosotros podemos mandarle al subscribe
// 1.- El que tenemos definido de respuesta "resp => console.log(resp)"
//     Basicamente lo que hace es procesar el next del susbcriber.
//     Por eso, si solo le mandamos "console.log" será lo mismo.
// 2.- Le podemos pasar un PartialObserver, o bien un Observer.
// 3.- Manejandola definiendo 3 callbacks o funciones.
//     La 1ra sería para manejar el next()
//     Este next aunque es opcional siempre se va a ejecutar cada vez
//     que el observable emita un valor.
//    La 2da será el error que lo podemos enviar o no.
//    La 3ra será el complete que este no recibe ningún argumento ni nada.
//    Todo este susbcribe retornará algo de tipo subscription.

// 2da Forma de manejar el subscribe (Mediante un Observer, más controlado)
// Importamos esta interfaz
obs$.subscribe(observer); 

// 3ra Forma de manejar el subscribe (enviando la respuesta, el error,
// y una fn de completado).
obs$.subscribe(
    valor => console.log('next: ', valor),
    error => console.warn('error: ', error),
    () => console.info('Completado')
);

// También podemos variar el orden en que le pasamos las funciones
// o incluso dejar nulas algunas.