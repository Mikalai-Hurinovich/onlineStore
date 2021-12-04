const Router = require("express");

const router = new Router();

const typeController = require("../controllers/typeController");

const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", typeController.getAll);
router.post("/", checkRole("ADMIN"), typeController.create);
router.delete("/", typeController.delete);

module.exports = router;
