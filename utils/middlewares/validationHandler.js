//Validacion de datos
const joi = require('joi');
const boom = require('boom');

//esta funcion recibe los datos del usuario y un schema de como deberian ser los datos, devuelve un error
function validate(data, schema){
    const { error } = joi.validate(data, schema);
    return error;
}

//con la fucion validate comparamos la data del body con el schema  y en caso de devolver un error nos informa
//que los datos son invalidos
function validationHandler(schema, check = "body" ){
    return function(req, res, next){
        const error = validate(req[check], schema);
        error ? next(boom.badRequest(error)) : next();
    };
}

module.exports = validationHandler;