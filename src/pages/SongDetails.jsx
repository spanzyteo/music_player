import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'

import { setActiveSong, playPause } from '../redux/features/playerSlice'
import {
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetTopChartsQuery,
} from '../redux/services/shazamCore'

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songid } = useParams()
  const { artistId } = useParams()
  console.log(`artistid: ${artistId}`)
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid })
  const { data, isFetching } = useGetTopChartsQuery()
  const { data: artistData } = useGetArtistDetailsQuery({ artistId })
  console.log(`artistData: ${artistData}`)
  console.log(data)

  return (
    <div className="flex flex-col">
      {data?.tracks.map((song, i) => (
        <DetailsHeader key={song.key} songData={song} i={i} />
      ))}
      <DetailsHeader artistId="" artistData={artistData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        {songData?.status === '404' ? (
          <p className="text-gray-400 text-base my-1">
            Sorry, the requested song was not found
          </p>
        ) : songData?.sections?.type === 'LYRICS' ? (
          songData?.sections?.text?.map((line, i) => (
            <p className="text-gray-400 text-base my-1">{line}</p>
          ))
        ) : (
          <p className="text-gray-400 text-base my-1">Sorry no lyrics found!</p>
        )}
        <div className="mt-5"></div>
      </div>
    </div>
  )
}

export default SongDetails
