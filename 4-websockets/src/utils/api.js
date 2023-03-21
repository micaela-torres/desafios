export const successResponse = (data) => {
    return {
        success: true,
        data
    };
};

export const errorResponse = (message) => {
    return {
        success: false,
        error: message
    }
}