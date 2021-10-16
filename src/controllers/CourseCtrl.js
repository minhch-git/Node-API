import courseService from "../services/course.service";
import ErrorResponse from "../utils/errorResponse";
import bootcampService from '../services/bootcamp.service'
class CourseCtrl {
  /**
   * get courses
   * @GET api/v1/courses
   * @GET api/v1/bootcamps/:bootcampId/courses
   */
  async getCourses(req, res, next) {
    if (req.params.bootcampId) {
      let courses = await courseService.find({ bootcamp: req.params.bootcampId })
      return res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
      })
    }
    res.status(200).json(res.advancedResults)
  }

  /**
   * Get course
   * @GET api/v1/courses/:id
   */
  async getCourse(req, res, next) {

    const course = await courseService.findById(req.params.id)
    if (!course) {
      return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    }

    res.status(200).json({
      success: true,
      data: course
    })
  }

  /**
   * Add course
   * @POST api/v1/bootcamps/:bootcampId/courses
   */
  async addCourse(req, res, next) {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id 

    const bootcamp = await bootcampService.findById(req.params.bootcampId)
    if (!bootcamp) {
      return next(new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404))
    }
    // Make sure user is bootcamp owner 
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to ad a course to bootcamp ${bootcamp._id}`, 404))
    }    

    const course = await courseService.create(req.body)

    res.status(200).json({
      success: true,
      data: course
    })


  }

  /**
   * Update course
   * @PUT api/v1/course/:id
   */
  async updateCourse(req, res, next) {
    let course = await courseService.findById(req.params.id)
    if (!course) {
      return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    }
      // Make sure user is bootcamp owner 
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${id} is not authorized to ad a course to bootcamp ${bootcamp._id}`, 404))
    }    

    course = await courseService.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({
      success: true,
      data: course
    })
  }

  /**
  * Delete course
  * @DELETE api/v1/course/:id
  */
  async deleteCourse(req, res, next) {
    let course = await courseService.deleteById(req.params.id)
    if(!course) {
      return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    }
      // Make sure user is bootcamp owner 
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${id} is not authorized to ad a course to bootcamp ${bootcamp._id}`, 404))
    }    

    res.status(200).json({
      success: true,
      data: {}
    })
  }
}
export default new CourseCtrl();
