const {Router} = require("express");
const router = Router();
const admin = require("firebase-admin");
const db = admin.firestore();

router.post('/api/ubicaciones',async(req, res) => {
    try {
      await db
        .collection("ubicaciones")
        .doc("/" + req.body.id + "/")
        .create({ descripcion: req.body.descripcion,
          estado: req.body.estado,
          id_incidente: req.body.id_incidente,
          id_usuario: req.body.id_usuario,
          latitud_longitud:req.body.latitud_longitud,
         });
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  });

router.get("/api/ubicaciones/:id_ubicaciones", (req, res)=>{
  (async () => {
    try {
      const doc = db.collection("ubicaciones").doc(req.params.id_ubicaciones);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

router.get("/api/ubicaciones", async (req, res) => {
  try {
    let query = db.collection("ubicaciones");
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      descripcion: doc.data().descripcion,
      estado: doc.data().estado,
      id_incidente: doc.data().id_incidente,
      id_usuario: doc.data().id_usuario,
      latitud_longitud:doc.data().latitud_longitud,
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/api/ubicaciones/:id_ubicaciones", async (req, res) => {
  try {
    const document = db.collection("ubicaciones").doc(req.params.id_ubicaciones);
    await document.update({
      descripcion: req.body.descripcion,
      estado: req.body.estado,
      id_incidente: req.body.id_incidente,
      id_usuario: req.body.id_usuario,
      latitud_longitud:req.body.latitud_longitud,
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

router.delete("/api/ubicaciones/:id_ubicaciones", async (req, res) => {
  try {
    const doc = db.collection("ubicaciones").doc(req.params.id_ubicaciones);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
