const classes = require('./../styles/menu.module.css');
import { UncontrolledCarousel, Row, Col } from 'reactstrap';

export default function Caroussel(props) {
  const carussel = () => {
    const items = [];
    props.items.map((el, i) => {
      if(el.forToday){
      let image = el.image !== undefined  ? `/dishes/${el.image}` : `/dishes/stockDishImg.png`
      items.push({
        src: image,
        altText: `Slide ${i}`,
        caption: '',
        header: '',
        key: i + el._id,
      });}
    });

    return <UncontrolledCarousel items={items} />;
  };

  return <div className={classes.carouselSize}>{carussel()}</div>;
}