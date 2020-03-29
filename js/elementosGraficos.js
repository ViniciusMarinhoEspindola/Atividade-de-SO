class RenderizarElementos {
  constructor(processosEscalonados, tipo) {
    this.desenharBarrasProcesso(processosEscalonados);
    this.renderizarTabela(processosEscalonados, tipo);
  }

  desenharBarrasProcesso(processosEscalonados) {
    let container = document.getElementById("processos-container");

    processosEscalonados.forEach(processo => {
      let processoDiv = document.createElement("div");
      processoDiv.classList.add("processo");

      let barra = document.createElement("div");
      barra.classList.add("processo-barra");
      barra.style.width = processo.tempoExecutado * 25 + "px";
      barra.innerHTML = processo.nome;

      let tempo = document.createElement("span");
      tempo.classList.add("processo-tempo");
      tempo.innerHTML = processo.tempoEspera;

      processoDiv.appendChild(barra);
      processoDiv.appendChild(tempo);

      container.append(processoDiv);
    });
  }

  renderizarTabela(processosEscalonados, tipo) {
    let tbody = document.getElementById("processos");
    processosEscalonados.forEach(processo => {
      let tr = document.createElement("tr");
      let nome = document.createElement("td");
      let tempo = document.createElement("td");
      let prioridade = document.createElement("td");
      let tempoExecutado = document.createElement("td");

      nome.innerHTML = processo.nome;
      tr.appendChild(nome);

      tempo.innerHTML = processo.tempo;
      tr.appendChild(tempo);

      switch (parseInt(processo.prioridade)) {
        case 1:
          console.log(prioridade);
          prioridade.innerHTML = "Tempo Real";
          break;
        case 2:
          prioridade.innerHTML = "Alta";
          break;
        case 3:
          prioridade.innerHTML = "Acima do Normal";
          break;
        case 4:
          prioridade.innerHTML = "Normal";
          break;
        case 5:
          prioridade.innerHTML = "Abaixo de normal";
          break;
        case 6:
          prioridade.innerHTML = "Baixa";
          break;
      }

      tr.appendChild(prioridade);

      let porcentagem = (processo.tempoExecutado * 100) / processo.tempo;
      tempoExecutado.innerHTML = porcentagem + "%";
      tr.appendChild(tempoExecutado);

      tbody.appendChild(tr);
    });
  }
}
