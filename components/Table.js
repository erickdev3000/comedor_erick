const classes = require('./../styles/sellHistory.module.css');
export default function Table(props) {
  const renderBody = () => {
    return (
      <>
        {props.items.map((el, i) => {
          return (
            <div key={i} className="row">
              {props.body.map((body, j) => {
                el.estado = 'Pagado';
                let fondo = '';
                if (el.isFiado) {
                  el.estado = 'Fiado';
                  fondo = classes.estado;
                }
                return (
                  <div
                    key={j}
                    className={
                      'col ' +
                      classes.bodyRow +
                      ' ' +
                      classes.middleCol +
                      ' ' +
                      fondo +
                      ' ' +
                      classes.cellWidth
                    }
                  >
                    {typeof el[body] === 'number'
                      ? body === 'totalPrice' || body === 'price' || body === 'payed'
                        ? `$${el[body].toFixed(2)}`
                        : el[body]
                      : el[body]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className={'container ' + classes.tableBorder}>
      <div className="row">
        {props.headers.map((el, i) => {
          return (
            <div
              key={i}
              className={
                'col ' +
                classes.headerRow +
                ' ' +
                classes.middleCol +
                ' ' +
                classes.cellWidth
              }
            >
              {el}
            </div>
          );
        })}
      </div>
      {renderBody()}
    </div>
  );
}
