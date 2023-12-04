import React from 'react';
import styled from 'styled-components';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PageNumber
                    key={i}
                    onClick={() => onPageChange(i)}
                    active={i === currentPage}
                >
                    {i}
                </PageNumber>
            );
        }

        return pageNumbers;
    };

    return (
        <PaginationContainer>
            <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                이전
            </PageButton>
            {renderPageNumbers()}
            <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                다음
            </PageButton>
        </PaginationContainer>
    );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  cursor: pointer;
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: transparent;
  font-size: 16px;
  color: ${(props) => (props.disabled ? '#aaa' : '#000')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const PageNumber = styled.span`
  cursor: pointer;
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#eee' : 'transparent')};
`;

export default Pagination;
