import { Router } from "express";
import CourseCtrl from "../controllers/CourseCtrl";
import asyncHandler from "../middlewares/asyncHandler";
import Course from '../models/Course'
import advancedResults from '../middlewares/advancedResults'
import { requiredLoggedIn, authorize } from '../middlewares/auth'
const router = new Router({ mergeParams: true });
router.route("/")
  .get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description '
  }), asyncHandler(CourseCtrl.getCourses))
  .post(requiredLoggedIn, authorize('publisher', 'admin'), asyncHandler(CourseCtrl.addCourse))

router
  .route("/:id")
  .get(asyncHandler(CourseCtrl.getCourse))
  .put(requiredLoggedIn,  authorize('publisher', 'admin'), asyncHandler(CourseCtrl.updateCourse))
  .delete(requiredLoggedIn, authorize('publisher', 'admin'),  asyncHandler(CourseCtrl.deleteCourse));

export default router;
