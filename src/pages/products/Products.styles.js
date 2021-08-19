import styled from "styled-components";
import { PROJECT_VARIABLES } from "../../constants/uiConstants";

export const StyledProducts = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  .empty-data {
    margin-top: 50px;
  }
`;

export const StyledProductsPagination = styled.div`
  display: flex;
  justify-content: center;

  .products-body {
    width: ${PROJECT_VARIABLES.systemWidth};
  }

  .pagination-products {
    bottom: 40px;
    position: absolute;
  }
`;