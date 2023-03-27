import { Pagination } from "react-bootstrap"
import { useSelector } from "react-redux"

export default function PaginationComponent({ productsPerPage, totalProducts, paginate})
{
    const pageNumbers = []
    const { currentPage } = useSelector(store => store.allProducts)

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++)
    {
        pageNumbers.push(i)
    }

    return(
        <Pagination className="mt-3">
            <Pagination.First onClick={ () => paginate(pageNumbers[0]) } />
            <Pagination.Prev  onClick={ () => {
                    if (currentPage === pageNumbers[0]) return
                    paginate(currentPage - 1)
                }}
            />
            {
                pageNumbers.map( number => (
                    <Pagination.Item key={number} onClick={() => paginate(number)} active={ number === currentPage}>
                        {number}
                    </Pagination.Item>
                ) )
            }
            <Pagination.Next onClick={ () => {
                if (currentPage === pageNumbers[pageNumbers.length - 1]) return
                paginate(currentPage + 1)                
                } 
            } />
            <Pagination.Last onClick={() => paginate(pageNumbers[pageNumbers.length - 1] )} />
        </Pagination>
    )
}