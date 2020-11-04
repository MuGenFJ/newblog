import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const PaginationLinks = ({ currentPage, numberOfPages }) => {
    const isFirst = currentPage === 1
    const isLast = currentPage === numberOfPages
    const previousPage = currentPage - 1 === 1 ? '/' : 'page' + (currentPage - 1).toString()
    const nextPage = '/page/' + (currentPage + 1).toString()
    return (
        <Pagination aria-label="Page navigation exemple">
            {isFirst ? (
                <PaginationItem disabled >
                    <PaginationLink previous href="/" ></PaginationLink> 
                </PaginationItem>
            ): (
              <PaginationItem >
                    <PaginationLink previous href={previousPage} ></PaginationLink> 
                </PaginationItem>      
            )}
            {Array.from({ length: numberOfPages }, (_, index) => currentPage === index + 1 ? (
                <PaginationItem active key={`page-number${index + 1}`} >
                    <PaginationLink href={`/${index === 0 ? '' : 'page/' + (index + 1)}`}>
                        {index + 1 }
                    </PaginationLink>
                </PaginationItem>
            ): (
                 <PaginationItem key={`page-number${index + 1}`} >
                    <PaginationLink href={`/${index === 0 ? '' : 'page/' + (index + 1)}`}>
                        {index + 1 }
                    </PaginationLink>
                </PaginationItem>    
            ))}
            {isLast ? (
                <PaginationItem disabled >
                    <PaginationLink next href={nextPage} />
                </PaginationItem>
            ): (
                <PaginationItem >
                    <PaginationLink next href={nextPage} />
                </PaginationItem>      
            )}
        </Pagination>
    )
}

export default PaginationLinks