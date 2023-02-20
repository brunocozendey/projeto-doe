const cor = "branco"
const tamanho = 2.5

function verficaSeOCopoEstaSujo(){
    return "Copo sujo"
}

const copo = {
    cor,
    tamanho,
    verficaSeOCopoEstaSujo,
}

console.log(copo)
console.log(copo.verficaSeOCopoEstaSujo())