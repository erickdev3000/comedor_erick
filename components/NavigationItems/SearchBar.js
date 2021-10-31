const searchBarController = require('./../../controllers/searchBarController.js');
const classes = require('./../../styles/menu.module.css');

export default function SearchBar(props) {
  let internalFilterObject = [];
  const searchItem = (text) => {
    let re = new RegExp(`\\b${text.toLowerCase()}`, 'g');
    props.items.map((el, i) => {
      let nameLowerCase = el.name.toLowerCase();
      if (nameLowerCase.match(re)) {
        internalFilterObject[i] = el;
      } else {
        delete internalFilterObject[i];
      }
    });
    // console.log(filterObject)
    //This is to update the object in the return, as if not the copy in the client won't update
    props.updateFilter(
      searchBarController.cleanArray(
        JSON.parse(JSON.stringify(internalFilterObject))
      )
    );
  };
  return (
    <>
      <input
        className={'form-control me-2 ' + classes.searchBar}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => searchItem(e.target.value)}
      />
    </>
  );
}
