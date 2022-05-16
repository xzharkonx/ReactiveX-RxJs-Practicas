
// Haciendo pruebas por ahora.

class CentroDeAtencion<T> {

    private val: any;
    constructor(fn:any){
       // fn();
    }

    subscribe(){
        
        return this;
    }
    

}


const centro = new CentroDeAtencion<number>(subs => {
    
    let val = 10;
    subs.next(val);
});


// const ok = (): any => {return ()=>console.log("hola mundo");};

const ok = (): any => {return ()=>console.log("hola mundo");};

const primeraFuncion = ok();
ok()(); // Se ejecutar la segunda función que está adentro.

primeraFuncion(); // Se ejecuta la segunda función desde una variable.