import ApiError from "../error/Error.js"

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: `Непредвиденная afsfaf!+${JSON.stringify(err)}`})
}

export default errorHandler