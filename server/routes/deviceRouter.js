const Router = require("express");

const router = new Router();

const deviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.post("/", checkRole("ADMIN"), deviceController.create);
router.delete("/", deviceController.delete);

module.exports = router;
