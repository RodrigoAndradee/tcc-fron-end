import React, { useState } from "react";
import PropTypes from "prop-types";

import { Col, InputNumber, Pagination, Row, Tooltip } from "antd";
// import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

import { QUANTITY_LABEL } from "../../../constants/stockConstants";

import BasicCard from "../../../components/basicCard/BasicCard";

import { stockObjectShape } from "../../../types/StockProptypes";

import "../Stock.scss";

const defaultPlacement = "bottom";
const pageItemsCount = 8;

function StockPagination({ stockData, deleteStock }) {
  const [paginationValue, setPaginationValues] = useState({
    min: 0,
    max: pageItemsCount,
    currentPage: 1,
  });

  const handleChangePageNumber = (page) => {
    setPaginationValues({
      min: (page - 1) * pageItemsCount,
      max: page * pageItemsCount,
      currentPage: page,
    });
  };

  const handleDelete = (stockInfo) => {
    deleteStock(stockInfo.id);
  };

  const optionsCardButton = (cardInfo) => {
    return [
      <Tooltip title={QUANTITY_LABEL} placement={defaultPlacement}>
        <InputNumber
          min={0}
          value={cardInfo.quantity}
          className="input-quantity"
        />
      </Tooltip>,

      <Tooltip title="Deletar Produto do Estoque" placement={defaultPlacement}>
        <DeleteOutlined onClick={() => handleDelete(cardInfo)} />
      </Tooltip>,
    ];
  };

  return (
    <>
      <Row gutter={[16, 16]} className="stock-body">
        {stockData
          .slice(paginationValue.min, paginationValue.max)
          .map((cardInfo) => {
            const { product: productInfo } = cardInfo;

            return (
              <Col span={6} key={cardInfo.id}>
                <BasicCard
                  optionsButton={() => optionsCardButton(cardInfo)}
                  productsInfo={productInfo}
                  dueDate={cardInfo.dueDate}
                />
              </Col>
            );
          })}
      </Row>

      <Pagination
        className="pagination-stock"
        current={paginationValue.currentPage}
        onChange={handleChangePageNumber}
        pageSize={pageItemsCount}
        showSizeChanger={false}
        total={stockData.length}
      />
    </>
  );
}

StockPagination.propTypes = {
  deleteStock: PropTypes.func,
  stockData: stockObjectShape.isRequired,
};

StockPagination.defaultProps = {
  deleteStock: () => {},
};

export default StockPagination;
