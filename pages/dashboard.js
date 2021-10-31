import { useState, useEffect } from 'react';
import { useContext } from 'react';
// import ParamsContext from '../context/paramsContext';
import Script from 'next/script'
import AuthContext from './../context/authContext';
import dynamic from 'next/dynamic';
const classes = import('./../styles/dashboard.module.css');
// const BarChart = dynamic(() => import('../components/Charts/BarChart'), {
//   ssr: true,
// });
const LineChart = dynamic(() => import('../components/Charts/LineChart'), {
  ssr: true,
});
const DonutChart = dynamic(() => import('../components/Charts/DonutChart'), {
  ssr: false,
});

export default function dashboard() {
  const { session } = useContext(AuthContext);
  // const { params } = useContext(ParamsContext);
  const dateTime = new Date();
  // console.log(dateTime)
  const nextWeek = new Date(
    dateTime.setDate(dateTime.getDate() - dateTime.getDay() + 1) +
    7 * 24 * 60 * 60 * 1000
  );

  const nextWeekF = nextWeek
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('-');

  const monday = new Date(
    dateTime.setDate(dateTime.getDate() - dateTime.getDay() + 1)
  )
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('-');
  const month = [
    '',
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Deciembre',
  ];
  const days = [
    '',
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  let [stats, setStats] = useState({});
  let fiado = [];
  let sold = [];
  let earnings = [];
  let totalSoldDishes = [];
  let totalFiadoDishes = [];
  let totalDishes = [];
  const [loaded, setLoaded] = useState(false);
  const [loadedHistory, setLoadedHistory] = useState(false);
  // const [pickedDate = dateTime.toISOString().split('T')[0], setPickedDate] = useState();
  const [mode, setMode] = useState('day');
  const [valuesArray, setValuesArray] = useState({});
  const [value, setValue] = useState('totalDishes');
  const [historyMode, setHistoryMode] = useState('day');

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
      },
    },
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
  };

  useEffect(() => {
    const today = new Date()
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('-');

    fetch(`/api/getStats?mode=${mode}&day=${today.split('-')[0]}&month=${today.split('-')[1]}&year=${today.split('-')[2]}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${session.token}`,
        // 'url': params.local_backend_nodejs
      }
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => valitateIfemtpy(res))
      .then(() => setLoaded(true))

    // console.log(nextWeekF)

    fetch(`/api/getStatsHistory?mode=${mode}&day=${monday.split('-')[0]}&month=${monday.split('-')[1]}&year=${monday.split('-')[2]}&day2=${nextWeekF.split('-')[0]}&month2=${nextWeekF.split('-')[1]}&year2=${nextWeekF.split('-')[2]}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 
        Authorization: `Bearer ${session.token}`,
        // 'url': params.local_backend_nodejs
      }
    })
      .then((res) => res.json())
      // .then((res) => console.log(res.data.result))
      .then((res) => fillingArrayForLineChart(res.data.result, historyMode))
      .then(() => setLoadedHistory(true));
  }, []);

  const valitateIfemtpy = (res) => {
    if (res.data.result !== undefined) {
      if (res.data.result.length > 0) {
        setStats(res.data.result[0]);
      } else {
        setStats({})
      }
    } else {
      setStats({})
    }
  };

  const loadNewData = () => {

    const pickedDate = document.getElementById('calendar').value;
    const mode = document.getElementById('timeFrame').value;

    fetch(`/api/getStats?mode=${mode}&day=${pickedDate.split('-')[2]}&month=${pickedDate.split('-')[1]}&year=${pickedDate.split('-')[0]}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 
        Authorization: `Bearer ${session.token}`,
        // 'url': params.local_backend_nodejs
      },
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => valitateIfemtpy(res));

    const pickedDateH = new Date(document.getElementById('calendar').value);
    const pickedDateMonday = new Date(
      pickedDateH.setDate(pickedDateH.getDate() - pickedDateH.getDay())
    );

    const pickedDateMondayF = pickedDateMonday
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('-');


    const nextWeek = new Date(
      pickedDateMonday.setDate(
        pickedDateMonday.getDate() - pickedDateMonday.getDay()
      ) +
      7 * 24 * 60 * 60 * 1000
    );
    const nextWeekF = nextWeek
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('-');

    setHistoryMode(mode);

    fetch(`/api/getStatsHistory?mode=${mode}&day=${pickedDateMondayF.split('-')[0]}&month=${pickedDateMondayF.split('-')[1]}&year=${pickedDateMondayF.split('-')[2]}&day2=${nextWeekF.split('-')[0]}&month2=${nextWeekF.split('-')[1]}&year2=${nextWeekF.split('-')[2]}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 
        Authorization: `Bearer ${session.token}`,
        // 'url': params.local_backend_nodejs
      },
    })
      .then((res) => res.json())
      // .then((res) => console.log(res.data))
      .then((res) => fillingArrayForLineChart(res.data.result, historyMode));
  };

  const putValue = (category) => {
    setValue(category);
  };

  const fillingArrayForLineChart = (result, historyMode) => {
    // console.log(result)
    if (result !== undefined) {
      if (historyMode === 'month') {
        result.map((el) => {
          fiado[el._id] = el.fiado;
          sold[el._id] = el.sold;
          earnings[el._id] = el.earnings;
          totalSoldDishes[el._id] = el.totalSoldDishes;
          totalFiadoDishes[el._id] = el.totalFiadoDishes;
          totalDishes[el._id] = el.totalFiadoDishes + el.totalSoldDishes;
        });
        setValuesArray({
          fiado,
          sold,
          earnings,
          totalFiadoDishes,
          totalSoldDishes,
          totalDishes,
        });
      } else if (historyMode === 'year') {
        let year = [];
        result.map((el) => {
          fiado.push(el.fiado);
          sold.push(el.sold);
          earnings.push(el.earnings);
          totalSoldDishes.push(el.totalSoldDishes);
          totalFiadoDishes.push(el.totalFiadoDishes);
          year.push(el._id);
          totalDishes.push(el.totalFiadoDishes + el.totalSoldDishes);
        });
        setValuesArray({
          fiado,
          sold,
          earnings,
          totalFiadoDishes,
          totalSoldDishes,
          totalDishes,
          year,
        });
      } else if (historyMode === 'day') {
        result.map((el) => {
          fiado[el._id] = el.fiado;
          sold[el._id] = el.sold;
          earnings[el._id] = el.earnings;
          totalSoldDishes[el._id] = el.totalSoldDishes;
          totalFiadoDishes[el._id] = el.totalFiadoDishes;
          totalDishes[el._id] = el.totalFiadoDishes + el.totalSoldDishes;
        });
        setValuesArray({
          fiado,
          sold,
          earnings,
          totalFiadoDishes,
          totalSoldDishes,
          totalDishes,
        });
      }
    }
  };

  const lineChart = () => {
    let category = '';
    let dataSetLabel = '';
    if (value === 'totalDishes')
      (category = 'Total de platos'), (dataSetLabel = 'Platos');
    if (value === 'earnings')
      (category = 'Dinero ganado neto'), (dataSetLabel = 'Dinero');
    if (value === 'totalFiadoDishes')
      (category = 'Total de platos fiados'), (dataSetLabel = 'Platos');
    if (value === 'totalSoldDishes')
      (category = 'Total de platos pagados'), (dataSetLabel = 'Platos');
    if (value === 'fiado')
      (category = 'Total de dinero en platos fiados'),
        (dataSetLabel = 'Dinero');
    if (value === 'sold')
      (category = 'Total de dinero en platos pagados'),
        (dataSetLabel = 'Dinero');
    if (loadedHistory) {
      if (historyMode === 'month') {
        return (
          <LineChart
            category={category}
            name={'Por mes'}
            labels={month}
            dataSetLabel={dataSetLabel}
            values={valuesArray[value]}
            chartId={'lineHistory'}
            height={process.env.NEXT_PUBLIC_Line_Chart_Height}
            maintainAspectRatio={false}
          />
        );
      } else if (historyMode === 'year') {
        return (
          <LineChart
            category={category}
            name={'Por año'}
            labels={valuesArray['year']}
            dataSetLabel={dataSetLabel}
            values={valuesArray[value]}
            chartId={'lineHistory'}
            height={process.env.NEXT_PUBLIC_Line_Chart_Height}
            maintainAspectRatio={false}
          />
        );
      } else if (historyMode === 'day') {
        return (
          <LineChart
            category={category}
            name={'Por dia'}
            labels={days}
            dataSetLabel={dataSetLabel}
            values={valuesArray[value]}
            chartId={'lineHistory'}
            height={process.env.NEXT_PUBLIC_Line_Chart_Height}
            maintainAspectRatio={false}
          />
        );
      }
    }
    return <></>;
  };

  if (!loaded) {
    return <div></div>; //show nothing or a loader
  } else {
    return (
      <div>
        <div className="container">
          <h1>Estadisticas</h1>
          <div>
            <div className="row">
              <div className="col">
                <select
                  id="timeFrame"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="day" defaultValue>
                    Hoy
                  </option>
                  <option value="month">Mes</option>
                  <option value="year">Año</option>
                </select>
              </div>
              <div className="col">
                <input type="date" id="calendar" className="form-control" />
              </div>
            </div>
            <input type="button" value="Buscar" onClick={() => loadNewData()} />
          </div>
          <div className="row">
            <div className="col">
              <DonutChart
                category={'Platos'}
                name={'Platos vendidos'}
                labels={['Vendido', 'Restante']}
                values={[
                  stats.totalFiadoDishes + stats.totalSoldDishes,
                  50 - (stats.totalFiadoDishes + stats.totalSoldDishes),
                ]}
                options={options}
                chartId={'platos'}
              />
            </div>
            <div className="col">
              <DonutChart
                category={'Comparacion'}
                name={'Pagado vs Fiado'}
                labels={['Pagado', 'Fiado']}
                values={[stats.totalSoldDishes, stats.totalFiadoDishes]}
                chartId={'pagadoVsFiado'}
              />
            </div>
            <div className="col">
              <DonutChart
                category={'Finanzas'}
                name={'Ganancias'}
                labels={['Entrada', 'Meta']}
                values={[stats.earnings, 100 - stats.earnings]}
                options={options}
                chartId={'ganancias'}
                className={classes.lineChart}
              />
            </div>
          </div>
          <h1>Historiales</h1>
          <div className="row">
            <div className="col">
              <select
                id="lineCategory"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => putValue(e.target.value)}
              >
                <option value="totalDishes" defaultValue>
                  Total de Platos
                </option>
                <option value="earnings">Ganancias</option>
                <option value="fiado">Fiado</option>
                <option value="sold">Vendido</option>
                <option value="totalFiadoDishes">Platos fiados</option>
                <option value="totalSoldDishes">Platos pagados</option>
              </select>
            </div>
          </div>

          <div className={'row'}>
            <div className="col">{lineChart()}</div>
          </div>
        </div>
        <br />
        <Script
          src="http://google.com"
          onLoad={() => {
            document.getElementById('calendar').value = new Date()
              .toISOString()
              .split('T')[0];
          }}
        />
      </div>
    );
  }
}