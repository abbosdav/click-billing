Click to'lov tizimi bilan integratsiya

const Click = require("click-billing"); const secret_key = .env.SECRET_KEY const click_obj = new Click({secret_key});

router.post("/prapare", (req, res)=>{ const order = { _id: null, amount : null, status: null }; let result = click_obj.create_obj_val(req.body, order) res.json(result) })

router.post("/complate", (req, res)=>{ const order = { _id: null, amount : null, status: null }; let result = click_obj.create_obj_val(req.body, order) res.json(result) })