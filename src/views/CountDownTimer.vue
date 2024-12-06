<template>
  <div id="base">
    <h2 class="font-semibold margin-bottom" style="color: black">
      Técnica Pomodoro.
    </h2>
    <div class="accordion">
      <!-- Iteramos sobre los elementos del acordeón -->
      <div v-for="(item, index) in items" :key="index" class="accordion-item">
        <div class="accordion-header" @click="toggle(index)">
          <h4>{{ item.title }}</h4>
          <!-- Icono que indica si el panel está abierto o cerrado -->
          <span class="material-icons">
            {{ openIndex === index ? "expand_less" : "expand_more" }}
          </span>
        </div>

        <!-- Si el índice del panel es el mismo que el que está abierto, mostramos el contenido -->
        <div v-if="openIndex === index" class="accordion-content">
          <h4>{{ item.content }}</h4>
        </div>
      </div>
    </div>
    <h4
      style="text-align: center"
      class="font-semibold"
      :style="{
        color: this.isResting == true ? 'green' : 'black',
      }"
    >
      {{ this.texto }}
    </h4>
    <div
      class="show-timer"
      :style="{
        color: this.isResting == true ? 'green' : 'black',
      }"
    >
      {{ time + "  " + this.timeName }}
    </div>
    <!-- <p>Tiempo restante: {{ timeRemaining }} segundos</p> -->

    <div style="text-align: center">
      <!-- Botones para controlar la cuenta atrás -->
      <button
        @click="toggleCountdown"
        style="border: 10px; border-radius: 25px; color: white"
        :style="{
          backgroundColor: this.isRunning == true ? 'grey' : 'green',
        }"
      >
        <span class="material-icons">{{
          isRunning ? "pause" : "play_arrow"
        }}</span>
        <!-- {{ isRunning ? "Detener" : "Reanudar" }} -->
      </button>
      <button
        @click="restartCountdown"
        style="
          background-color: red;
          border: 10px;
          border-radius: 25px;
          color: white;
        "
      >
        <span class="material-icons">refresh</span>
        <!-- Reiniciar -->
      </button>
    </div>
    <!-- Contador de descansos -->
    <p>Pomodoros: {{ breaksCompleted }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeRemaining: 10, // Tiempo de trabajo inicial
      timeName: "s", // denominacion del tiempo
      restTime: 5, // Tiempo de descanso
      restTimeExtra: 15, // Tiempo de descanso
      interval: null, // Variable para almacenar la referencia al setInterval
      isRunning: false, // Estado que indica si la cuenta atrás está en ejecución
      breaksCompleted: 0, // Contador de los descansos realizados
      isResting: false, // Estado que indica si estamos en tiempo de descanso
      // Definimos los paneles del acordeón (título y contenido)
      items: [
        {
          title: "¿Qué es la técnica Pomodoro?",
          content:
            "La técnica Pomodoro es un método de gestión de tiempo que sugiere trabajar en intervalos de 25 minutos, sin interrupción ni distracciones, y añadir tiempos de descanso de 5 minutos. Su objetivo es establecer metas y mejorar la productividad. Los intervalos de tiempo se denominan «pomodoros» y una vez cumplidos cuatro de ellos puedes hacer pausas prolongadas de entre 15 a 30 minutos, siempre y cuando se hayan completado los primeros cuatro intervalos de trabajo consecutivos.",
        },
      ],
      // Índice del panel que está abierto
      openIndex: null,
      texto: "",
    };
  },
  computed: {
    // Formatea el tiempo para mostrarlo como "00:00"
    time() {
      const minutes = Math.floor(this.timeRemaining / 60);
      if (minutes > 0) this.timeName = "m";
      else this.timeName = "s";
      const seconds = this.timeRemaining % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
  },
  methods: {
    // Método para iniciar la cuenta atrás
    startCountdown() {
      this.isRunning = true;
      // Establecer el tiempo inicial según si estamos descansando o trabajando
      this.interval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.handleTimerEnd(); // Llamar a la función de finalización del temporizador
        }
      }, 1000);
    },

    // Método para manejar el final de un temporizador
    handleTimerEnd() {
      if (this.isResting) {
        this.texto = "Tiempo de trabajo!, concentrate!!.";
        this.isResting = false; // Terminar el descanso y pasar a la cuenta atrás principal
        this.timeRemaining = 10; // Restablecer el tiempo de trabajo
      } else {
        this.texto = "Tiempo de descanso!, toma un pequeño decanso.";
        this.isResting = true; // Empezar el descanso
        this.breaksCompleted++; // Incrementar el contador de descansos
        if (this.breaksCompleted % 4 === 0) {
          this.timeRemaining = this.restTimeExtra;
          this.texto = "Tiempo de descanso!, toma un GRAN decanso.";
        } else this.timeRemaining = this.restTime; // Establecer el tiempo de descanso
      }
      clearInterval(this.interval);
      this.startCountdown(); // Iniciar la siguiente cuenta atrás (ya sea descanso o trabajo)
    },

    // Método para detener la cuenta atrás
    stopCountdown() {
      clearInterval(this.interval);
      this.isRunning = false;
    },

    // Método para reanudar la cuenta atrás
    resumeCountdown() {
      this.startCountdown();
    },

    // Método para alternar entre iniciar, detener y reanudar
    toggleCountdown() {
      if (this.isRunning) {
        this.texto = "Tiempo detenido.";
        this.stopCountdown(); // Si está en marcha, se detiene
      } else {
        if (!this.isResting) this.texto = "Tiempo de trabajo!, concentrate!!.";
        else this.texto = "Tiempo de descanso!.";
        this.resumeCountdown(); // Si está detenido, se reanuda
      }
    },

    // Método para reiniciar la cuenta atrás
    restartCountdown() {
      this.timeRemaining = 10; // Restablecer el tiempo de trabajo
      this.breaksCompleted = 0; // Reiniciar el contador de descansos
      this.stopCountdown(); // Detener la cuenta atrás
      this.isRunning = false; // Cambiar el estado de ejecución
      this.isResting = false; // Reiniciar el estado de descanso
    },
    // Método para abrir y cerrar los paneles
    toggle(index) {
      if (this.openIndex === index) {
        // Si el panel está abierto, lo cerramos (lo ponemos en null)
        this.openIndex = null;
      } else {
        // Si el panel está cerrado, lo abrimos
        this.openIndex = index;
      }
    },
  },
  mounted() {
    // this.startCountdown(); // Iniciar la cuenta atrás cuando el componente se monta
    this.texto = "¿Preparado para empezar la tarea?";
  },
  beforeUnmount() {
    // Limpiar el interval cuando el componente se destruye
    if (this.interval) clearInterval(this.interval);
  },
};
</script>

<style scoped>
#base {
  width: 50%;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
  column-count: 1;
  display: grid;
  border-radius: 10px;
}
.font-semibold {
  font-weight: bolder;
}
.color-green {
  color: rgb(3, 218, 31);
}
.margin-bottom {
  margin-bottom: 10px;
  text-align: center;
}
.show-timer {
  font-size: 3rem;
  text-align: center;
  margin: 0% 10% 0% 10%;
}
h1 {
  font-size: 2rem;
  color: green;
}

p {
  font-size: 1.5rem;
  color: green;
  text-align: center;
}

button {
  margin: 10px;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
}
.material-icons {
  vertical-align: middle; /* Alinear el icono con el texto */
  /* margin-right: 8px; Espacio entre el icono y el texto */
}
.accordion {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.accordion-item {
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.accordion-header {
  background-color: #f7f7f7;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.accordion-header:hover {
  background-color: #e0e0e0;
}

.accordion-content {
  padding: 10px;
  background-color: #fafafa;
}
</style>
