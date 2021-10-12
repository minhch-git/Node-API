import { Router } from "express";

import asyncHandler from "../middlewares/asyncHandler";
import courseRouter from './course.route.js'
import advancedResults from '../middlewares/advancedResults'
import { requiredLoggedIn, authorize } from '../middlewares/auth'

import BootcampCtrl from "../controllers/BootcampCtrl";
import Bootcamp from '../models/Bootcamp'
const router = new Router();

// Re-router into other resource routers
router.use('/:bootcampId/courses', courseRouter)
router
  .route("/radius/:zipcode/:distance")
  .get(asyncHandler(BootcampCtrl.getBootcampsInRadius));


router
  .route("/")
  .get(advancedResults(Bootcamp, 'courses'), asyncHandler(BootcampCtrl.getBootcamps))
  .post(requiredLoggedIn, authorize('publisher', 'admin'), asyncHandler(BootcampCtrl.createBootcamp));

router
  .route("/:id")
  .get(asyncHandler(BootcampCtrl.getBootcamp))
  .put(requiredLoggedIn, authorize('publisher', 'admin'),  asyncHandler(BootcampCtrl.updateBootcamp))
  // .delete(asyncHandler(BootcampCtrl.deleteBootcamp));
  .delete(requiredLoggedIn, authorize('publisher', 'admin'), asyncHandler(BootcampCtrl.removeBootcamp))


export default router;
