import React, {useState,useEffect} from "react";
import './App.css';
import {getAllPokemon, getPokemon} from "./services/pokemon";
import Card from "./components/Card/Card";
import NavBar from "./components/NavBar/NavBar";



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

    const next = async () =>{
        setLoading(true)
        let data = await  getAllPokemon(nextPageUrl)
        await loadingPokemon(data.results)
        setNextPageUrl(data.next)
        setPrevPageUrl(data.previous)
        setLoading(false)
    }

    const prev = async () =>{
        if(!prevPageUrl) return
        setLoading(true)
        let data = await  getAllPokemon(prevPageUrl)
        await loadingPokemon(data.results)
        setNextPageUrl(data.next)
        setPrevPageUrl(data.previous)
        setLoading(false)
    }

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
            {loading ? <h1>Loading...</h1> : (
                <>
                    <NavBar/>
                    <div className="btn">
                        <button onClick={prev}>Prev</button>
                        <button onClick={next}>Next</button>
                    </div>
                    <div className="grid-container">
                        {pokemonData.map((pokemon,i)=>{
                            return (
                                <Card className="Card__front"
                                      data-hover="Card__back"
                                      key={i}
                                      pokemon={pokemon}/>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default App;
