import React, {useState,useEffect} from "react";
import './App.scss';
import {getAllPokemon, getPokemon} from "./services/pokemon";


function App() {
    const [pokemonData, setPokemonData] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [loading, setLoading] = useState(true)
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

    useEffect(()=>{
        async function fetchData(){
            let response = await getAllPokemon(initialUrl);
            setNextPageUrl(response.next);
            setPrevPageUrl(response.previous);
            let pokemon = await loadingPokemon(response.results)
            setLoading(false);
        }
        fetchData();
    },[])

    const loadingPokemon = async (data) =>{
        let _pokemonData = await Promise.all(data.map(async pokemon =>{
            let pokemonRecord = await getPokemon(pokemon.url);
            return pokemonRecord
        }))
        setPokemonData(_pokemonData)
    }



    console.log(pokemonData)
    return (
        <div>
            {loading ? <h1>Loading...</h1> : <h1>Data fetched</h1>}
        </div>
    )
}

export default App;
