const Sentry = require('@sentry/node');
const Boom = require('boom');
const { config } = require('../../config');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');

Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });

function withErrorStack(err, stack){
    if(config.dev){
        return { ...err, stack};
    }
}

function logErrors(err, req, res, next) {
    Sentry.captureException(err);
    console.log(err.stack);
    next(err);
}

function wrapErrors(err, req, res, next){
    if (!err.isBoom){
        next(Boom.badImplementation(err));
    }

    next(err);
}

function clienteErrorHandler(err, req, res, next){

    const {
        output: { statusCode, payload }
    } = err;

    // catch errors for AJAX request or if an errors ocurrs while streaming
    if(isRequestAjaxOrApi(req) || res.headersSent){
        res.status(statusCode).json(withErrorStack(payload, err.stack));
    }else{
        next(err)
    }
}

function errorHandler(err, req, res, next){

    const {
        output: { statusCode, payload }
    } = err;


    res.status(statusCode);
    res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    clienteErrorHandler,
    errorHandler
}