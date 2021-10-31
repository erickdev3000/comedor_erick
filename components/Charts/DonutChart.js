import { useEffect, memo } from 'react';
import Script from 'next/script';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default memo(function DonutChart(props) {
  // console.log(props.labels)
  let chartId = props.chartId;
  let config = {
    type: 'doughnut',
    plugins: [ChartDataLabels],
    data: {
      labels: props.labels,
      datasets: [
        {
          // label: 'My First Dataset',
          data: props.values,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: props.options,
  };
  
  useEffect(() => {
    if (chartId !== undefined) {
      let ctx = document.getElementById(chartId).getContext('2d');
      window[chartId] = new Chart(ctx, config);
    } else {
      console.log('No id provided for the chart');
    }
  }, [props.values]);

  const destroyCanvas = (chartId) => {
    if (window[chartId] !== undefined) window[chartId].destroy();
  }

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
      <Script>
        {destroyCanvas(chartId)}
      </Script>
    </>
  );
})
