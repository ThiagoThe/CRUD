var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET edit page --carregara os dados do cliente para edicao no mesmo formulario de cadastro-- */
router.get("/edit/:id", async function (req, res, next) {
  const id = req.params.id;
  const doc = await db.findOne(id);
  res.render("new", {
    title: "Edição de Cliente",
    doc,
    action: "/edit/" + doc._id,
  });
});

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    res.render("index", { docs: await db.findAll() });
  } catch (ex) {
    res.redirect(`/erro=${ex}`);
  }
});

/* GET new page. --renderiza a view news.ejs-- */
router.get("/new", function (req, res, next) {
  res.render("new", {
    title: "Cadastro de Cliente",
    action: "/new",
    doc: {},
  });
});

/* GET delete page --exclusao de cadastro-- */
router.get("/delete/:id", async function (req, res) {
  const id = req.params.id;
  await db.deleteOne(id);
  res.redirect("/?delete=true");
});

/* POST new page. --recebe os posts vindos no form da pag new.ejs-- */
router.post("/new", async function (req, res) {
  const nome = req.body.nome;
  const nascimento = req.body.nascimento;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  await db.insert({ nome, nascimento, cidade, uf });
  res.redirect("/?new=true");
});

/** POST edit page --recebe o POST em edit com o id do cliente q esta sendo editado e chama a funcao update-- */
router.post("/edit/:id", async function (req, res) {
  const id = req.params.id;
  const nome = req.body.nome;
  const nascimento = req.body.nascimento;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  await db.update(id, { nome, nascimento, cidade, uf });
  res.redirect("/?edit=true");
});

module.exports = router;
