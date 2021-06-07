import React, { useEffect, useReducer, useState } from "react";
import { Empty } from "antd";

import BasicDrawer from "../../components/basicDrawer/BasicDrawer";
import GenericPage from "../../components/genericPage/GenericPage";
import StockForm from "./form/StockForm";
import StockPagination from "./stockPagination/StockPagination";
import Toolbar from "../../components/toolbar/Toolbar";

import { CategoryActions } from "../../store/actions/Categories";
import {
  CreateStockActions,
  StockActions,
  UpdateStockActions,
} from "../../store/actions/Stock";
import { ProductsActions } from "../../store/actions/Products";

import { categoriesReducer } from "../../store/reducers/Categories";
import {
  CreateStockReducer,
  StockReducer,
  UpdateStockReducer,
} from "../../store/reducers/Stock";
import { ProductsReducer } from "../../store/reducers/Products";

import {
  filterStockByCategory,
  filterStockByName,
  filterStockByDueDate,
} from "../../helpers/StockHelpers";

import { DRAWER_LABELS } from "../../constants/stockConstants";
import { ROUTES } from "../../constants/routesConstants";
import { EMPTY_DATA } from "../../constants/errorsConstants";

import "./Stock.scss";

export default function Storage() {
  const [drawerState, setDrawerState] = useState(false);
  const [stockProducts, setStockProducts] = useState();

  const [stockData, dispatchStockData] = useReducer(StockReducer);
  const [createStockData, dispatchCreateStockData] = useReducer(
    CreateStockReducer
  );
  const [productsData, dispatchProductsData] = useReducer(ProductsReducer);
  const [categoriesInfoData, dispatchCategoriesInfoData] = useReducer(
    categoriesReducer
  );
  const [updateStockData, dispatchUpdateStockData] = useReducer(
    UpdateStockReducer
  );

  const handleAddProduct = () => {
    if (!drawerState) {
      setDrawerState(true);
    }
  };

  const onSubmitForm = (stockInfo) => {
    const enhancedStockInfo = {
      ...stockInfo,
      dueDate: stockInfo.dueDate.format("YYYY-MM-DD"),
    };

    CreateStockActions(enhancedStockInfo)(dispatchCreateStockData);

    setDrawerState(false);
  };

  const updateStockProduct = (stockInfo) => {
    UpdateStockActions(stockInfo)(dispatchUpdateStockData);
  };

  const onClose = () => {
    setDrawerState(false);
  };

  const onFilterByName = (typedName) => {
    setStockProducts(filterStockByName(stockData, typedName));
  };

  const onFilterByCategory = (category) => {
    setStockProducts(filterStockByCategory(stockData, category));
  };

  const onFilterByDueDate = (selectedDate) => {
    setStockProducts(filterStockByDueDate(stockData, selectedDate));
  };

  useEffect(() => {
    CategoryActions()(dispatchCategoriesInfoData);
    ProductsActions()(dispatchProductsData);
  }, []);

  useEffect(() => {
    setStockProducts(stockData);
  }, [stockData]);

  useEffect(() => {
    StockActions()(dispatchStockData);
  }, [createStockData, updateStockData]);

  return (
    <div className="main-div-stock">
      <BasicDrawer
        isOpen={drawerState}
        title={DRAWER_LABELS.title}
        cancelButton={DRAWER_LABELS.cancelButton}
        confirmButton={DRAWER_LABELS.confirmButton}
        onClose={onClose}
        onFinish={onSubmitForm}
      >
        {() => <StockForm productsInfo={productsData} />}
      </BasicDrawer>

      <GenericPage
        toolbar={
          categoriesInfoData && (
            <Toolbar
              buttonLabel="Produto"
              categoriesInfoData={categoriesInfoData}
              onClickAddButton={handleAddProduct}
              onSearchByName={onFilterByName}
              onSelectCategory={onFilterByCategory}
              onSelectDate={onFilterByDueDate}
              pageName={ROUTES.stock.pageName}
            />
          )
        }
        body={
          <>
            {stockProducts && stockProducts.length ? (
              <StockPagination
                stockData={stockProducts}
                updateStockProduct={(stockInfo) =>
                  updateStockProduct(stockInfo)
                }
              />
            ) : (
              <Empty className="empty-data" description={false}>
                {EMPTY_DATA.emptyStock}
              </Empty>
            )}
          </>
        }
      />
    </div>
  );
}
