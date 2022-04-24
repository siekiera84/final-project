import React from "react";
import './Card.css'

function Card({pokemon}){
    return(
        <div className="Card">
            <div className="Card__front">
                <div className="Card__img">
                    <img src={pokemon.sprites.front_default} alt=""/>
                </div>
                <div className="Card__name">
                    {pokemon.id}. {pokemon.name.toUpperCase()}
                </div>
                <div className="Card__types">
                    {pokemon.types.map(type => {
                        return(
                            <div className="Card__type">
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="Card__back">
                <div className="Card__info">
                    <div className="Card__data Card__data--weight">
                        <p className="title">Weight</p>
                        <p>{pokemon.weight}</p>
                    </div>
                    <div className="Card__data Card__data--height">
                        <p className="title">Height</p>
                        <p>{pokemon.height}</p>
                    </div>
                    <div className="Card__data Card__data--ability">
                        <p className="title">Ability</p>
                        <p>{pokemon.abilities[0].ability.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;