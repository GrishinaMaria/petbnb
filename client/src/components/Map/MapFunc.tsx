import { YMaps, Map, Placemark, ObjectManager } from '@pbe/react-yandex-maps';
import { useEffect } from 'react';

const MapFunc = ({ filteredSitters }): JSX.Element => {
  // const [sitters, setSitters] = useState([]);

  // useEffect(() => {
  //     axiosInstance
  //       .get(`${import.meta.env.VITE_API}/petsitter/all`)
  //       .then((res) => {

  //         setSitters(res.data.allSitters);

  //       })
  //       .catch((err) => console.error(err));
  //   }, []);
  console.log(filteredSitters, 'f');
  useEffect(() => {
    console.log(123);
  }, [filteredSitters]);

  const defaultState = {
    // center: [55.677123, 35.616378],
    center: [57.119817, 33.419613],
    zoom: 5,
  };
  const collection = {
    type: 'FeatureCollection',
    features: filteredSitters?.map((el, id) => {
      return {
        id: id,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [el.geoX, el.geoY],
        },
        properties: {
          balloonContent:
            // `<font size=3><b><a target='_blank' href= /aboutpetsitter/${el.id} style='color: #1b5212;'> ${el.username}  </a></b></font>`

            `<div style="max-width: 100%;">
      <a target='_blank' href='/aboutpetsitter/${el.id}' style='text-decoration: none; color: inherit;'>
        <img src="${el.photo}" alt="${el.username}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px;" />
        <strong>${el.username}</strong>
      </a><br>
      ${el.city}<br>
    </div>`,

          clusterCaption: `Метка №${id + 1}`,
        },
      };
    }),
  };
  console.log(collection, 'coll');

  return (
    <div style={{ width: '100%', height: '1090px' }}>
      <YMaps>
        <Map width="100%" height="1090px" defaultState={defaultState}>
          <ObjectManager
            objects={{
              openBalloonOnClick: true,
            }}
            clusters={{}}
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            features={collection}
            modules={[
              'objectManager.addon.objectsBalloon',
              'objectManager.addon.clustersBalloon',
            ]}
          />
        </Map>
      </YMaps>
    </div>
  );
};
export default MapFunc;
