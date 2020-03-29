class EscalonadorProcessos {
  filaDeProntos = [];
  quantum = 4;
  tempoProcessoExecutado = [];

  constructor(tipo) {
    this.tipoEscalonamento = tipo;
  }

  setProcesso(processo) {
    this.filaDeProntos = Array.isArray(processo)
      ? this.filaDeProntos.concat(processo)
      : this.filaDeProntos.push(processo);
  }

  setQuantum(quantum) {
    this.quantum = quantum;
  }

  getProcessos() {
    this.ordernar();
    return this.filaDeProntos;
  }

  escalonarFCFS() {
    this.filaDeProntos = this.filaDeProntos.map(processo => {
      processo.tempoExecutado = processo.tempoExecutado + processo.tempo;

      return processo;
    });

    return this.filaDeProntos;
  }

  escalonarSJF() {
    // Reorganiza fila por menor tempo
    this.filaDeProntos = this.filaDeProntos.sort((a, b) => {
      if (a.tempo > b.tempo) {
        return 1;
      } else if (a.tempo < b.tempo) {
        return -1;
      } else {
        return 0;
      }
    });

    this.filaDeProntos = this.filaDeProntos.map(processo => {
      processo.tempoExecutado = processo.tempoExecutado + processo.tempo;

      return processo;
    });
    return this.filaDeProntos;
  }

  escalonarPrioridade() {
    // Reorganiza fila por maior prioridade
    this.filaDeProntos = this.filaDeProntos.sort((a, b) => {
      if (a.prioridade > b.prioridade) {
        return 1;
      } else if (a.prioridade < b.prioridade) {
        return -1;
      } else {
        return 0;
      }
    });

    this.filaDeProntos = this.filaDeProntos.map(processo => {
      processo.tempoExecutado = processo.tempoExecutado + processo.tempo;

      return processo;
    });

    return this.filaDeProntos;
  }

  escalonarRR() {
    this.filaDeProntos = this.filaDeProntos.map(processo => {
      let tempoRestante = processo.tempo - processo.tempoExecutado;
      if (
        processo.tempo < this.quantum &&
        processo.tempo !== processo.tempoExecutado
      ) {
        processo.tempoExecutado = processo.tempoExecutado + processo.tempo;
      } else if (
        tempoRestante < this.quantum &&
        processo.tempo !== processo.tempoExecutado
      ) {
        processo.tempoExecutado = processo.tempoExecutado + tempoRestante;
      } else if (
        tempoRestante >= this.quantum &&
        processo.tempo !== processo.tempoExecutado
      ) {
        processo.tempoExecutado = processo.tempoExecutado + this.quantum;
      } else {
        return processo;
      }

      let data = {
        nome: processo.nome,
        tempo: processo.tempo,
        prioridade: processo.prioridade,
        tempoExecutado: processo.tempoExecutado
      };
      this.tempoProcessoExecutado = this.tempoProcessoExecutado.concat(data);
      return processo;
    });

    // Retorna todos os processos que não terminaram
    let processos = this.filaDeProntos.filter(processo => {
      return processo.tempo !== processo.tempoExecutado;
    });

    // Verifica se algum processo ainda não terminou
    if (processos.length <= 0 || !processos.length) {
      this.filaDeProntos = this.tempoProcessoExecutado; // Reorganiza fila de prontos
      this.tempoProcessoExecutado = [];
    } else {
      this.escalonarRR(); // Reexeculta a função caso algum processo não tenha terminado
    }
  }

  calcularTempoEspera() {
    let tempoEspera = 0;
    this.filaDeProntos = this.filaDeProntos.map(processo => {
      // Verifica se a fila é de Round-Robin
      if (processo.tempoExecutado > 0) {
        if (processo.tempo < this.quantum) {
          tempoEspera += processo.tempoExecutado;
        } else {
          tempoEspera += this.quantum;
        }
      } else {
        tempoEspera += processo.tempo;
      }
      return {
        ...processo,
        tempoEspera
      };
    });
  }

  ordernar() {
    let tipo = this.tipoEscalonamento.toLowerCase().trim();

    // Verifica tipo e executa processo
    if (tipo.match(/fcfs/) || tipo.match(/fifo/)) {
      this.escalonarFCFS();
    } else if (tipo.match(/sjf/)) {
      this.escalonarSJF();
    } else if (tipo.match(/prioridade/)) {
      this.escalonarPrioridade();
    } else if (tipo.match(/rr/) || tipo.match(/round/)) {
      this.escalonarRR();
    }

    this.calcularTempoEspera();
  }
}
