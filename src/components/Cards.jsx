import React from 'react'

const Card = ({ pokemonData }) => {

  return (
    <section className='pokemon-card rounded-[0.5em] transition-all w-[30rem] overflow-hidden text-[10px] bg-white relative h-[35rem]'>
        <div className='bg-Round bg-[#EAFBF1] w-full h-[15em] absolute flex justify-center items-center'>
        <figure >
              <img className='z-10 w-[8em] object-cover' src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
        </figure>
        </div>
        <h2 className='mt-[8em] text-center font-semibold capitalize text-[2em]'>{pokemonData.name}</h2>
        <div className='flex justify-center items-center'>
          <div className='py-[0.5em] w-[10em] text-center capitalize font-semibold rounded-[1.5em] text-[white] bg-[#2EC970] text-[1.2em] my-[1em] '>{pokemonData.types.map((curElem)=> curElem.type.name).join("-")}</div>
        </div>
        <div className='flex justify-between my-[1.5em] px-[2em] items-center gap-[2em]'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[1.2em] capitalize font-semibold'>height : <span className='font-normal'>{pokemonData.height}</span></p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[1.2em] capitalize font-semibold'>weight : <span className='font-normal'>{pokemonData.weight}</span></p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[1.2em] capitalize font-semibold'>speed : <span className='font-normal'>{pokemonData.stats[5].base_stat}</span> </p>
          </div>
        </div>
        <div className='flex justify-between my-[1.5em] px-[2em] items-center gap-[2em]'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[1.2em]'>{pokemonData.base_experience}</p>
            <p className='text-[1.2em] capitalize font-semibold'>Experience</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[1.2em]'>{pokemonData.stats[1].base_stat}</p>
            <p className='text-[1.2em] capitalize font-semibold'>attacks</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[1.2em]'>{pokemonData.abilities[0].ability.name}</p>
            <p className='text-[1.2em] capitalize font-semibold'>abilities</p>
          </div>
        </div>
    </section>
  )
}

export default Card