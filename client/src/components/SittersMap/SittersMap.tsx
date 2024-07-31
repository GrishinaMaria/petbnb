import React, { useEffect, useState } from 'react';
// import ymaps, { Map } from 'yandex-maps';


const SittersMap = ({ sitters, filtredSitters }): JSX.Element => {
  
    useEffect(() => {
    ymaps.ready(init);
      console.log('Карта загрузилась', ymaps);
      function init() {
        const myMap = new ymaps.Map(
            'map',
            {
              center: [30.593991, 114.300002],
              zoom: 3,
            },
            {
              searchControlProvider: 'yandex#search',
            }
          ),
          objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true,
          });

        // Чтобы задать опции одиночным объектам и кластерам,
        // обратимся к дочерним коллекциям ObjectManager.
        objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        objectManager.clusters.options.set(
          'preset',
          'islands#greenClusterIcons'
        );
        myMap.geoObjects.add(objectManager);
          
          
          let dataSitters;
          if (filtredSitters) {
          dataSitters = filtredSitters.map((el) => ({
          type: 'Feature',
          id: el.id,
          geometry: { type: 'Point', coordinates: [el.corX, el.corY] },
          properties: {
            balloonContentHeader: `<font size=3><b><a target='_blank' href= /tea/${el.id} > ${el.title}  </a></b></font>`,
            hintContent: el.title,
          },
        }));    
          }
        dataSitters = sitters.map((el) => ({
          type: 'Feature',
          id: el.id,
          geometry: { type: 'Point', coordinates: [el.corX, el.corY] },
          properties: {
            balloonContentHeader: `<font size=3><b><a target='_blank' href= /tea/${el.id} > ${el.title}  </a></b></font>`,
            hintContent: el.title,
          },
        }));
        const data = {
          type: 'FeatureCollection',
          features: dataSitters,
        };
      
        objectManager.add(data);
      }
    }, [])
    
return (
<>
    <div id='map' style={{width: '400px', height: '400px'}}></div>
      
</>
 );

}
export default SittersMap
