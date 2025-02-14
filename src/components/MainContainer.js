import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [ stocks, setStocks ] = useState([])
  const [ myStocks, setMyStocks ] = useState([])

  const [ sortBy, setSortBy ] = useState('')
  

  useEffect(() => {
    fetch ("http://localhost:3001/stocks")
    .then (res => res.json())
    .then(data => setStocks(data))
  }, [])

  useEffect(() => {
    if(sortBy === 'Alphabetically'){
      const sortedStocks = sortByName() 
      setStocks(sortedStocks)
    } else {
      const sortedStocks = sortByPrice() 
      setStocks(sortedStocks)
    }
  }, [ sortBy ])

  const sortStocks = (e) => {
    setSortBy(e.target.value)
  }

  const sortByName = () => {
    return[...stocks].sort(function(a, b) {
      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  const sortByPrice = () => {
    return [...stocks].sort(function (a, b) {
      return a.price - b.price;
    });
  }

  const buyStock = (stock) => {
    if(!myStocks.includes(stock)){
      const updatedMyStocks = [...myStocks, stock]
      setMyStocks(updatedMyStocks)
    } else {
      alert("You already have it!")
    }
  }

  const sellStock = (stock) => {
    const updatedMyStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
    setMyStocks(updatedMyStocks)
  }

  return (
    <div>
      <SearchBar sortStocks={sortStocks} sortBy={sortBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={myStocks} handleClick={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
