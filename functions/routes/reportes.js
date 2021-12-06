const {Router} = require("express");
const router = Router();
const admin = require("firebase-admin");
const db = admin.firestore();

router.post('/api/reportes',async(req, res) => {
    try {
      await db
        .collection("reportes")
        .doc("/" + req.body.id + "/")
        .create({ estado: req.body.estado,
          id_incidente: req.body.id_incidente,
          id_reporte: req.body.id_reporte,
          id_usuario: req.body.id_usuario,
         });
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  });

router.get("/api/reportes/:id_reporte", (req, res)=>{
  (async () => {
    try {
      const doc = db.collection("reportes").doc(req.params.id_reporte);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

router.get("/api/reportes", async (req, res) => {
  try {
    let query = db.collection("reportes");
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      estado: doc.data().estado,
      id_incidente: doc.data().id_incidente,
      id_reporte: doc.data().id_reporte,
      id_usuario: doc.data().id_usuario,
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/api/reportes/:id_reporte", async (req, res) => {
  try {
    const document = db.collection("reportes").doc(req.params.id_reporte);
    await document.update({
      estado: req.body.estado,
      id_incidente: req.body.id_incidente,
      id_reporte: req.body.id_reporte,
      id_usuario: req.body.id_usuario,
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

router.delete("/api/reportes/:id_reporte", async (req, res) => {
  try {
    const doc = db.collection("reportes").doc(req.params.id_reporte);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
