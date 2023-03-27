import ItemCard from "./ItemCard"
import { Spinner } from "react-bootstrap"
import NetworkError from "./NetworkError"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import React from "react"


export default function LatestProducts(props)
{

  if (props.isLoading) return (
      <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
      </div>
  )

  if (props.loadingFailed) return (
      <NetworkError />
  )

  return (
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          { 
              props.latestProducts.map( (product, index) =>(
                  <div className="ms-3"  key={index}>
                      <ItemCard product={product} />
                  </div>
              )) 
          }          
      </ScrollMenu>
  )
}

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

    if (isFirstItemVisible)
    {
      return(
        <div disabled={isFirstItemVisible} className=" me-2 d-flex justify-content-center align-items-center arrow">
          <div className="chevron-scroll p-2 "></div>
        </div>
      )
    }

    return (
      <div disabled={isFirstItemVisible} onClick={() => scrollPrev()} className=" me-2 d-flex justify-content-center align-items-center arrow">
        <div className="arrow-container border border-secondary p-2 bg-light">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 chevron-scroll" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
    );
  }
  
function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  
    if (isLastItemVisible)
    {
      return(
        <div disabled={isLastItemVisible} onClick={() => scrollNext()} className=" me-2 d-flex justify-content-center align-items-center arrow">
          <div className="chevron-scroll p-2 "></div>
        </div>
      )
    }

    return (
      <div disabled={isLastItemVisible} onClick={() => scrollNext()}  className="ms-2 d-flex justify-content-center align-items-center arrow">
        <div className="arrow-container border border-secondary p-2 bg-light">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 chevron-scroll" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    );
  }