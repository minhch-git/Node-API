import userService from "../services/user.service";
import ErrorResponse from "../utils/errorResponse";
import sendTokenResponse from '../utils/sendTokenResponse'
import httpStatus from 'http-status'

class AuthCtrl {
    
    /**
     * Register user
     * @POST api/v1/auth/register
     */
    async register(req, res, next) {
        const { name, email, password, role } = req.body
        let user = await userService.findByEmail(email)
        if(user) {
            return next(new ErrorResponse(`Email already exists!`))
        }

        user = await userService.create({ name, email, password, role })

        sendTokenResponse(user, 200, res)
        // let token = user.getSignedJwtToken()
        // res.status(httpStatus.CREATED).json({ success: true, token })
    }

    /**
     * Login user
     * @POST api/v1/auth/login
     */
    async login(req, res, next) {
        const { email, password } = req.body

        // Validate email & password
        if(!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 400))
        }

        // Check for user
        let user = await userService.findByEmail(email).select('+password')
        if(!user || !(await user.matchPassword(password))) {
            return next(new ErrorResponse('Invalid credentials', 400))   
        }

        sendTokenResponse(user, 200, res)
        // let token = user.getSignedJwtToken()
        // res.status(httpStatus.CREATED).json({ success: true, token })
    }


    /**
     * Get current logged in user 
     * @GEt api/v1/getMe
     * @access private
     */
    async getMe(req,res, next) {
        const user = await userService.findById(req.user._id)

        res.status(200).json({
            success: true,
            data: user
        })
    }

}

export default new AuthCtrl()
