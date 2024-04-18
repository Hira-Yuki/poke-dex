import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PokemonDetailType, fetchPokemonDetailAPI } from '../Service/pokemonService'
import { RootState } from '.'

// First, create the thunk
export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchPokemonDetail',
  async (name: string) => {
    const response = await fetchPokemonDetailAPI(name)
    return response
  }, {
    condition: (name, {getState}) => {
      const { pokemonDetail } = getState() as RootState
      const pokemon = pokemonDetail.pokemonDetail[name]
      return !pokemon
    }
  }
)

interface PokemonDetailState {
  pokemonDetail: Record<string, PokemonDetailType>
}

const initialState: PokemonDetailState = {
  pokemonDetail: {}
}

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemonDetail.fulfilled, (state, action: PayloadAction<PokemonDetailType>) => {
      state.pokemonDetail = {
        ...state.pokemonDetail,
        [action.payload.name]: action.payload
      }
    })
  },
})

export const pokemonDetailReducer = pokemonDetailSlice.reducer