import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/authContext';
// import ParamsContext from '../context/paramsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Menu() {
    const dateTime = new Date();
    const { session } = useContext(AuthContext);
    // const {params} = useContext(ParamsContext);
    const [item, setItem] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [date = dateTime.toISOString().split('T')[0], setDate] = useState();
    useEffect(() => {
        const today = new Date()
            .toISOString()
            .split('T')[0]
            .split('-')
            .reverse()
            .join('-');
        fetch(`/api/getOutcome?limit=100&day=${today.split('-')[0]}&month=${today.split('-')[1]}&year=${today.split('-')[2]}&mode=day`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: session.token,
                    // 'url': params[0].paramValue
                }
            }
        )
            .then((res) => res.json())
            // .then((res) => console.log(res))
            .then((res) => updateResults(res.data.records, today))
            .then(() => setLoaded(true));
    }, [])

    const updateResults = (records, day) => {
        // console.log(records)
        setItem(records)
        if(records.earnings.length > 0 && records.expenses.length > 0){
            toast.success(`Datos del ${day}`)
        }else {
            toast.error(`No hay datos de ${day}`)
        }
    }

    const getStats = () => {
        const pickedDate = document.getElementById('calendar').value;
        const mode = document.getElementById('calendarMode').value;
        fetch(`/api/getOutcome?limit=100&day=${pickedDate.split('-')[2]}&month=${pickedDate.split('-')[1]}&year=${pickedDate.split('-')[0]}&mode=${mode}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: session.token,
                    // 'url': params[0].paramValue
                }
            }
        )
            .then((res) => res.json())
            // .then((res) => console.log(res))
            .then((res) => updateResults(res.data.records, pickedDate));
    }

    if (!loaded) {
        return <h1>Cargando...</h1>
    } else {
        return (
            <>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="calendar" className="form-control" />

                <select
                    id="calendarMode"
                    className="form-select"
                    aria-label="Default select example"
                // onChange={(e) => putHistoryMode(e.target.value)}
                >
                    <option value="day" defaultValue>
                        Dia
                    </option>
                    <option value="week">Semana</option>
                    <option value="month">Mes</option>
                    <option value="year">Año</option>
                </select>
                <input type="button" value="Buscar" onClick={(e) => getStats(e)} />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    {/* {console.log(items[0].expense)} */}
                                    <h5 className="card-title">Salidas del dia</h5>
                                    {item.expenses.length > 0 ? '$' + item.expenses[0].expense : `No hay datos de esta fecha ${date}`}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    {/* {console.log(items[0].expense)} */}
                                    <h5 className="card-title">Entradas del dia</h5>
                                    {item.earnings.length > 0 ? '$' + item.earnings[0].earning : `No hay datos de esta fecha ${date}`}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    {/* {console.log(items[0].expense)} */}
                                    <h5 className="card-title">Ganancias netas</h5>
                                    {
                                        (item.earnings.length > 0 ? item.earnings[0].earning * 1 : 0) - (item.expenses.length > 0 ? item.expenses[0].expense * 1 : 0)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ToastContainer />
                </div>
            </>
        );
    }
}