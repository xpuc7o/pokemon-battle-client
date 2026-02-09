import React from "react"

interface Props {
  pokemon: string[]
  selected: string
  onChange: (value: string) => void
  label: string
}

const PokemonSelector: React.FC<Props> = ({ pokemon, selected, onChange, label }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
        {label}
      </label>

      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: "8px", fontSize: "1rem" }}
      >
        <option value="">Select Pokémon...</option>
        {pokemon.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PokemonSelector