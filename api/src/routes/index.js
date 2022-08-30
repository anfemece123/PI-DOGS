const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios =require ('axios');
// const Temperament = require('../models/Temperament');
const {Dog , Temperament} =require ('../db.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo= async()=>{
    const apiUrl= await axios.get(`https://api.thedogapi.com/v1/breeds`)
    const apiInfo = await apiUrl.data.map(elemento=>{
        return{
            id: elemento.id,
            name: elemento.name,
            weight: elemento.weight,
            height:elemento.height,
            life_span:elemento.life_span,
        }
    })
    return apiInfo
};

const getDbInfo= async()=>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            atributes:['name'],
            // through:{
            //     atributes:[],//!==============================================================================
            // },
        }
    })
}

const getAllDogs= async ()=>{
    const apiInfo = await getApiInfo();
    const DbInfo= await getDbInfo();
    const infoTotal = apiInfo.concat(DbInfo)
    return infoTotal
}

router.get('/dogs', async (req,res)=>{
    const name =req.query.name
    let dogstotal= await getAllDogs();
    if(name){
        let dogsName= await dogstotal.filter(i=> i.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length ? 
        res.status(200).send(dogsName):
        res.status(404).send('No se encuenta la raza, :c')
    }else{
        res.status(200).send(dogstotal)
    }
})

// router.get('/temperaments',async (req,res)=>{
//     const temperamentosApi= await axios.get(`https://api.thedogapi.com/v1/breeds`)
//     const temperamentos = temperamentosApi.data.map(el=>el.temperament)

// })

module.exports = router;
