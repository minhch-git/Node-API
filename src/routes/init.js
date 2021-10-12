import { Router } from "express";
const router = new Router();

import bootcampRouter from "./bootcamp.route";
import courseRouter from "./course.route";
import authRouter from "./auth.route";

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter
  },
  {
    path: "/courses",
    route: courseRouter,
  },
  {
    path: "/bootcamps",
    route: bootcampRouter,
  },
];

defaultRoutes.forEach(route => router.use(route.path, route.route));

export default router;
