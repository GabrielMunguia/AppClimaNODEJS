const { green } = require('colors');
const inquirer= require('inquirer')
require('colors');

const preguntas =[
    {
        type: 'list',
        name :'option',
        message :'Que desea hacer?',
        choices:[
            {
                value:1,
                name:`${'1'.green}.Buscar clima ciudad`,
            },
            {
                value:2,
                name:`${'2'.green}.Historial de busquedas`,
            },
            {
                value:0,
                name:`${'0'.green}.Salir`,
            },
            
        ]
    }
]


const inquireMenu = async ()=>{
  
    console.log('=============================='.green)
    console.log('    Seleccione una opcion   '.white)
    console.log('==============================\n'.green)
   const {option}= await inquirer.prompt(preguntas)
   
 
   return option;
}


const pausa= async ()=>{


    const preguta=[{
        type:'input',
        name :'opcion',
        message:`Precione ${'ENTER'.green} para continuar ....`
    }]


    const {opcion}=await inquirer.prompt(preguta);
    return opcion;
}

const leerInput= async (message)=>{
    const question =[{
        type:'input',
        name:'desc',
        message,
        validate(value){
            if(value.length===0){
                return 'Error!: Ingrese algo ...';
            }
            return true;
        }
    }]

   const {desc}= await inquirer.prompt(question);
   return desc;

}


const listarLugares= async (lugares=[])=>{
    const choices=lugares.map(({id,nombre},i)=>{
        const idx=`${i+1}`.green;
        return {
            value:id,
            name:`${idx}. ${nombre}`
        }

    })

    choices.unshift({
        value:0,
            name:'0.'.green+"Cancelar"
    })

    const preguntas=[{
        type: 'list',
        name :'id',
        message :'Seleccione el lugar',
        choices
    }]
    const {id}= await inquirer.prompt(preguntas);
    return id;

}

const confirmar=async(message="")=>{

    const question =[{ type:'confirm',
    name :'ok',
    message}]

    const {ok}= await inquirer.prompt(question);
    return ok ;


}

const mostrarListadoCheckList= async(tareas)=>{
    const choices=tareas.map(({id,desc,completadoEn},i)=>{
        const idx=`${i+1}`.green;
        return {
            value:id,
            name:`${idx}. ${desc}`,
            checked:(completadoEn)?true:false
        }

    })

 
    const preguntas=[{
        type: 'checkbox',
        name :'ids',
        message :'Selecciones',
        choices
    }]
    const ids= await inquirer.prompt(preguntas);
    return ids;
}


module.exports={
    inquireMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}