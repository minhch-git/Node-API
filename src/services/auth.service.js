import userService from "./user.service";
import ErrorResponse from "../utils/errorResponse";

class AuthService {
    /**
     * Login with email and password
     * @param {Object(user)} body 
     * @returns promise
     */
    async loginWithEmailAndPassword(email, password) {
        // Check for user
        let user = await userService.findByEmail(email).select('+password')
        if(!user || !(await user.matchPassword(password))) {
            return next(new ErrorResponse('Invalid credentials', 400))   
        }
        return user
    }

    /**
     * Register
     */
    async register(body){
        let {name, email, password, role} = body
        let user = await userService.findByEmail(email)
        if(user) {
            throw new ErrorResponse(`Email already exists!`)
        }

        user = await userService.create(body)
        return user
    }
}
export default new AuthService();
