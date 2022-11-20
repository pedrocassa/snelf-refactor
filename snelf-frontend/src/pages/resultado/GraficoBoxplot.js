import React from "react";
import Plot from 'react-plotly.js';


export default function GraficoBoxPlot({ dataset }) {
  
  let valores = Object.entries(dataset).map((e) => e[1].valorunitariocomercial);

  return (
      <Plot
        id="boxplot"
        data={[
          {
            y: valores,
            type: 'box',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 960, height: 720, title: 'Box Plot de Preço'} }
        />
  );
}
