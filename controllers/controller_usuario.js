const { request , response } = require('express');


const getUsuario = (req = request, res = response) =>{
    const query = req.query
    res.json({
        msg: 'get API -controller',
        query
    })
}


const postUsuario = (req, res) => {
    
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API',
        nombre,
        edad
    })
}

const putUsuario = (req = request, res) => {
    const {id} = req.params
    res.json({
        msg: 'put API',
        id
    })
}

const deleteUsuario = (req, res) => {
    res.json({
        msg: 'delete API'
    })
}

module.exports={
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}