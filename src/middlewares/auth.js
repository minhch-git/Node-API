import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import userService from '../services/user.service'

const jwtSecret = process.env.JWT_SECRET

const requiredLoggedIn = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}
	// else if (req.cookies.token) {
	// 	token = req.cookies.token
	// }
	if (!token) {
		return next(new ErrorResponse('Not authorization to access this route', 401))
	}
	try {
		// Verify token
		const decoded = jwt.verify(token, jwtSecret)
		req.user = await userService.findById(decoded.id)
		next()
	} catch (err) {
		return next(new ErrorResponse('Not authorization to access this route', 401))
	}
}

let authorize = (...roles) => (req, res, next) => {
	if(!roles.includes(req.user.role)) {
		return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
	}
	next()
}

export {
	requiredLoggedIn, authorize
}