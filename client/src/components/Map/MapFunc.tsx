
import { YMaps, Map, Placemark, ObjectManager } from '@pbe/react-yandex-maps';



const MapFunc= ({filteredSitters}): JSX.Element =>{

  const defaultState = {
    center: [55.677123, 35.616378],
    zoom: 5,
  };
const collection = {
    type: "FeatureCollection",
    features: filteredSitters?.map((el, id) => {
      return {
        id: id,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [el.geoX, el.geoY]
        },
        properties: {
          balloonContent: 
          `<font size=3><b><a target='_blank' href= /aboutpetsitter/${el.id} style='color: #1b5212;'> ${el.username}  </a></b></font>`
        ,
          clusterCaption: `Метка №${id + 1}`
        }
      };
    })
  };

  return (
    <div style={{width:'100%', height:'390px'}}>
    <YMaps >
      <Map width='100%' height='390px' defaultState={defaultState}>
        <ObjectManager
            objects={{
              openBalloonOnClick: true
            }}
            clusters={{}}
            options={{
              clusterize: true,
              gridSize: 32
            }}
            defaultFeatures={collection}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.clustersBalloon"
            ]}
          />

      </Map>
    </YMaps>
    </div>
  );

}
export default MapFunc
