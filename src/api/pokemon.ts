import axios from 'axios'

const API_BASE = 'http://localhost:3000/api'

export async function fetchAllPokemon() {
  const res = await axios.get(`${API_BASE}/pokemon`)

  return res.data
}

export async function battle(pokemon1: string, pokemon2: string) {
  const res = await axios.post(`${API_BASE}/battle`, {
    pokemon1,
    pokemon2,
  })

  return res.data
}