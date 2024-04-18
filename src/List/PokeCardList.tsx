import styled from '@emotion/styled'
import PokeCard from './PokeCard'
import { useEffect } from 'react'
import { fetchPokemonsAPI } from '../Service/pokemonService'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { RootState, useAppDispatch } from '../Store';
import { fetchPokemons } from '../Store/pokemonsSlice';
import { useSelector } from 'react-redux';

const PokeCardList = () => {
  const dispatch = useAppDispatch()
  const { pokemons } = useSelector((state: RootState) => state.pokemons)
  
  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: async () => {
      dispatch(fetchPokemons(pokemons.next))
    },

    disabled: false,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch])



  return (
    <>
      <List>
        {
          pokemons
            .results
            .map((pokemon, index) =>
              <PokeCard
                key={`${pokemon.name}_${index}`}
                name={pokemon.name} 
              />
            )
        }
      </List>
      <Loading ref={infiniteRef}>
        Loading...
      </Loading>
    </>
  )
}

const Loading = styled.div`
  display: flex;
  justify-content: center;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`
export default PokeCardList