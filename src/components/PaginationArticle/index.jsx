import React from "react";

import { Pagination } from 'react-bootstrap';

const PaginationArticle = ({ page, onClickPagination }) => {

    const handleClickPagination = (value) => () => {
        onClickPagination && onClickPagination(value);
    }

    return(
        <Pagination>
            {page > 0 && <>
                <Pagination.First onClick={handleClickPagination(0)}/>
                <Pagination.Prev onClick={handleClickPagination(page-1)}/>
                <Pagination.Item onClick={handleClickPagination(page-1)}>{page}</Pagination.Item>
            </>}
            <Pagination.Item active>{page + 1}</Pagination.Item>
            {page < 99 && <>
                <Pagination.Item onClick={handleClickPagination(page+1)}>{page + 2}</Pagination.Item>
                <Pagination.Next onClick={handleClickPagination(page+1)}/>
                <Pagination.Last onClick={handleClickPagination(page+99)}/>
            </>}
        </Pagination>
    )
}

export default PaginationArticle;