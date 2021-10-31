import { useEffect, memo } from 'react';
import Script from 'next/script';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// const classes = import('./../../styles/dashboard.module.css')

export default memo(function LineChart(props) {
  let chartId = props.chartId;
  let config = {
    type: 'line',
    plugins: [ChartDataLabels],
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.dataSetLabel,
          data: props.values,
          fill: false,
          borderColor: 'rgb(255,0,0)',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: props.maintainAspectRatio,
    },
  };
  useEffect(() => {
    if (chartId !== undefined) {
      window[chartId] = chartId;
      let ctx = document.getElementById(chartId).getContext('2d');
      window[chartId] = new Chart(ctx, config);
    } else {
      console.log('No id provided for the chart');
    }
  }, [props.values]);

  const destroyCanvas = (chartId) => {
    if (window[chartId] !== undefined) window[chartId].destroy();
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                {props.category}
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                {props.name}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id={chartId}></canvas>
          </div>
        </div>
      </div>
      <Script>{destroyCanvas(chartId)}</Script>
    </>
  );
})