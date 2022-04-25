import React, {Component} from 'react';
import PokemonCard from "./PokemonCard";
import axios from "axios"; //do używania requestów
import arrowLeft from "./arrow-left.svg"
import arrowRight from "./arrow-right.svg"


export default class PokemonList extends Component {


    state={
        url:"https://pokeapi.co/api/v2/pokemon?limit=898&offset=0",
        pokemon:null,
        activePage: 1,
        perPage: 20, // ile na stronę
        maxPage: 1, // na początku max 1 strona
    }

    //asynchroniczna żeby mogło działać w tle
    async componentDidMount() {
        const res = await axios.get(this.state.url) //await czeka aż się załaduje
        this.setState(prevState => {
            return {
                pokemon: res.data['results'],
                maxPage: Math.ceil(res.data['results'].length / prevState.perPage) // obliczenie ile stron ogólnie
            }
        }) //rerenderowanie
    }

    goToNextPage = () => {
        console.info(this.state.maxPage);
        if (this.state.activePage < this.state.maxPage) { // pozwol na pojscie strone w przód tylko wtedy, kiedy jest mniejsze od limitu
            this.setState(prevState => {
                return {
                    activePage: prevState.activePage + 1
                }
            })
        }
    }

    gotToPreviousPage = () => {
        if (this.state.activePage > 1) { // pozwol na pojscie strone wstecz tylko wtedy, kiedy jest wieksza od 1
            this.setState(prevState => {
                return {
                    activePage: prevState.activePage - 1
                }
            })
        }
    }


    render() {
        const pokemonToDisplay = [(this.state.activePage - 1) * this.state.perPage, this.state.activePage * this.state.perPage];

        return (
            <>
                {this.state.pokemon ? ( //sprawdzamy czy już istnieje
                    <>
                        <div className="row">
                            {this.state.pokemon.slice(pokemonToDisplay[0], pokemonToDisplay[1]).map(pokemon =>(
                                <PokemonCard
                                    key={pokemon.name}  //musimy używać klucza, każdy pokemon ma unikatowe imię
                                    name={pokemon.name}
                                    url={pokemon.url}
                                />
                            ))}
                        </div>
                        <div className="text-center fs-4 fw-bold mb-3">
                            <button className="btn col-md-2 col-sm-2 float-start"
                                    onClick={() => this.gotToPreviousPage()}
                                    style={{
                                        backgroundColor: "#ef5350"

                                    }}>{<img src={arrowLeft}/>}</button>
                            {this.state.activePage}
                            <button className="btn col-md-2 col-sm-2 float-end"
                                    onClick={() => this.goToNextPage()}
                                    style={{
                                        backgroundColor: "#ef5350"

                                    }}><img src={arrowRight}/></button>
                        </div>
                    </>
                ) : (
                    <h1>Loading Pokemon...</h1> //jeśli nie to ładujemy stronę
                )}
            </>
        );
    }
}