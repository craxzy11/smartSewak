const { getAvailableSlot } = require("../controller/timingController");

const router = require("express").Router();

router.get("/", getAvailableSlot);

module.exports=router;