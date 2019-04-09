//Validacion de datos

//esta funcion recibe los datos del usuario y un schema de como deberian ser los datos, devuelve un error
function validate(data, schema){
    return false;
}

//con la fucion validate comparamos la data del body con el schema  y en caso de devolver un error nos informa
//que los datos son invalidos
function validationHandler(schema, check = ["body"] ){
    return function(req, res, next){
        const error = validate(req[check], schema);
        error ? next(new Error(error)) : next();
    };
}

module.exports = validationHandler;