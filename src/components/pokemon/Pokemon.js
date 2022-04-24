import React, {Component} from 'react';
import axios from 'axios'

export default class Pokemon extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl:''
    };

    async componentDidMount(){
        const {pokemonIndex} = this.props.match.params;

        //url z informacjami pokemonów
        const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/'
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

        //zbieranie informacji o pokemonach
        const pokemonRes = await axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        this.setState({name})
    }

    render() {
        return (
            <div>
                {this.state.name}
            </div>
        );
    }
}
