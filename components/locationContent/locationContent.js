import React from "react";
import styled from "styled-components";
import LocationItem from "../locations/locationItem";
import Fade from "react-reveal/Fade";
import HeatMap from "react-heatmap-grid";

const InfoWrapper = styled.div`
  height: 100%;
`;

const Infos = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 60% 25%
  grid-template-areas:
    "header"
    "image"
    "content";
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2vw;
  height: 60vh;
`;

const InfoHeader = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const InfoImageContainer = styled.div`
  grid-area: image;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-self: center;
  align-content: top;
  width: 500px;
  height: 250px;
  position: relative;
`;
const HeatMapOverlay = styled.div`
  font-size: 0px;
  position: absolute;
  left: -50px;
  //   top: -5px;
  //   left: -10px;
`;
const InfoImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;

  //   width: 40vw;
  //   height: 20vw;
  z-index: -2;
`;
const InfoContent = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  font-size: 1.2vw;
  justify-content: center;
  align-content: top;
  align-self: top;
  // width: 500px;
  // padding: 20px;
`;

const InfoContentStuff = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  align-self: center;
  padding: 5px;
`;
const ButtonWrapper = styled.div`
  grid-area: button;
  display: flex;
  align-content: center;
  justify-content: center;
`;
const HeatmapButton = styled.button`
  color: black;
  padding: 1em 1em;
  border-radius: 5px;
  text-align: center;
  font-size: 1.2vw;
  opacity: 0.8;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  // cursor: pointer;
  &:hover {
    opacity: 1;
  }
  height: 120px;
  width: 120px;
`;

const InfoContentContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "button content";
`;

class LocationContent extends React.Component {
  constructor(props) {
    super(props);

    this.heatMapStateEnum = ["Default", "Existence", "Sitting"];
    this.heatMapKeyEnum = [null, "existence_heatmap", "sitting_heatmap"];
    this.s3URL = "https://s3-ap-northeast-1.amazonaws.com/mitipa-images/";
    this.buttonColor = ["#fc9b7a", "#51a1c4", "#dae23d"];
    this.heatmapColor = ["0 0 0", "0, 151, 230", "218, 226, 61"];
    this.state = {
      loaded: false,
      heatMapState: 0,
      renderHeatmap: true
    };
  }

  onClickHeatMapButton = () => {
    this.setState({
      heatMapState: (this.state.heatMapState + 1) % this.heatMapStateEnum.length
    });
  };

  componentDidMount() {
    console.log("KUY PROP");
  }

  arrSum = arr => arr.reduce((a, b) => a + b, 0);

  render() {
    const { selectedLocationInfo } = this.props;
    const { heatMapState } = this.state;
    console.log("selectedLocationInfo: ", selectedLocationInfo);

    /////////////////////////
    const xLabels = new Array(10).fill(0).map((_, i) => `${i}`);
    // Display only even labels
    const xLabelsVisibility = new Array(10)
      .fill(0)
      .map((_, i) => (i % 2 === 0 ? true : false));

    const yLabels = new Array(5).fill(0).map((_, i) => `${i}`);
    ///////////////////////////
    var data = null;
    if (heatMapState != 0) {
      data = selectedLocationInfo[this.heatMapKeyEnum[heatMapState]];
    }
    let data_sum = 0;
    if (data != null) {
      data.map(row => {
        data_sum += this.arrSum(row);
      });
    }
    // if (selectedLocationInfo != null) {
    //   var person_state = selectedLocationInfo.person_state;
    //   var person_state_key = Object.keys(person_state);

    var person_state = {
      LEAVE: 0,
      SITTING: 0,
      ENTER: 0,
      LOOP_LEAVE: 0,
      WANDERING: 0,
      TEMP_LEAVE: 0
    };
    var person_state_key = Object.keys(person_state);
    if (selectedLocationInfo != null) {
      var person_state = selectedLocationInfo.person_state;
    }

    return (
      <InfoWrapper className="infowrapper">
        {selectedLocationInfo == null ? null : (
          <Fade spy={selectedLocationInfo}>
            <Infos className="infos">
              <InfoHeader>{selectedLocationInfo.location}</InfoHeader>
              <InfoImageContainer>
                <InfoImage src={this.s3URL + selectedLocationInfo.image} />
                {data_sum == 0 ? null : (
                  <HeatMapOverlay>
                    {data == null ? null : (
                      <HeatMap
                        xLabels={xLabels}
                        yLabels={yLabels}
                        data={data}
                        height={50}
                        squares
                        //   xLabelWidth={200}
                        //   yLabelWidth={200}
                        cellStyle={(
                          background,
                          value,
                          min,
                          max,
                          data,
                          x,
                          y
                        ) => ({
                          background: `rgb(${
                            this.heatmapColor[heatMapState]
                          }, ${1 - (max - value) / (max - min)})`,
                          color: "#000"
                        })}

                        // cellRender={value => value && `${value}%`}
                      />
                    )}
                  </HeatMapOverlay>
                )}
              </InfoImageContainer>

              <InfoContentContainer>
                <ButtonWrapper>
                  <HeatmapButton
                    onClick={this.onClickHeatMapButton}
                    style={{
                      backgroundColor: this.buttonColor[heatMapState]
                    }}
                  >
                    {this.heatMapStateEnum[heatMapState]}
                  </HeatmapButton>
                </ButtonWrapper>
                <InfoContent>
                  {person_state_key.map(key => (
                    <InfoContentStuff>
                      {key}: {person_state[key]}
                    </InfoContentStuff>
                  ))}
                </InfoContent>
              </InfoContentContainer>
            </Infos>
          </Fade>
        )}
      </InfoWrapper>
    );
  }
}
export default LocationContent;
