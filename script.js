//https://playgameoflife.com/
let NO_COLONNES = 40;
let NO_LIGNES = 30;
let NB_ALIVE_INIT = 400;
let DELAY = 100; // milliseconds
let random;
let top_ok = false;
let offset_top_ok = false;
let offset_left_ok = false;
let offset_right_ok = false;
let offset_bottom_ok = false;
let interval;
let bottom_ok = false;
let right_ok = false;
let left_ok = false;
let NB_CELL = NO_COLONNES * NO_LIGNES;
const container = document.querySelector(".container");
// const TABX = [];
// const TABY = [];
let game_started = false;
let DEAD = [];
let PREV1 = [];
let PREV2 = [];
let TOREMOVE = [];
let TOADD = [];
let ALIVE = [];
let SURROUNDING_CELLS = [];
let alive_check = false;
let dead_check = false;
const INPUT_COLONNES = document.getElementById("nbcolonnes");
const INPUT_LIGNES = document.getElementById("nblignes");
const RANGE = document.getElementById("range");
const INPUT_NBCELLS = document.getElementById("nbcellsinit");
const vitesse = document.querySelectorAll(".vitesse");

INPUT_COLONNES.value = NO_COLONNES;
INPUT_NBCELLS.value = NB_ALIVE_INIT;
INPUT_LIGNES.value = NO_LIGNES;

let cellules_array = [];

const cellsInArray = () => {
  cellules_array = document.querySelectorAll(".cellule");
};

const init = () => {
  container.innerHTML = "";

  console.log("test");
  console.log(NO_LIGNES);
  console.log(NO_COLONNES);

  for (k = 1; k < NO_LIGNES + 1; k++) {
    let ligne = document.createElement("div");
    container.appendChild(ligne);
    ligne.classList.add("ligne");
    // console.log("lignes "+k);

    for (i = 1; i < NO_COLONNES + 1; i++) {
      // console.log("colonnes "+i);

      let cellule_col = document.createElement("div");
      ligne.appendChild(cellule_col);
      cellule_col.classList.add("cellule");
    }
  }
  cellsInArray();
};

const redefineValues = () => {
  if (INPUT_COLONNES != 0 && INPUT_LIGNES != 0 && INPUT_NBCELLS != 0) {
    NO_COLONNES = INPUT_COLONNES.valueAsNumber;
    NO_LIGNES = INPUT_LIGNES.valueAsNumber;
    NB_ALIVE_INIT = INPUT_NBCELLS.valueAsNumber;
    NB_CELL = NO_COLONNES * NO_LIGNES;
    console.log(NO_LIGNES);
    console.log(NO_COLONNES);
    console.log(NB_ALIVE_INIT);

    init();
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  random = Math.floor(Math.random() * (max - min) + min);
  if (ALIVE.includes(random)) {
    getRandomInt(min, max);
  }

  // The maximum is exclusive and the minimum is inclusive
}

const randomInit = () => {
  for (let i = 0; i < ALIVE.length; i++) {
    cellules_array[ALIVE[i]].classList.remove("alive");
  }

  ALIVE.length = 0;
  DEAD.length = 0;

  for (let i = 0; i < NB_ALIVE_INIT; i++) {
    getRandomInt(0, NO_COLONNES * NO_LIGNES);
    ALIVE[i] = random;
  }

  for (let i = 0; i < NB_CELL; i++) {
    if (!ALIVE.includes(i)) {
      console.log("test");
      DEAD.push(i);
    }
  }

  for (let i = 0; i < ALIVE.length; i++) {
    cellules_array[ALIVE[i]].classList.add("alive");
  }
};

const check_surrounding_cells = () => {
  for (i = 0; i < ALIVE.length; i++) {
    console.log("check alive");
    top_ok = false;
    bottom_ok = false;
    right_ok = false;
    left_ok = false;
    offset_top_ok = false;
    offset_left_ok = false;
    offset_right_ok = false;
    offset_bottom_ok = false;

    if ((ALIVE[i] + 1) % NO_COLONNES != 0) {
      offset_right_ok = true;
      // console.log("offset_right_ok");

      if (ALIVE.includes(ALIVE[i] + 1)) {
        SURROUNDING_CELLS.push(ALIVE[i] + 1);
        right_ok = true;
        // console.log("right_ok");
      }
    }
    if (ALIVE[i] % NO_COLONNES != 0 && ALIVE[i] - 1 >= 0) {
      // console.log("offset_left_ok");
      offset_left_ok = true;
      if (ALIVE.includes(ALIVE[i] - 1)) {
        SURROUNDING_CELLS.push(ALIVE[i] - 1);
        left_ok = true;
        // console.log("left_ok");
      }
    }
    if (ALIVE[i] - NO_COLONNES >= 0) {
      offset_top_ok = true;
      // console.log("offset_top_ok");

      if (ALIVE.includes(ALIVE[i] - NO_COLONNES)) {
        SURROUNDING_CELLS.push(ALIVE[i] - NO_COLONNES);
        top_ok = true;
        // console.log("top_ok");
      }
    }
    if (ALIVE[i] + NO_COLONNES <= NB_CELL - 1) {
      offset_bottom_ok = true;
      // console.log("offset_bottom_ok");

      if (ALIVE.includes(ALIVE[i] + NO_COLONNES)) {
        SURROUNDING_CELLS.push(ALIVE[i] + NO_COLONNES);
        bottom_ok = true;
        // console.log("bottom_ok");
      }
    }
    if (offset_bottom_ok && offset_left_ok) {
      if (ALIVE.includes(ALIVE[i] + NO_COLONNES - 1)) {
        SURROUNDING_CELLS.push(ALIVE[i] + NO_COLONNES - 1);
        // console.log("botleft_ok");
      }
    }
    if (offset_top_ok && offset_left_ok) {
      if (ALIVE.includes(ALIVE[i] - NO_COLONNES - 1)) {
        SURROUNDING_CELLS.push(ALIVE[i] - NO_COLONNES - 1);
        // console.log("topleft_ok");
      }
    }
    if (offset_bottom_ok && offset_right_ok) {
      if (ALIVE.includes(ALIVE[i] + NO_COLONNES + 1)) {
        SURROUNDING_CELLS.push(ALIVE[i] + NO_COLONNES + 1);
        // console.log("botright_ok");
      }
    }
    if (offset_top_ok && offset_right_ok) {
      if (ALIVE.includes(ALIVE[i] - NO_COLONNES + 1)) {
        SURROUNDING_CELLS.push(ALIVE[i] - NO_COLONNES + 1);
        // console.log("topright_ok");
      }
    }

    if (SURROUNDING_CELLS.length < 2 || SURROUNDING_CELLS.length > 3) {
      console.log("entourant " + SURROUNDING_CELLS);
      // console.log(SURROUNDING_CELLS.length);
      console.log(ALIVE[i] + " cellule tuée");
      // cellules_array[ALIVE[i]].classList.remove("alive");
      TOREMOVE.push(ALIVE[i]);
    } else {
      console.log("entourant " + SURROUNDING_CELLS);
      // console.log(SURROUNDING_CELLS.length);

      console.log(ALIVE[i] + " cellule reste en vie");
    }
    SURROUNDING_CELLS.length = 0;
  }

  for (i = 0; i < DEAD.length; i++) {
    console.log("check dead");

    top_ok = false;
    bottom_ok = false;
    right_ok = false;
    left_ok = false;
    offset_top_ok = false;
    offset_left_ok = false;
    offset_right_ok = false;
    offset_bottom_ok = false;

    if ((DEAD[i] + 1) % NO_COLONNES != 0) {
      offset_right_ok = true;
      // console.log("offset_right_ok");

      if (ALIVE.includes(DEAD[i] + 1)) {
        SURROUNDING_CELLS.push(DEAD[i] + 1);
        right_ok = true;
        // console.log("right_ok");
      }
    }
    if (DEAD[i] % NO_COLONNES != 0 && DEAD[i] - 1 >= 0) {
      // console.log("offset_left_ok");
      offset_left_ok = true;
      if (ALIVE.includes(DEAD[i] - 1)) {
        SURROUNDING_CELLS.push(DEAD[i] - 1);
        left_ok = true;
        // console.log("left_ok");
      }
    }
    if (DEAD[i] - NO_COLONNES >= 0) {
      offset_top_ok = true;
      // console.log("offset_top_ok");

      if (ALIVE.includes(DEAD[i] - NO_COLONNES)) {
        SURROUNDING_CELLS.push(DEAD[i] - NO_COLONNES);
        top_ok = true;
        // console.log("top_ok");
      }
    }
    if (DEAD[i] + NO_COLONNES <= NB_CELL - 1) {
      offset_bottom_ok = true;
      // console.log("offset_bottom_ok");

      if (ALIVE.includes(DEAD[i] + NO_COLONNES)) {
        SURROUNDING_CELLS.push(DEAD[i] + NO_COLONNES);
        bottom_ok = true;
        // console.log("bottom_ok");
      }
    }
    if (offset_bottom_ok && offset_left_ok) {
      if (ALIVE.includes(DEAD[i] + NO_COLONNES - 1)) {
        SURROUNDING_CELLS.push(DEAD[i] + NO_COLONNES - 1);
        // console.log("botleft_ok");
      }
    }
    if (offset_top_ok && offset_left_ok) {
      if (ALIVE.includes(DEAD[i] - NO_COLONNES - 1)) {
        SURROUNDING_CELLS.push(DEAD[i] - NO_COLONNES - 1);
        // console.log("topleft_ok");
      }
    }
    if (offset_bottom_ok && offset_right_ok) {
      if (ALIVE.includes(DEAD[i] + NO_COLONNES + 1)) {
        SURROUNDING_CELLS.push(DEAD[i] + NO_COLONNES + 1);
        // console.log("botright_ok");
      }
    }
    if (offset_top_ok && offset_right_ok) {
      if (ALIVE.includes(DEAD[i] - NO_COLONNES + 1)) {
        SURROUNDING_CELLS.push(DEAD[i] - NO_COLONNES + 1);
        // console.log("topright_ok");
      }
    }

    if (SURROUNDING_CELLS.length == 3) {
      // cellules_array[DEAD[i]].classList.add("alive");
      TOADD.push(DEAD[i]);
    }
    SURROUNDING_CELLS.length = 0;
  }

  ALIVEPREV = ALIVE;
  for (i = 0; i < ALIVE.length; i++) {
    for (j = 0; j < TOREMOVE.length; j++) {
      if (ALIVE[i] == TOREMOVE[j]) {
        console.log("remove");
        ALIVE.splice(i, 1);
        DEAD.push(TOREMOVE[j]);
        cellules_array[TOREMOVE[j]].classList.remove("alive");
      }
    }
  }
  for (i = 0; i < DEAD.length; i++) {
    for (j = 0; j < TOADD.length; j++) {
      if (DEAD[i] == TOADD[j]) {
        DEAD.splice(i, 1);
        ALIVE.push(TOADD[j]);
        cellules_array[TOADD[j]].classList.add("alive");
      }
    }
  }
  TOREMOVE.length = 0;
  TOADD.length = 0;

  // ALIVE;
};
const effacer = () => {
  clearInterval(interval);
  init();
};
const resume = () => {
  interval = setInterval(game_on, DELAY);
};
const pause = () => {
  clearInterval(interval);
};
const game_on = () => {
  check_surrounding_cells();
};
const game_start = () => {
  if (!game_started) {
    interval = setInterval(game_on, DELAY);
    game_started = true;
  } else {
    resume();
  }
};

RANGE.addEventListener("input", () => {
  console.log("input");
  for (i = 0; i < cellules_array.length; i++) {
    cellules_array[i].style.borderRadius = `${RANGE.valueAsNumber / 2}%`;
  }
});

vitesse.forEach((vitesse) => {
  vitesse.addEventListener("click", (e)=>{
    clearInterval(interval);
    if (e.target.innerHTML == "2X") {
      DELAY = 50;
    } else if (e.target.innerHTML == "4X") {
      clearInterval(interval);
      DELAY = 25;
    }
   else if (e.target.innerHTML == "1X") {
    clearInterval(interval);
    DELAY = 100;
  }
    game_start();
  });
});

init();

/*
- chaque case qui a moins de 2 voisins vivants meurt
- chaque case qui a 2 ou 3 voisins vivants survit
- si plus de 3 voisins vivants, décède
- si *exactement* 3 voisins à cellule morte : ressuscite
*/
