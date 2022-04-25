import React, {Component} from 'react';
import styled from 'styled-components'; //stylowanie komponentów
import spinner from './spinner.gif'; //animacja ładowania
import {Link} from 'react-router-dom';

//stylowanie obrazków pokemonów
const Sprite = styled.img`
    width: 8em;
    height: 8em;
    display: none;
`

//stylowanie kart z pokemonami
const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.9, 0.25, 1);
    &:hover{
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22) ;
    }
`

//stylowanie linków
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active{
      text-decoration: none;
    }
`

export default class PokemonCard extends Component {

    //stany początkowe
    state ={
        name: '',
        imageUrl: '',
        pokemonIndex:'',
        imageLoading: true,
        toManyRequests: false
    }

    //uruchomienie po wyrenderowaniu
    componentDidMount() {
        const {name,url} = this.props;
        const pokemonIndex = url.split("/")[url.split('/').length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        //ustawienie stanu
        this.setState({ //klucze nazywają się tak samo jak wartości
            name,
            imageUrl,
            pokemonIndex
        });
    }


    render() {

        return (
            <div className='col-md-3 col-sm-6 mb-5'>
                <StyledLink to={`/pokemon/${this.state.pokemonIndex}`}>
                    <Card className="card">
                        <h5 className="card-header">#{this.state.pokemonIndex}</h5>
                        {/*animacja ładowania zdjęć przez to jak długo to trwało*/}
                        {this.state.imageLoading ? (
                            <img src={spinner} style={{width: '8em',height: '8em' }} className="card-img-top rounded mx-auto d-block mt-2"/> //stylowanie ładowania
                        ) : null}
                        <Sprite className="card-img-top rounded mx-auto mt-2"
                                onLoad={() => this.setState({imageLoading: false})} //zdjęcie z pokemonem ładuje się
                                onError={() => this.setState({toManyRequests: true})} //miałem problem z ilością zapytań z githuba, dodałem żeby sprawdzać jeśli się nie załadują
                                src={this.state.imageUrl}
                                style={
                                    this.state.toManyRequests ? { display: "none"} :
                                        this.state.imageLoading ? null : {display: "block"}
                                }
                        />
                        {/*to ma zwrócić jeśli nie będzie się ładować*/}
                        {this.state.toManyRequests ? (<h6 className="mx-auto">
                            <span className="badge badge-danger mt-2">Too many requests!</span> c
                        </h6>) : null}
                        <div className="card-body mx-auto">
                            <h6 className="card-title">
                                {this.state.name
                                    // przerabianie na pierwszą dużą literę
                                    .toLowerCase()
                                    .split(" ")
                                    .map(
                                        letter => letter.charAt(0).toUpperCase() +letter.substring(1)
                                    )
                                    .join(' ')}
                            </h6>
                        </div>
                    </Card>
                </StyledLink>
            </div>
        );
    }
}
