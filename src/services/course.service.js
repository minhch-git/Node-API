import Course from "../models/Course";

class CourseService {
  /**
   * Get courses by filter
   * @param {object} filter
   */
  async find(filter = {}) {
    return Course
      .find(filter).populate({
        path: 'bootcamp',
        select: 'name description '
      });
  }

  /**
   * Get courses by filter
   * @param {object} filter
   * @returns query
   */
  findQuery(filter = {}) {
    return Course.find(filter);
  }
  /**
   * Find course by id
   * @param {objectId} id
   */
  async findById(id) {
    return await Course.findById(id).populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }

  /**
   * Create new a Course
   * @param {object} item
   */
  async create(item) {
    return await Course.create(item);
  }

  /**
   * Find Course by id and update
   * @param {ObjectId} id
   * @param {Object} item
   */
  async findByIdAndUpdate(id, item) {
    return await Course.findByIdAndUpdate(id, item, { new: true, runValidators: true });
  }

  /**
   * Delete Course by id
   * @param {ObjectId} id
   *
   */
  async deleteById(id) {
    let course = await Course.findById(id)
    return await course.remove()
  }

  /**
   * GET count Courses
   * @return NUMBER
   */
  async countDocuments() {
    return await Course.countDocuments();
  }

}
export default new CourseService();
