import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Card from "./components/Cards";
import { IoSearchOutline } from "react-icons/io5"
import { ThreeDot } from "react-loading-indicators";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // fetching data from api
  const fetchData = async () => {
    try {
      const fetchAPI = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      const { results } = await fetchAPI.json()
      const detailedData = results.map(async (curElem)=>{
        const res = await fetch(curElem.url)
        const data = await res.json()
        return data
      })
      const pokemonData = await Promise.all(detailedData)
      setPokemon(pokemonData)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // set input value in useState()
  const handleInputValue = (event)=>{
    setSearchValue(event)
  }

  // search functionality
  let searchPokemonData = pokemon.filter((curElem) => {
    if(curElem.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())){
      return curElem
    }
  })

  // highest attack functionality
  const handleHighestAttack = () => {
    setLoading(true)
    searchPokemonData = pokemon.sort((a,b)=> b.stats[1].base_stat - a.stats[1].base_stat)
    setTimeout(()=> setLoading(false),2000)
  }

  // highest experience functionality
  const handleHighestExperience = () => {
    setLoading(true)
    searchPokemonData = pokemon.sort((a,b)=> b.base_experience - a.base_experience)
    setTimeout(()=> setLoading(false),2000)
  }

  // controled reload form tag
  const handleReload = (event) => {
    event.preventDefault()
  }

  // loading
  if(loading){
    return ( 
      <div className="h-screen flex justify-center items-center">
        <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
      </div>
    )
  }

  // if any error to run this code
  if(error){
    return (
    <div className="h-screen text-[4em] flex justify-center items-center">
      <h2>Error : {error}</h2>
    </div>
    )
  }

  return (
    <section className="pokemon-container text-[10px] flex px-[7em] justify-center items-center flex-col" >
      <h1 className="text-[3em] font-bold capitalize my-[1em] font-poppins ">Pokemon Card&apos;s</h1>
        <div className="search-bar flex justify-between w-full flex-wrap px-[7em] my-[4em]">
          <div className="flex">
            <form onSubmit={(event) => handleReload(event)} >
              <input type="text" value={searchValue} onChange={(event) => handleInputValue(event.target.value)} className="w-[20em] text-[1.5em] py-[0.7em] px-[1em] rounded-tl-[1.5em] rounded-bl-[1.5em]" placeholder="Search" />
            </form>
            <div className="px-[2em] pr-[2.5em] bg-[#F0F0F0] w-fit py-[0.7em] rounded-tr-[2em] rounded-br-[2em]">
              <IoSearchOutline className="text-[2.5em] bg-[#F0F0F0]  " />
            </div>
          </div>
          <div className="flex gap-[2em]">
            <button onClick={handleHighestAttack} className="text-[1.5em] px-[2em] py-[0.5em] text-[#fff] rounded-[0.5em] capitalize hover:bg-transparent hover:text-[#000] transition-all border-[0.1em] border-[#2EC970] bg-[#2EC970]">highest attack</button>
            <button onClick={handleHighestExperience} className="text-[1.5em] px-[2em] py-[0.5em] text-[#fff] rounded-[0.5em] capitalize hover:bg-transparent hover:text-[#000] transition-all border-[0.1em] border-[#2EC970] bg-[#2EC970]">highest experience</button>
          </div>
        </div>
      <div className="flex justify-center items-center gap-[2em] flex-wrap">
        {searchPokemonData.map((curElem,index) => {
          return (
            <Card key={index} pokemonData={curElem} />
          )
        })}
      </div>
    </section>
  );
}

export default App;
