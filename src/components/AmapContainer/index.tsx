import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import AMapLoader from "@amap/amap-jsapi-loader";

import InfoBox from "../InfoBox";

import styles from "./index.module.less";
import Loading from "../Loading";

const AMapContainer = () => {
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [polygons, setPolygons] = useState<any>(null);
  const [currentMarker, setCurrentMarker] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AMapLoader.load({
      key: "bfcedeac3e5f69b80752c6a29fb581c1",
      version: "2.0",
      plugins: [],
    }).then((AMap) => {
      const map = new AMap.Map("container", {
        viewMode: "3D",
        zoom: 14,
      });

      AMap.plugin("AMap.Geolocation", () => {
        const geolocation = new AMap.Geolocation({
          timeout: 5000,
          buttonOffset: new AMap.Pixel(10, 20),
          showMarker: false,
          GeolocationFirst: true,
          showCircle: false,
        });
        map.addControl(geolocation);
        geolocation.on("complete", () => {
          setLoading(false);
        });
        geolocation.getCurrentPosition((status: string, result: any) => {
          if (status === "complete") {
            const { position } = result;
            const { lng, lat } = position;
            const currentMarker = new AMap.Marker({
              position: [lng, lat],
              map: map,
            });
            setCurrentMarker(currentMarker);

            const squareSize = 0.01;
            const squares = [
              [lng, lat],
              [lng + squareSize, lat],
              [lng, lat + squareSize],
              [lng - squareSize, lat],
              [lng, lat - squareSize],
            ];
            const squarePolygons = squares.map((coords, index) => {
              const squarePolygon = new AMap.Polygon({
                map: map,
                path: [
                  [coords[0] - squareSize / 2, coords[1] - squareSize / 2],
                  [coords[0] + squareSize / 2, coords[1] - squareSize / 2],
                  [coords[0] + squareSize / 2, coords[1] + squareSize / 2],
                  [coords[0] - squareSize / 2, coords[1] + squareSize / 2],
                ],
                clickable: true,
              });

              const infoBoxHTML = ReactDOMServer.renderToString(
                <InfoBox thermalValue={index} />,
              );

              const infoWindow = new AMap.InfoWindow({
                closeWhenClickMap: true,
                isCustom: true,
                anchor: "middle-left",
                content: infoBoxHTML,
                offset: new AMap.Pixel(0, -30),
              });

              const openInfoBox = () => {
                infoWindow.open(map, coords);
              };

              squarePolygon.on("mouseover", openInfoBox);
              return squarePolygon;
            });
            setPolygons(squarePolygons);

            map.setCenter([lng, lat]);
          } else {
            alert(
              `定位失败，请检查网络或者更换为edge浏览器！失败原因：${result}`,
            );
          }
        });
      });

      setMapInstance(map);
    });
  }, []);

  return (
    <>
      <div
        className={styles.loading}
        style={{ display: loading ? "flex" : "none" }}
      >
        <Loading />
      </div>
      <div
        style={{ visibility: loading ? "hidden" : "visible" }}
        id="container"
        className={styles.container}
      ></div>
    </>
  );
};

export default AMapContainer;
