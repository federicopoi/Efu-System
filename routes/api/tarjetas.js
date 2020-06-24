const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Ticket Model
const Tarjeta = require("../../models/Tarjeta");

// @route GET api/tarjetas/
// @desc Get All Tarjetas
// @access Public
router.get("/", (req, res) => {
  Tarjeta.find()
    .sort({ color: -1 })
    .then((tarjetas) => res.json(tarjetas))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/tarjetas/
// @desc Create A Tarjeta
// @access Public
router.post("/", (req, res) => {
  const {
    numero,
    descripcion,
    color,
    detecto,
    prioridad,
    familia,
    maquina,
    equipo,
    tipodeRiesgo,
    riesgoInicial,
  } = req.body;

  // Simple validation
  if (
    !numero ||
    !descripcion ||
    !color ||
    !detecto ||
    !prioridad ||
    !familia ||
    !maquina ||
    !equipo ||
    !tipodeRiesgo ||
    !riesgoInicial
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  const nuevaTarjeta = new Tarjeta({
    numero,
    descripcion,
    color,
    detecto,
    prioridad,
    familia,
    maquina,
    equipo,
    tipodeRiesgo,
    riesgoInicial,
  });

  nuevaTarjeta.save().then((tarjeta) => res.json(tarjeta));
});

// @route POST api/tarjetas/amarilla
// @desc Create A Tarjeta
// @access Public
router.post("/amarilla", (req, res) => {
  const {
    numero,
    descripcion,
    color,
    detecto,
    prioridad,
    maquina,
    equipo,
    sustoExperimentado,
    sustoObservado,
    impactoAmbiente,
    sugerencia,
    tipodeRiesgo,
    riesgoInicial,
  } = req.body;

  // Simple validation
  if (
    !numero ||
    !descripcion ||
    !color ||
    !detecto ||
    !prioridad ||
    !maquina ||
    !equipo ||
    !sugerencia ||
    !tipodeRiesgo ||
    !riesgoInicial
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  const nuevaTarjeta = new Tarjeta({
    numero,
    descripcion,
    color,
    detecto,
    prioridad,
    maquina,
    equipo,
    sustoExperimentado,
    sustoObservado,
    impactoAmbiente,
    sugerencia,
    tipodeRiesgo,
    riesgoInicial,
  });

  nuevaTarjeta.save().then((tarjeta) => res.json(tarjeta));
});

// @route POST api/tarjetas/cerrar
// @desc Cerrar Tarjeta
// @access Public
router.post("/cerrar", (req, res) => {
  const {
    _id,
    inicioReparacion,
    finReparacion,
    responsable,
    tiempoEmpleado,
    causa,
    tareaRealizada,
    tipoAccion,
    materialUtilizado,
    convertida,
  } = req.body;

  // Simple validation
  if (
    !_id ||
    !inicioReparacion ||
    !finReparacion ||
    !responsable ||
    !tiempoEmpleado ||
    !tipoAccion ||
    !causa ||
    !tareaRealizada ||
    !materialUtilizado
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Cerrar Tarjeta  ", err);

    tarjeta.inicioReparacion = inicioReparacion;
    tarjeta.finReparacion = finReparacion;
    tarjeta.responsable = responsable;
    tarjeta.tiempoEmpleado = tiempoEmpleado;
    tarjeta.causa = causa;
    tarjeta.tareaRealizada = tareaRealizada;
    tarjeta.materialUtilizado = materialUtilizado;
    tarjeta.estado = "Cerrada";
    tarjeta.convertida = convertida;
    tarjeta.tipoAccion = tipoAccion;
    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route POST api/tarjetas/cerrar
// @desc Cerrar Tarjeta
// @access Public
router.post("/cerrar/amarilla", (req, res) => {
  const {
    _id,
    finReparacion,
    responsable,
    tareaRealizada,
    tipoAccion,
    riesgoFinal,
    verificacion,
    accionesComplementarias,
    convertida,
  } = req.body;

  // Simple validation
  if (
    !_id ||
    !riesgoFinal ||
    !finReparacion ||
    !responsable ||
    !tipoAccion ||
    !accionesComplementarias ||
    !tareaRealizada
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Cerrar Tarjeta  ", err);

    tarjeta.finReparacion = finReparacion;
    tarjeta.responsable = responsable;
    tarjeta.riesgoFinal = riesgoFinal;
    tarjeta.verificacion = verificacion;
    tarjeta.tareaRealizada = tareaRealizada;
    tarjeta.accionesComplementarias = accionesComplementarias;
    tarjeta.estado = "Cerrada";
    tarjeta.convertida = convertida;
    tarjeta.tipoAccion = tipoAccion;
    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route DELETE api/tarjetas/:id
// @desc Delete A Tarjeta
// @access Private
router.delete("/:id", (req, res) => {
  Tarjeta.findById(req.params.id)
    .then((tarjeta) => tarjeta.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
