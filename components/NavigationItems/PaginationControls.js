import { useState, useEffect } from 'react';

export default function PaginationControls(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [total = Math.ceil(props.totalRecords / props.limit), setTotal] = useState();

  useEffect(()=>{
    setTotal(Math.ceil(props.totalRecords / props.limit))
  },[])

    const searchPage = (page) => {
        let newUrl = ''
        if(page < 0 || page > total) return;
        setCurrentPage(page)

        let body = JSON.stringify({
          limit: props.limit,
          page,
          sort: props.sort,
          type: props.type
        })
        if(props.method === 'GET') {
          body = null;
          newUrl = `${props.url}?limit=${props.limit}&page=${page}`
        }else {
          newUrl = props.url
        }
        // console.log(newUrl, props.method)
        fetch(`${newUrl}`, {
          method: `${props.method}`,
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${props.token}`,
            'content-type': 'application/json',
          },
          body: body,
        })
          .then((res) => res.json())
          // .then((res) => console.log(res))
          .then(
            (res) => {
              props.toUpdateParent(res);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setError(error);
            }
          );
      };

  let drawPagination = () => {
    // console.log(Math.ceil(totalRecords / 10))
    let totalPages = [];
    for (let i = 0; i < total; i++) {
      totalPages.push(i);
    }
    return totalPages;
  };

  return (
    <nav aria-label="Page navigation example">
      {/* {console.log(props.totalRecords)} */}
      <ul className="pagination">
        {/* Previous Page */}
        <li className="page-item">
          <button className="page-link" aria-label="Previous" onClick={(e) => searchPage(currentPage - 1)}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {drawPagination().map((el, i) => {
          return (
            <li key={i} className="page-item">
              <button
                className="page-link"
                onClick={(e) => searchPage(i * 1 + 1)}
              >
                {i * 1 + 1}
              </button>
            </li>
          );
        })}
        {/* Next Page */}
        <li className="page-item">
          <button className="page-link" aria-label="Next" onClick={(e) => searchPage(currentPage + 1)}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
