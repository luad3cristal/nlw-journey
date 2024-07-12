const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: dayjs(data).format("MMMM"),
    hora: dayjs(data).format("HH:mm"),
  }
}

//objeto modelo das atividades
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: false,
}

//array com alguns objetos
let atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-09 12:00"),
    finalizada: false,
  },
  {
    nome: "Gaming session",
    data: new Date("2024-07-09 16:00"),
    finalizada: true,
  },
]

const criarItemDeAtividade = (atividade) => {
  //checa se o input foi checado ou não com base no atividade.finalizada
  let input = `
  <input onchange="concluirAtividade(event)" 
  value="${atividade.data}"  
  type="checkbox"
  `

  if (atividade.finalizada) {
    input += "checked"
  }

  input += ">"

  const formatar = formatador(atividade.data)

  return `     
    <div>
      ${input}
      <span>${atividade.nome}</span>
      <time>
      ${formatar.dia.semana.longo}, 
      dia ${formatar.dia.numerico}
      de ${formatar.mes}
      às ${formatar.hora}h
      </time>
    </div>
  `
}

const atualizarLista = () => {
  const section = document.querySelector("section")
  section.innerHTML = ""

  //verificar se a lista tá vazia
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
  }
}

atualizarLista()

const salvarAtividade = (event) => {
  event.preventDefault()

  //puxa os dados do formulario ao ter o evento atividad0
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get("atividade")
  const dia = dadosDoFormulario.get("dia")
  const hora = dadosDoFormulario.get("hora")
  const data = `${dia} ${hora}`

  const atividade = {
    nome,
    data,
    finalizada: false,
  }

  const atividadeExiste = atividades.find((atv) => {
    return atv.data == atividade.data
  })

  if (atividadeExiste) {
    return alert("Dia/Hora não disponível")
  }

  atividades = [atividade, ...atividades]
  atualizarLista()
}

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let diasSelecao = ""

  for (let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de
    ${formatar.mes}
    `

    diasSelecao += `
      <option value="${dia}">${diaFormatado}</option>
    `
  }

  document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}

criarDiasSelecao()

const criarHorasSelecao = () => {
  let horasSelecao = ""

  for (let i = 6; i < 23; i++) {
    //transforma em string e diz que quer ver 2 caracteres, se n tiver preenche com 0
    const hora = String(i).padStart(2, '0');

    horasSelecao += `
      <option value="${hora}:00">${hora}:00</option>
    `
    horasSelecao += `
      <option value="${hora}:30">${hora}:30</option>
    `
  }

  document.querySelector('select[name="hora"]').innerHTML = horasSelecao
}

criarHorasSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atv) => {
    return atv.data == dataDesteInput
  }) 

  if (!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}
