async function fetchData() {

    //valores usados
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const Necontrado = document.getElementById("erro");
    const imgElement = document.getElementById("imagemPokemon");
    const pokemonPeso = document.getElementById("pesoPokemon");
    const pokemonNome = document.getElementById("nomePokemon");

    
    //zerar valores
    imgElement.src = "";
    imgElement.style.display = "none";
    pokemonNome.textContent = "";
    pokemonPeso.textContent = "";

    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        //se não encontrar, mostra mensagem de erro.

        if(!response.ok){
            Necontrado.style.display = "block";
            setTimeout(() => { Necontrado.style.display = "none"; }, 6000);
            throw new Error("Could not fetch the resource");
            
        }

        //conversão de dados 

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        //pega dados do nome e peso do array

        pokemonNome.textContent = data.name;
        pokemonPeso.textContent = (data.weight / 10).toFixed(1).replace(".", ",") + " " + "KG"; //transforma peso para kg
    
        //muda o display para mostrar mensagem na tela

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}
