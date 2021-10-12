let jwtCookieExpire = process.env.JWT_COOKIE_EXPIRE
// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token 
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + jwtCookieExpire*24*60*60*1000), // 30days
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}

export default sendTokenResponse