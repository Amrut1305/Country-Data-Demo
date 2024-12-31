const searchControl = document.getElementById("searchControl");
const showData = document.getElementById("showData");
const sortName = document.getElementById("sortName");
const a_zName = document.getElementById("a-zName");
const z_aName = document.getElementById("z-aName");

const sortCapital = document.getElementById("sortCapital");
const a_zCapital = document.getElementById("a-zCapital");
const z_aCapital = document.getElementById("z-aCapital");

const sortPopulation = document.getElementById("sortPopulation");
const a_zPopulation = document.getElementById("a-zPopulation");
const z_aPopulation = document.getElementById("z-aPopulation");

const newContries = (display = countries) => {
  result = ``
  display.forEach(country1 => {
    result += `
          <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 mb-3">
          <div class="card h-100 d-flex justify-content-center px-3 p-1" >
            <div class="mt-3 text-center"><img src="${country1.flag}" alt="flag" title="flag"></div>
            <h4 class="priHeading text-center">Name : ${country1.name}</h4>
            <h5 class="secHeading">Capital : ${country1.capital}</h5>
            <h5 class="secHeading">Population : ${country1.population}</h5>
            <h5 class="secHeading">Languages : ${country1.languages}</h5>
          </div>
        </div>
    `
  })
  showData.innerHTML = result;
}
newContries();
const newCountry = [...countries]


// const newCountry = [...new Set(countries.map(item => item))]

const handleSearchControl = (eve) => {
  // console.log(eve.target.value);
  const searchQury = eve.target.value.toLowerCase();

  const filteredData = newCountry.filter(item => {
    return item.name.toLowerCase().includes(searchQury) || item.capital && item.capital.toLowerCase().includes(searchQury) || item.languages && item.languages.some(lang => lang.toLowerCase().includes(searchQury))
  })
  newContries(filteredData);
}
searchControl.addEventListener("keyup", handleSearchControl)
// ------------------------handle Search Completed

const handleSortByName = (eve) => {
  // console.log(eve.target);//button
  if (eve.target.classList.contains("default")) {
    newCountry.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    newContries(newCountry);
    sortName.classList.remove("default");
    sortName.classList.add("a-z");
    a_zName.classList.remove("d-none");

  } else if (eve.target.classList.contains("a-z")) {
    newCountry.sort((a, b) => {
      return b.name.localeCompare(a.name)
    })
    newContries(newCountry);
    sortName.classList.add("z-a");
    sortName.classList.remove("a-z");
    a_zName.classList.add("d-none");
    z_aName.classList.remove("d-none");
  } else {
    sortName.classList.add("default");
    z_aName.classList.add("d-none");
    return newContries();
  }
}
sortName.addEventListener("click", handleSortByName);

// ---------------------  Sort Name Completed

const handleSortByCapital = (eve) => {
  // console.log(eve.target);
  if (eve.target && eve.target.classList.contains("default")) {
    newCountry.sort((a, b) => {
      if (!a.capital || !b.capital) {
        return 0;
      }
      return a.capital.localeCompare(b.capital)
    })
    newContries(newCountry);
    sortCapital.classList.remove("default");
    sortCapital.classList.add("a-z");
    a_zCapital.classList.remove("d-none");

  } else if (eve.target.classList.contains("a-z")) {
    newCountry.sort((a, b) => {
      if (!b.capital || !a.capital) {
        return 0;
      } return b.capital.localeCompare(a.capital)
    })
    newContries(newCountry);
    sortCapital.classList.add("z-a");
    sortCapital.classList.remove("a-z");
    a_zCapital.classList.add("d-none");
    z_aCapital.classList.remove("d-none");
  } else {
    sortCapital.classList.add("default");
    z_aCapital.classList.add("d-none");
    return newContries();
  }
}

sortCapital.addEventListener("click", handleSortByCapital);

const handleSortByPopulation = (eve) => {
  console.log(eve.target);
  if (eve.target && eve.target.classList.contains("default")) {
    newCountry.sort((a, b) => a.population - (b.population))
    newContries(newCountry);
    sortPopulation.classList.remove("default");
    sortPopulation.classList.add("a-z");
    a_zPopulation.classList.remove("d-none");

  } else if (eve.target.classList.contains("a-z")) {
    newCountry.sort((a, b) => {
      return b.population - (a.population)
    })
    newContries(newCountry);
    sortPopulation.classList.add("z-a");
    sortPopulation.classList.remove("a-z");
    a_zPopulation.classList.add("d-none");
    z_aPopulation.classList.remove("d-none");
  } else {
    sortPopulation.classList.add("default");
    z_aPopulation.classList.add("d-none");
    return newContries();
  }
}
sortPopulation.addEventListener("click", handleSortByPopulation);

function calculatePercentage() {
  let sortByPop10 = newCountry.toSorted((a, b) => b.population - a.population).splice(0,10)
  let totalPop = newCountry.reduce((acc,cv)=>{return acc += cv.population},0)
  sortByPop10.forEach(c=>{
    let popPercentage  = (c.population/totalPop)*100
    return c.PopulationPercent= popPercentage;
  })
  const graphCountry = document.getElementById("graphCountry");
  let result1 = `<li class="list-group-item grphCountry">World</li>`;
  sortByPop10.forEach(c=>{
    result1 += `<li class="list-group-item grphCountry">${c.name}<img class="m-0" src="${c.flag}" alt="${c.flag}"></li>`
  })
  graphCountry.innerHTML = result1;

  const graphData = document.getElementById("graphData");
  let result = `<li class="list-group-item"><span style="width:100%">Total World Population is : "${totalPop}"</span></li>`;
  sortByPop10.forEach(c=>{
    result += `
              <li class="list-group-item d-flex pr-2 justify-content-between"><span style="width:${c.PopulationPercent}%">${c.population}</span>${(c.PopulationPercent).toFixed(3)} %</li>
              `
              // <label for="cname">${c.name}</label>
  })
  graphData.innerHTML = result;
}
calculatePercentage()


// let a = {
//   fname : "Abc",
//   lname : "xyz",
//   age : 25
// }

// localStorage.setItem("data", JSON.stringify(a));

// let localData = localStorage.getItem("data");
// console.log(localData);

let parseLocal = JSON.parse(localStorage.getItem("data"))
console.log(parseLocal);
