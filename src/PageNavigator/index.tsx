import PokemonDetail from '../Detail/PokemonDetail'
import PokeCardList from '../List/PokeCardList'
import { Route, Routes } from 'react-router-dom'

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<PokeCardList/>}/>
      <Route path="/pokemon/:name" element={<PokemonDetail/>}/>
    </Routes>
  )
}

export default PageNavigator