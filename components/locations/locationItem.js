import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LocationCard = styled.div`
  width: 100%;
  //   padding: 0.5vw 0.5vw 0.5vw 0.5vw;
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr;
  grid-template-areas: "header content";
  &:hover {
    background-color: #efefef;
  }
  background-color: ${props => (props.isSelected ? "#efefef" : "white")};
`;

const CardHeader = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-content: right;
  text-align: right;
`;

const CardContent = styled.div`
  grid-area: content;
  display: flex;
  justify-content: left;
  text-align: left;
  align-content: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.3vw;
`;

const LocationItem = props => {
  console.log("kuy");
  return (
    <LocationCard
      onClick={() => props.onLocationSelected(props.index)}
      isSelected={props.isSelected}
    >
      <CardHeader>
        <FontAwesomeIcon
          icon="circle"
          color={props.location.person_state.LOOP_LEAVE > 3 ? "red" : "green"}
          size="small"
          key={"icon-" + props.index}
        />
      </CardHeader>
      <CardContent>{props.location.location}</CardContent>
    </LocationCard>
  );
};

export default LocationItem;
