/**
 * This function will be used as a template for building success response
 */
successResponseBody = (data, message = "Successfully processed the request") => ({
  success : true,
  data : data,
  err : null,
  message : message
});

/**
 * This function will be used as a template for building error response
 */
errorResponseBody = (err, message="Something went wrong") => ({
  success : false,
  err : err,
  data : null,
  message :  message
})

module.exports = {
  successResponseBody,
  errorResponseBody
}