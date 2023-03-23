import styled from "styled-components";

const containerSize = { width: 375, height: 767 };
const mainPostImg = { width: 130, heith: 100 };

//App
export const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #c2deff;
  display: flex;
`;

export const Container = styled.div`
  width: ${containerSize.width}px;
  height: 100vh;
  min-width: ${containerSize.width}px;
  max-height: ${containerSize.height}px;
  margin: auto;
  overflow: hidden;
  background-color: #f8f8f8;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    position: absolute;
    right: 0;
    width: 3px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c1c8cf;
  }
`;

//Main
export const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const PostCard = styled.div`
  max-width: ${mainPostImg.width}px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px 0;
  background-color: #ffffff;
  border-radius: 5px;

  :hover {
    transition: box-shadow 0.3s;
    box-shadow: 0px 0px 5px #00000063;
  }

  img {
    width: ${mainPostImg.width}px;
    height: ${mainPostImg.heith}px;
    object-fit: cover;
    border-radius: 10px;
  }

  div {
    max-width: 150px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #28436e;

    label {
      margin-top: 5px;
      font-size: 12px;
      color: #00000097;
      cursor: pointer;

      :nth-child(3n) {
        margin-top: 10px;
        font-size: 6px;
      }
    }
  }

  h5 {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 700;
  }
`;
