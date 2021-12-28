require('dotenv').config()
require('colors')
const {leerInput, inquireMenu,pausa,listarLugares}=require('./helpers/inquired');
const Busqueda = require('./models/Busqueda');
const busqueda= new  Busqueda();
const main =async ()=>{

    let opc='';
    do{
        console.clear();
        opc = await inquireMenu();

        switch (opc) {
            case 1:
                const termino = await leerInput('Ciudad : ');
                const lugares=await busqueda.ciudad(termino);
                const id = await listarLugares(lugares);
                 if(id!==0){
                   
                    const lugarSeleccionado=lugares.find(lugar=>lugar.id==id)
                    busqueda.agregarHistorial(lugarSeleccionado.nombre)
                    const clima= await  busqueda.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng);
      
                    console.log('\nInformacion de la ciuidad\n'.green);
                    console.log(`Ciudad : ${lugarSeleccionado.nombre}`)
                    console.log(`Lat : ${lugarSeleccionado.lat}`);
                    console.log(`Lng : ${lugarSeleccionado.lng}`);
                    console.log(`Temperatura : ${clima.main.temp} °C`);
                    console.log(`Min : ${clima.main.temp_min} °C`);
                    console.log(`Max : ${clima.main.temp_max} °C`)
                    console.log(`Como esta el clima : ${clima.weather[0].description}`)
                 }else{
                     console.log('Cancelado!!')
                 }
             

                break;

                case 2:{
                   
                    busqueda.historialCapitalizado.forEach((bus,i)=>console.log(`${`${i+1}.`.red} ${bus}\n`));
                }break;
        
            default:
                break;
        }
       opc!==0 && await pausa();
     
    }while(opc!==0)

    
// const  texto = await leerInput('digita algo');

}
main();