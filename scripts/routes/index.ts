const buildExtender = require("@smartface/extension-utils/lib/router/buildExtender");

const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("@smartface/extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/newPage001",
                    build: buildExtender({ getPageClass: () => require("pages/newPage001").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/newPage003",
                    build: buildExtender({ getPageClass: () => require("pages/newPage003").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/newPage004",
                    build: buildExtender({ getPageClass: () => require("pages/newPage004").default, headerBarStyle: { visible: true } })
                }),
            ]
        })
    ]
});

export default router;