import authService from "../services/auth.service";
import crypto from 'crypto-js';
import userService from "../services/user.service";
import ErrorResponse from "../utils/errorResponse";
import sendTokenResponse from '../utils/sendTokenResponse';
import sendMail from '../config/mailer';
import httpStatus from 'http-status';

class AuthCtrl {

    /**
     * Register user
     * @POST api/v1/auth/register
     */
    async register(req, res, next) {
        let user = await authService.register(req.body);
        sendTokenResponse(user, 200, res);
    // let token = user.getSignedJwtToken()
    // res.status(httpStatus.CREATED).json({ success: true, token })
    }

    /**
     * Login user
     * @POST api/v1/auth/login
     */
    async login(req, res, next) {
        const {email, password} = req.body;

        // Validate email & password
        if (!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 400));
        }

        let user = await authService.loginWithEmailAndPassword(email, password);
        sendTokenResponse(user, 200, res);
    }


    /**
     * Get current logged in user 
     * @GET api/v1/getMe
     * @access private
     */
    async getMe(req, res, next) {
        const user = await userService.findById(req.user._id);

        res.status(200).json({
            success: true,
            data: user
        });
    }


    /**
     * Forgot password
     * @POST api/v1/forgot-passowrd
     * @access public
     */
    async forgotPassword(req, res, next) {
        const user = await userService.findByEmail(req.body.email);
        if (!user) {
            return next(new ErrorResponse('There is no user with that email', 404));
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({
            validateBeforeSave: false
        });
        let to = user.email;
        let subject = "Reset Password";
        let linkResetPasswd = `${req.protocol}://${req.get('host')}/api/auth/v1/reset-password/${resetToken}`;
        let htmlContent = `
               <h2>Bạn nhận được email này vì đã yêu cầu reset mật khẩu trên ứng dụng chat app.</h2>
                  <h3>Vui lòng click vào liên kết bên dưới để xác nhận tạo lại mật khẩu mới.</h3>
                  <h3 style="display:flex; justify-content: center">
                    <a href="${linkResetPasswd}" style="text-align: center;background: #4bff00;
                  padding: 10px;border-radius: 4px;color: #131010;text-decoration: none;"
                  target="_blank">Tạo mật khẩu mới</a>
                  </h3>
                  <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng</h4>
            `;
        try {


            await sendMail(to, subject, htmlContent);

            res.status(200).json({
                success: true,
                data: 'Email sent'
            });
        } catch ( error ) {

            console.log({
                sendMailFailure: error
            });
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({
                validateBeforeSave: false
            });

            return next(new ErrorResponse('Email could not be sent', 500));
        }
    }



    /**
     * Reset password
     * @PUT api/v1/reset-passowrd/:resetToken
     * @access public
     */
    async resetPassword(req, res, next) {
        let resetPasswordToken = crypto.SHA256(req.params.resetToken).toString(crypto.enc.Hex);
        const user = await userService.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });
        if (!user) {
            return next(new ErrorResponse('Invalid token', 400));
        }

        // set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        sendTokenResponse(user, 200, res);
    }

}

export default new AuthCtrl()
