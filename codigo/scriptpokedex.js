const pokemonName = document.querySelector('#pokemon__name');
const pokemonNumber = document.querySelector('#pokemon__number');
const pokemonImage = document.querySelector('#pokemon__image');
const pokemontype1 = document.querySelector('#pokemontype1');
const pokemontype2 = document.querySelector('#pokemontype2');
const form = document.querySelector('#formPesquisa');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const generation = document.querySelector('#floatingGeracao');
const searchType = document.querySelector('#floatingType');
const pokemonStatus = document.querySelector("#status");
let searchPokemon = 1;
let proximoTipo = 0;
function primeiraLetraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';
  
  const data = await fetchPokemon(pokemon);

  if (data) {

    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = primeiraLetraMaiuscula(data.name);
    pokemonNumber.innerHTML = data.id;
    searchPokemon = data.id
    pokemonImage.src = data['sprites']['other']['home']['front_default'];
    pokemonType = data['types']

    if(pokemonType.length == 2) {
      pokemontype1.innerHTML = primeiraLetraMaiuscula(pokemonType[0].type.name);
      pokemontype2.innerHTML = primeiraLetraMaiuscula(pokemonType[1].type.name);
      
    } else if(pokemonType.length == 1) {
      pokemontype1.innerHTML = primeiraLetraMaiuscula(pokemonType[0].type.name);
      pokemontype2.innerHTML = "";
    }
    const StatusTotais = 
      data['stats'][0].base_stat
     + data['stats'][1].base_stat
     + data['stats'][2].base_stat
     + data['stats'][3].base_stat
     + data['stats'][4].base_stat
     + data['stats'][5].base_stat

    pokemonStatus.innerHTML = `
            <tr>
              <th> HP </th>
              <th>Attack</th>
              <th>Defense</th>
              <th>SP Attack</th>
              <th>SP Defense</th>
              <th>Speed</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>${data['stats'][0].base_stat}</td>
              <td>${data['stats'][1].base_stat}</td>
              <td>${data['stats'][2].base_stat}</td>
              <td>${data['stats'][3].base_stat}</td>
              <td>${data['stats'][4].base_stat}</td>
              <td>${data['stats'][5].base_stat}</td>
              <td>${StatusTotais}</td>
            </tr>`
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não Encontrado';
    pokemonImage.src= "https://w7.pngwing.com/pngs/415/81/png-transparent-check-mark-error-s-text-photography-area.png"
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  listaProcurados = [];
  let procurado = input.value.toLowerCase();
  procurado = parseInt(procurado)
  if(isNaN(procurado)) {
    procurado = input.value.toLowerCase();
  }
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
  let resultados = await APIResponse.json();
  resultados = resultados.results;
  let pokeName;
  let achou = false; 
  let i = 0;
  while (achou == false && i < resultados.length) {
    if(isNumber(procurado) == false) {
      pokeName = resultados[i].name;
      if(pokeName.startsWith(procurado)) {

        achou = true;
        renderPokemon(pokeName);
      }

    } else {
      pokeName = resultados[procurado - 1].name;
      renderPokemon(pokeName)
      achou = true
    }

    i++;
  }
});


buttonPrev.addEventListener('click', () => {
  if(searchType.value != 0) {
    console.log(proximoTipo)
    if(proximoTipo > 1) {
      proximoTipo -= 1
    } 
    FiltraTipo(searchType.value, proximoTipo);
  } else {
    if(searchPokemon >= 1) {

      searchPokemon -= 1;

      if(searchPokemon == 0 && generation.selectedIndex == 0) {
        searchPokemon = 905
      }
    }  
  }
  if(generation.value != 0) {
    if(generation.value == 1) {
      if(searchPokemon <= 1) {
        searchPokemon = 151;
      }
    } else if(generation.value == 2){
      if(searchPokemon < 152) {
        searchPokemon = 251;
      }
    }else if(generation.value == 3){
      if(searchPokemon < 252) {
        searchPokemon = 386
      }
    }else if(generation.value == 4){
      if(searchPokemon < 387) {
        searchPokemon = 493
      }
    }else if(generation.value == 5){
      if(searchPokemon < 495) {
        searchPokemon = 649
      }
    }else if(generation.value == 6){
      if(searchPokemon < 650) {
        searchPokemon = 721
      }
    }else if(generation.value == 7){
      if(searchPokemon < 722) {
        searchPokemon = 809
      }
    }else if(generation.value == 8){
      if(searchPokemon < 810) {
        searchPokemon = 905
      }
    }
  }
  renderPokemon(searchPokemon);
});

buttonNext.addEventListener('click', () => {
  if(searchType.value != 0) {
    proximoTipo += 1 
    FiltraTipo(searchType.value, proximoTipo);
  } else {
    searchPokemon += 1;
    if(searchPokemon > 905) {
      searchPokemon = 1;
    }

  } 
  if(generation.value != 0) {
    if(generation.value == 1) {
      if(searchPokemon > 151) {
        searchPokemon = 1;
      }
    } else if(generation.value == 2){
      if(searchPokemon > 251) {
        searchPokemon = 152;
      }
    }else if(generation.value == 3){
      if(searchPokemon > 386) {
        searchPokemon = 252
      }
    }else if(generation.value == 4){
      if(searchPokemon > 493) {
        searchPokemon = 387
      }
    }else if(generation.value == 5){
      if(searchPokemon > 649) {
        searchPokemon = 494
      }
    }else if(generation.value == 6){
      if(searchPokemon > 649) {
        searchPokemon = 650
      }
    }else if(generation.value == 7){
      if(searchPokemon > 809) {
        searchPokemon = 722
      }
    }else if(generation.value == 8){
      if(searchPokemon > 905) {
        searchPokemon = 810
      }
    }
  }
  renderPokemon(searchPokemon);
});

generation.addEventListener('change', () => {
    let Gen = generation.value;
    if(Gen == 1) {
      searchPokemon = 1;
    } else if(Gen == 2){
      searchPokemon = 152;
    }else if(Gen == 3){
      searchPokemon = 252;
    }else if(Gen == 4){
      searchPokemon = 387;
    }else if(Gen == 5){
      searchPokemon = 495;
    }else if(Gen == 6){
      searchPokemon = 650;
    }else if(Gen == 7){
      searchPokemon = 722;
    }else if(Gen == 8){
      searchPokemon = 810;
    }
    renderPokemon(searchPokemon)
});

searchType.addEventListener('change', async () => {
  let optionValue2 = searchType.options[searchType.selectedIndex];
  indexTipo = optionValue2.value
  proximoTipo = 0
  FiltraTipo(indexTipo, proximoTipo);


});

renderPokemon(searchPokemon);

async function FiltraTipo(indexTipo, PoximoPoketipo) {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/type/${indexTipo}`);
  console.log(PoximoPoketipo)
  if (APIResponse.status === 200) {

    const dataTipo = await APIResponse.json();
    let vetorPokemon = dataTipo.pokemon;
    url = vetorPokemon[PoximoPoketipo].pokemon.url;
    procuraBarra = url.lastIndexOf('/');
    idFiltroPokemon = url.substring(34, procuraBarra);
    idFiltroPokemon = parseInt(idFiltroPokemon);
    if(idFiltroPokemon > 905) {
      PoximoPoketipo = 0;
      proximoTipo = 0; 
    } 
    if(PoximoPoketipo > vetorPokemon.length) {
      PoximoPoketipo = 0;
    } else if(PoximoPoketipo < 0) {
      PoximoPoketipo = vetorPokemon.length - 1
      proximoTipo = vetorPokemon.length - 1
    }
    renderPokemon(vetorPokemon[PoximoPoketipo].pokemon.name)
  }

}


function isNumber(val){
  return typeof val === "number"
}