const fs=require('fs')
const axios = require('axios');
const capitalize = require('capitalize');

class Busqueda{
    Historial=[];
     path='./db/database.json';
    constructor(){
        //leer base de datos
        this.leerDB();
    }


    get paramMapBox(){
        
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'languaje':'es'
        }
    }


    async ciudad (lugar){
        //Peticion HTTP
       try{

        const instance=axios.create({
            baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params:this.paramMapBox
        })

        const resp=await instance.get();
        return resp.data.features.map(lugar=>({
            id:lugar.id,
            nombre:lugar.place_name,
            lng:lugar.center[0],
            lat :lugar.center[1]
        }))



       }catch(e){
        return ['']//Retornara los lugares que coincidad 
       }

       
    }

    get paramOpenWeather(){
        
        return {
            appid:process.env.OPENWHEATHER_KEY,
            lang:'es',
            units:'metric'
        }
    }
    
    async climaLugar(lat,lon){
        try{

            const instance= axios.create({
                baseURL:'https://api.openweathermap.org/data/2.5/weather',
                params:{
                    ...this.paramOpenWeather,
                    lat,
                    lon,
                  
                    
                }
           
            })
            const res= await instance.get();
        
            return res.data

        }catch(e){
            console.log(e)
        }
    }


    agregarHistorial(lugar=''){
        console.log(`el lugar es : ${lugar}`)
        if(this.Historial.includes(lugar.toLocaleLowerCase())){
         
            return;
        }
       

        if(this.Historial.length >4){
        
           this.Historial.pop();
         
        }
      
        this.Historial.unshift(lugar.toLocaleLowerCase());
   
        this.guardarBD();  


    }


    guardarBD(){
      try{
        const payload={
            historial:this.Historial
        }

        fs.writeFileSync(this.path,JSON.stringify(payload))
      }catch(e){
          console.log(e)
      }


        
    }

    leerDB() {
        
        if( !fs.existsSync( this.path ) ) return;
       
      

        const info = fs.readFileSync( this.path, { encoding: 'utf-8' });
        const data = JSON.parse( info );
        this.Historial = data.historial;
    


    }

    get historialCapitalizado() {
        
    
            return this.Historial.map(lugar=>capitalize.words(lugar))

    }
}

module.exports=Busqueda;