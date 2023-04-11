import { errorResponse, successResponse } from "./api.js";

export const validationProducts = (product) => {
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    } = product;

    if (
        title === undefined ||
        description === undefined ||
        code === undefined ||
        price === undefined ||
        status === undefined ||
        stock === undefined ||
        category === undefined ||
        thumbnails === undefined) {
        return errorResponse("Some field's undefined");

    } else if (
        title === null ||
        description === null ||
        code === null
        || price === null
        || status === null
        || stock === null
        || category === null
        || thumbnails === null) {

        return errorResponse("Some field's null");

    } else if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof code !== 'string' ||
        typeof price !== 'number' ||
        typeof status !== 'boolean' ||
        typeof stock !== 'number' ||
        typeof thumbnails !== 'string') {
        return errorResponse("Some field's invalid");

    } else {
        return successResponse(product)
    }
};

export const codeValidation = (allProducts, code) => {

    allProducts.find(element => element.code === code) && errorResponse('This code is used!');

};

export function validationNumber(num) {
    const isNumber = parseInt(Number(num))
    if (isNaN(isNumber)) throw new Error('Query not a number')
    if (isNumber === 0) return isNumber + 1
    return isNumber
}

export function limitProducts(arr, queryLimit = 5, queryPage = 1) {
    const limit = validationNumber(queryLimit)
    const page = validationNumber(queryPage)

    let productList = []
    if (page === 1) productList = arr.splice(0, limit)
    if (page !== 1) productList = arr.splice(limit * (page - 1), limit)
    return {
        limit,
        page,
        products: productList
    }
}