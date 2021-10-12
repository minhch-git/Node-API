import bootcampService from "../services/bootcamp.service";
import ErrorResponse from "../utils/errorResponse";
import geocoder from "../utils/geocoder";
class BootcampCtrl {
  /**
   * Get all bootcamps
   * @GET /api/v1/bootcamps/
   * @access publish
   */
  async getBootcamps(req, res, next) {
    res.status(200).json(res.advancedResults);
  }

  /**
   * Get single bootcamp
   * @GET /api/v1/bootcamps/:id
   * @access publish
   */
  async getBootcamp(req, res, next) {
    let bootcamp = await bootcampService.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  }

  /**
   * Create new bootcamp
   * @POST /api/v1/bootcamps/:id
   * @access private
   */
  async createBootcamp(req, res, next) {
    req.body.user = req.user
    const publishedBootcamp = await bootcampService.findOne({ user: req.user.id })
    if (publishedBootcamp && req.user.role !== 'admin') {
      return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400))
    }
    const bootcamp = await bootcampService.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
  }

  /**
   * Update bootcamp
   * @PUT /api/v1/bootcamps/:id
   * @access private
   */
  async updateBootcamp(req, res, next) {
    let id = req.params.id;
    let item = req.body;
    let bootcamp = await bootcampService.findById(id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404))
    }

    // Make sure user is bootcamp owner 
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${id} is not authorized to upadate this bootcamp`, 404))
    }

    bootcamp = await findByIdAndUpdate(id, item)
    res.status(200).json({ success: true, data: bootcamp });
  }

  /**
   * Delete bootcamp
   * @DELETE /api/v1/bootcamps/:id
   * @access private
   */
  async deleteBootcamp(req, res, next) {
    let bootcamp = await bootcampService.deleteById(req.params.id);
    res.status(200).json({ success: true, data: bootcamp });
  }


  /**
   * Remove bootcamp
   * @DELETE /api/v1/bootcamps/:id
   */
  async removeBootcamp(req, res, next) {
    let bootcamp = await bootcampService.removeById(req.params.id, req.user);
    res.status(200).json({ success: true, data: bootcamp });
  }


  /**
   * Get bootcamps within a radius
   * @GET /api/v1/bootcamps/radius/:zipcode/:distance
   */
  async getBootcampsInRadius(req, res, next) {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6.378 km
    const radius = distance / 3963;
    const bootcamps = await bootcampService.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  }
}

export default new BootcampCtrl();
