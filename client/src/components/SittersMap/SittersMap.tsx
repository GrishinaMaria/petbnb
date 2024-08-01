/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
// import ymaps, { Map } from 'yandex-maps';


const SittersMap = ({ sitters }) => {
  
  useEffect(() => {
    if (sitters) {
      ymaps.ready(init);
      console.log('Карта загрузилась', ymaps);
      function init() {
        const myMap = new ymaps.Map(
          'map',
          {
            center: [55.8, 36.8],
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
          
          
          
        const dataSitters = sitters.map((el) => ({
          type: 'Feature',
          id: el.id,
          geometry: { type: 'Point', coordinates: [el.geoX, el.geoY] },
          properties: {
            balloonContentHeader: `<font size=3><b><a target='_blank' href= /tea/${el.id} > ${el.username}  </a></b></font>`,
            hintContent: el.username,
          },
        }));
          
        const data = {
          type: 'FeatureCollection',
          features: dataSitters,
        };
      
        objectManager.add(data);
      }
    }
    }, [sitters])
  
  if (sitters) {
  return (
<>
    <div id='map' style={{width: '400px', height: '400px'}}></div>
      
</>
 );

  } 

}
export default SittersMap
