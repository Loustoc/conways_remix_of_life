//https://playgameoflife.com/
const NO_COLONNES = 40;
const NO_LIGNES = 30;
const NB_ALIVE_INIT = 400;
let random;
let top_ok = false;
let offset_top_ok = false;
let offset_left_ok = false;
let offset_right_ok = false;
let offset_bottom_ok = false;

let bottom_ok = false;
let right_ok = false;
let left_ok = false;
const NB_CELL = NO_COLONNES * NO_LIGNES;
const container = document.querySelector(".container");
// const TABX = [];
// const TABY = [];
let DEAD = [];
let PREV1 = [];
let PREV2 = [];
let TOREMOVE = [];
let TOADD = [];
let ALIVE = [];
let SURROUNDING_CELLS = [];
let alive_check = false;
let dead_check = false;

let cellules_array = [];
// TODO : DEAD AND ALIVE SIMULTANE !!!!
// for (i = 0; i < cellules_array.length; i++) {
//   if (STATE[i] == 1) {
//     cellules_array[i].classList.add("alive");
//     ALIVE.push(i);
//   } else {
//     cellules_array[i].classList.remove("alive");
//     console.log("now dead");
//   }
// }
//V1 DUMB RESPONSIVE
// const init = () => {
// for(k=1;k<NO_LIGNES+1;k++){
// let ligne = document.createElement("div");
// container.appendChild(ligne);
// ligne.classList.add("ligne");
// ligne.style.width="100vw";
// ligne.style.height=`${(window.innerHeight/NO_LIGNES)}px`;

//     for (i=0;i<NO_COLONNES+1;i++){
//         let cellule_col = document.createElement("div");
//         ligne.appendChild(cellule_col);
//         cellule_col.classList.add("cellule");
//         cellule_col.style.height=`${(window.innerHeight/NO_LIGNES)-2}px`;
//         cellule_col.style.width=`${window.innerWidth/NO_COLONNES}px`
//     }

// }
// }

//V2

const cellsInArray = () => {
  cellules_array = document.querySelectorAll(".cellule");
};

const init = () => {
  for (k = 1; k < NO_LIGNES + 1; k++) {
    let ligne = document.createElement("div");
    container.appendChild(ligne);
    ligne.classList.add("ligne");

    for (i = 1; i < NO_COLONNES + 1; i++) {
      let cellule_col = document.createElement("div");
      ligne.appendChild(cellule_col);
      cellule_col.classList.add("cellule");
      // STATE.push(0);
    }
  }
  cellsInArray();
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

const game_on = () => {
  // console.log("game_on");

  // dead_check = false;
  // alive_check = true;
  // setInterval(check_surrounding_alive_cells, 1000);
  // console.log("game_on");
  // if (ALIVE.length > 0) {

  // requestAnimationFrame(game_on);
  // }
  check_surrounding_cells();
  // alive_check = false;
  // dead_check = true;
  // setTimeout(check_surrounding_cells, 100);
  // check_surrounding_alive_cells();
};
const game_start = () => {
  setInterval(game_on, 100);
};
init();
// game_on();

/*
- chaque case qui a moins de 2 voisins vivants meurt
- chaque case qui a 2 ou 3 voisins vivants survit
- si plus de 3 voisins vivants, décède
- si *exactement* 3 voisins à cellule morte : ressuscite
*/
