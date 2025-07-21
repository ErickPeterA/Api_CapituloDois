import express from 'express'
import knex from 'knex';
import cors from 'cors'

const app = express()
const port = 3000
app.use(express.json());
app.use(cors())

const knexDB = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'senacrs',
    database: 'capitulo_dois',
  },
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/categoria", async (req,res) => {
    const categoria = await knexDB("categoria").select("*");
    res.json(categoria);
});

app.post("/categoria", async (req,res) => {
    const{id,nome} = req.body;
    await knexDB("categoria").insert({nome});
    res.send("ok!");
})



app.get("/livros", async (req,res) => {
    const livros = await knexDB("livros").select("*")
    res.json(livros)
})

app.get("/livros/limite", async (req,res) => {
    const livros = await knexDB("livros").select("*").limit(4).orderBy("id",'desc')
    res.json(livros)
})

app.post("/livros", async (req,res) => {
    const{nome,quantidade,categoria_id,foto,precoCheio,precoAtual} = req.body;
    await knexDB("livros").insert({nome,quantidade,categoria_id,foto,precoAtual,precoCheio});
    res.send("ok!");
})



app.get("/usuario", async (req,res) => {
    const usuario = await knexDB("usuario").select("*");
    res.json(usuario);
})

app.post("/usuario", async (req,res) => {
    const{nome,email,senha} = req.body;
    await knexDB("usuario").insert({nome,email,senha});;
    res.send("ok!");
})


app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await knexDB("usuario").where({ email, senha }).first();
    if (!usuario || usuario.senha != senha) return res.status(401).json({ erro: "Credenciais inválidas" });
    res.json({ mensagem: "Login realizado com sucesso", usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ erro: "Erro 404!", detalhes: err });
  }
});


app.get("/vendas", async (req,res) => {
    const vendas = await knexDB("vendas").select("*");
    res.json(vendas);
})

app.post("/vendas", async (req,res) => {
    const{livro_id,comprador_id,preco_venda} = req.body;
    await knexDB("vendas").insert({livro_id,comprador_id,preco_venda});
    res.send("ok, bro!");
})



app.get("/avaliacao", async (req,res) => {
    const avaliacao = await knexDB("avaliacao").select("*");
    res.json(avaliacao);
})

app.post("/avaliacao", async (req,res) => {
    const{livro_id, usuario_id,comentario} = req.body;
    await knexDB("avaliacao").insert({livro_id,usuario_id,comentario});
    res.send("ok, man!!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
