const {validate} = require("bean-validator");
const {ErrorResponseDTO} = require("../dto/ErrorResponseDTO");

const validateBody = (DtoClass) => {
    return async (req, res, next) => {
        const dtoInstance = new DtoClass(...Object.values(req.body));
        const errorsMessage = validate(dtoInstance);

        if (Object.keys(errorsMessage).length > 0) {
            const errorResponse = new ErrorResponseDTO(
                req.path,
                400,
                errorsMessage
            );
            return res.status(400).json(errorResponse);
        }
        req.body = dtoInstance;
        next();
    }
}

module.exports = { validateBody };