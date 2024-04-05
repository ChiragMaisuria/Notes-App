export const setResponse = (data, response)=>{
    response.status(200);
    response.json(data);
}

export const setError = (err, response) => {
    if(err.name === 'ValidationError'){
        response.status(400);
        response.json({
            error: {
                code: "Missing required attributes",
                message: "Invalid POST request."
            }
        })
    }else{
        response.status(500);
        response.json({
            error: {
                code: "Internal Server Error",
                message: "Something went wrong. Internal Server Error, Try again after sometime."
            }
        })
    }
}