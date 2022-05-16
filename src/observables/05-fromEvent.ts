import { fromEvent } from "rxjs";

// Eventos del DOM
// El evento se le pasará y retornará en el subscribe
// la información enviada.

// Forma generica (sin especificar el tipo)
// const src1$ = fromEvent(document, 'click');
// const src2$ = fromEvent(document, 'keyup');

// Si lo dejamos de forma generia cuando queramos utilizar
// los eventos o ver la información retornada por los eventos
// tendremos errores por que no sabemos de quien especificamente
// vienen los eventos, por lo que solo nos serviria mostrarla
// de la siguiente forma solo para saber el tipo de evento que
// estamos lanzando.

// src1$.subscribe(observer);
// src2$.subscribe(observer);

// Una vez sabiendo el tipo, lo mejor sería especificarlo para
// poder sacar los métodos y poder ejecutarlos sin problemas.

// Forma tipada (especificando el tipo)
const src1$ = fromEvent<PointerEvent>(document, 'click');
const src2$ = fromEvent<KeyboardEvent>(document, 'keyup');

const observer = {
    next: val => console.log('next', val)
    // next: val => console.log('next', val.offsetX)
}


// src1$.subscribe(ev => {
    // Estos no funcionarian si no especificamos el tipo de evento.
    // console.log(ev.x);
    // console.log(ev.y);
// });

// Pero también podemos trabajar con la destructuración.

src1$.subscribe(({x,y})=>console.log(x,y));



src2$.subscribe(evento => {
    
    // Este no funcionaria si no especificamos el tipo de evento.
    console.log(evento.key);

});