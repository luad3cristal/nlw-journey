const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: false
}

const atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-09 12:00"),
    finalizada: false,
  },
]


const criarItemDeAtividade = (atividade) => {
  //checa se o input foi checado ou não com base no atividade.finalizada
  let input = '<input type="checkbox" '

  if (atividade.finalizada) {
    input += "checked"
  }

  input += '>'

  return `     
    <div>
      ${input}
      <span>${atividade.nome}</span>
      <time>${atividade.data}</time>
    </div>
  `
}

const section = document.querySelector("section")

for(let atividade of atividades) {
  section.innerHTML += criarItemDeAtividade(atividade)
}
