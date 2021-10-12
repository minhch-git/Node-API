import ErrorResponse from "../utils/errorResponse";
import Bootcamp from "../models/Bootcamp";

class BootcampService {
  /**
   * Get bootcamps by filter
   * @param {object} filter
   */
  async find(filter = {}) {
    return await Bootcamp.find(filter);
  }

  /**
  * Find one 
  * @param {object} item
  */
  async findOne(item) {
    return await Bootcamp.findOne(item);
  }

  /**
   * Get bootcamps by filter
   * @param {object} filter
   * @returns query
   */
  findQuery(filter = {}) {
    return Bootcamp.find(filter);
  }
  /**
   * Find Bootcamp by id
   * @param {objectId} id
   */
  async findById(id) {
    return await Bootcamp.findById(id);
  }

  /**
   * Create new a Bootcamp
   * @param {object} item
   */
  async create(item) {
    return await Bootcamp.create(item);
  }

  /**
   * Find Bootcamp by id and update
   * @param {ObjectId} id
   * @param {Object} item
   */
  async findByIdAndUpdate(id, item) {
    return await Bootcamp.findByIdAndUpdate(id, item, { new: true });
  }

  /**
   * Delete bootcamp by id
   * @param {ObjectId} id
   *
   */
  async deleteById(id) {
    return await Bootcamp.findByIdAndDelete(id);
  }

  /**
     * Remove bootcamp by id
     * @param {ObjectId} id
     *
     */
  async removeById(id, user) {
    let bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
      new ErrorResponse('Bootcamp not found with id of ${id}', 404)
    }
    // Make sure user is bootcamp owner 
    if (bootcamp.user.toString() !== user.id && user.role !== 'admin') {
      return next(new ErrorResponse(`User ${id} is not authorized to upadate this bootcamp`, 404))
    }
    return bootcamp.remove()
  }

  /**
   * GET count bootcamps
   * @return NUMBER
   */
  async countDocuments() {
    return await Bootcamp.countDocuments();
  }

}
export default new BootcampService();
