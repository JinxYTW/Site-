/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'plotty';
import 'leaflet-geotiff';
import 'geotiff';
import GeoTIFF from "geotiff";
import plotty from "plotty";

function Maps() {
  useEffect(() => {
    const map = L.map("map").setView([47.3220, 5.0415], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    fetch('http:\\localhost:3000\\C:\\Users\\tyoha\\OneDrive\\Bureau\\Site\\material-dashboard-material-ui-v4-main\\Geotiff_previ_DM\\14112023\\BFC_dijon_atmo_14112023_jm1_mean.tif')
      .then(r => r.arrayBuffer())
      .then(buffer => {
        const geotiff = GeoTIFF.parse(buffer);
        const image = geotiff.getImage();
        const rasters = image.readRasters();
        const tiepoint = image.getTiePoints()[0];
        const fileDirectory = image.getFileDirectory();
        const [red] = rasters;
        const plot = new plotty.plot({
          data: red,
          width: fileDirectory.ImageWidth,
          height: fileDirectory.ImageLength,
          domain: [0, 255],
          colorScale: 'viridis',
        });

        const geoTransform = [tiepoint.x, fileDirectory.ModelPixelScale[0], 0, tiepoint.y, 0, -1 * fileDirectory.ModelPixelScale[1]];

        const georaster = {
          width: fileDirectory.ImageWidth,
          height: fileDirectory.ImageLength,
          data: rasters,
          pixelWidth: fileDirectory.ModelPixelScale[0],
          pixelHeight: fileDirectory.ModelPixelScale[1],
          xmin: geoTransform[0],
          ymax: geoTransform[3],
          xmax: geoTransform[0] + fileDirectory.ImageWidth * fileDirectory.ModelPixelScale[0],
          ymin: geoTransform[3] - fileDirectory.ImageLength * fileDirectory.ModelPixelScale[1],
          transform: geoTransform,
          crs: L.CRS.EPSG4326,
        };

        L.leafletGeotiff(georaster, { plot }).addTo(map);
      });
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
}

export default Maps;