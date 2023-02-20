// Configurando servidor, libs.
const express = require("express") //Chama o módulo do express
const server = express() // Cria um objeto do tipo express


// Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express:server,
    noCache: true //boleano para não ter cache durante os testes.
})

// Configurar servidor com arquivos extras (css, js, imagnes e etc)
server.use(express.static('public'))

// Habilitar body do form
server.use(express.urlencoded({extended: true}))

// Configurar a conexão com o banco de dados

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

// Lista de doadores: vetor ou Array.
/*const donors = [
    { 
        name: "Diego Fernandes",
        blood: "AB+"

    },
    { 
        name: "Cleyton Souza",
        blood: "B+"

    },
    { 
        name: "Robson Marques",
        blood: "O+"

    },
    { 
        name: "Mayk Brito",
        blood: "A-"

    }
]
*/


// Configurar a apresentação da página
server.get("/", function(req,res){
//    const donors = []
  //  return res.render("index.htm", { donors })
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send("Erro no banco de dados!")
        const donors = result.rows
        return res.render("index.htm", { donors })
    })
})


// Configurar o envio do formulário
server.post("/", function(req,res){
    // pegar dados do form
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios!")
    }

    /* 
    // Coloco valores dedntro do array
    donors.push({
        name: name,
        blood: blood,
    })

    */
    // Coloco valores dentro do banco de dados
    const query = `
        INSERT INTO donors ("name", "email", "blood")
        VALUES($1, $2, $3)`

    const values = [name,email,blood] 
    db.query(query, values, function(err){
        // Fluxo de erro
        if (err) return res.send("Erro no banco de dados!")
        
        // FLuxo normal.
        return res.redirect("/")
    })

    

})


// Ligar o servidor através da porta 3000
server.listen(3000, function(){
    console.log("Servidor iniciado .. ")
}) // Abre a porta do servidor. É um das funções do objeto express.
