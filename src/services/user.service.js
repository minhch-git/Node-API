import User from "../models/User";

class UserService {
    /**
     * Create user
     * @param {Object(user)} body 
     * @returns promise
     */
    create(body) {
        return User.create(body);
    }

    /**
     * Find user by id
     * @param {ObjectId} id
     * @returns promise
     */
    findById(id) {
        return User.findById(id);
    }

    /**
     * Find user by email
     * @param {Object|email} email
     * @returns promise
     */
    findByEmail(email) {
        return User.findOne({
            email
        });
    }

    /**
     * Find one user by object
     * @param {Object} object
     * @returns promise
     */
    findOne(object) {
        return User.findOne(object);
    }
}
export default new UserService();
