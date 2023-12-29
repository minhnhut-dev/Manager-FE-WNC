import React from 'react'
import { useState } from 'react'
import { Card, CardBody, CardTitle, Container, Table, Row, Col, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationSample = ({numOfPage, currentPage, onDataChange}) => {

    const renderPagination = () => {

        const pagination = [];
        const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
        const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

        console.log(nextPage)
        console.log(prevPage)


        pagination.push(
            <PaginationItem >
                <PaginationLink
                    first
                    onClick={() => onDataChange(prevPage)}
                />
            </PaginationItem>
        )

        for (let i = 1; i <= numOfPage; i++) {
            pagination.push(
                <PaginationItem>
                    <PaginationLink onClick={() => onDataChange(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        pagination.push(
            <PaginationItem>
                <PaginationLink
                    onClick={() => onDataChange(nextPage)}
                    next
                />
            </PaginationItem>
        )
        return pagination;
    }

    
    return (
        <div>
            <Pagination className="d-flex justify-content-center">
                {renderPagination()}
            </Pagination>
        </div>
    )
}

export default PaginationSample
