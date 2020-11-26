const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fileUpload = require("express-fileupload");
router.use(fileUpload());
// Campo Model
const Campo = require("../../models/Campo");

// @route GET api/campo/
// @desc Get All campos
// @access Public
router.get("/", (req, res) => {
  Campo.find()
    .then((campos) => res.json(campos))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/campos/
// @desc Create A Campo
// @access Public
router.post("/", (req, res) => {
  const { name, value } = req.body;
  const nuevoCampo = new Campo({
    name,
    value,
  });

  nuevoCampo.save().then((Campo) => res.json(Campo));
});

// @route DELETE api/campos/:id
// @desc Delete A Campo
// @access Public
router.delete("/:id", (req, res) => {
  Campo.findById(req.params.id)
    .then((campo) => campo.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;
