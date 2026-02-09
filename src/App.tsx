import React, { useEffect, useState } from "react"
import PokemonSelector from "./components/PokemonSelector"
import { fetchAllPokemon, battle } from "./api/pokemon"

interface Pokemon {
  id: number
  name: string
  type: string[]
}

function App() {
  const [pokemonList, setPokemonList] = useState<string[]>([])
  const [pokemon1, setPokemon1] = useState("")
  const [pokemon2, setPokemon2] = useState("")
  const [battleResult, setBattleResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAllPokemon().then((list: Pokemon[]) => {
      setPokemonList(list.map((p) => p.name))
    })
  }, [])

  const handleFight = async () => {
    if (!pokemon1 || !pokemon2) {
      alert("Select both Pokémon!")

      return
    }

    setLoading(true)
    const result = await battle(pokemon1, pokemon2)
    setBattleResult(result)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Pokémon Battle Simulator</h1>

      <PokemonSelector
        pokemon={pokemonList}
        selected={pokemon1}
        label="Select Pokémon 1"
        onChange={setPokemon1}
      />

      <PokemonSelector
        pokemon={pokemonList}
        selected={pokemon2}
        label="Select Pokémon 2"
        onChange={setPokemon2}
      />

      <button
        onClick={handleFight}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "1.1rem",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        {loading ? "Battling..." : "Fight!"}
      </button>

      {battleResult && (
        <div>
          <h2>Winner: {battleResult.winner}</h2>
          <h3>Battle Log</h3>
          <ul>
            {battleResult.rounds.map((r: any) => (
              <li key={r.round}>
                Round {r.round}: {r.attacker} dealt {r.damage} to {r.defender}
                {" "}→ {r.defenderHpAfter} HP left
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App