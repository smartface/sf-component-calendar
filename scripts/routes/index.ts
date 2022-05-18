import {
  NativeRouter as Router,
  NativeStackRouter as StackRouter,
  Route,
  BottomTabBarRouter,
} from "@smartface/router";
import NewPage001 from "pages/newPage001";
import NewPage003 from "pages/newPage003";
import NewPage004 from "pages/newPage004";

const router = Router.of({
  path: "/",
  isRoot: true,
  routes: [
    StackRouter.of({
      path: "/pages",
      routes: [
        Route.of({
          path: "/pages/newPage001",
          build: (router, route) => {
            const newPage001 = new NewPage001(router, route);
            return newPage001;
          },
        }),
        Route.of({
          path: "/pages/newPage003",
          build: (router, route) => {
            const newPage001 = new NewPage003(router, route);
            return newPage001;
          },
        }),
        Route.of({
          path: "/pages/newPage004",
          build: (router, route) => {
            const newPage001 = new NewPage004(router, route);
            return newPage001;
          },
        }),
      ],
    }),
  ],
});

export default router;
