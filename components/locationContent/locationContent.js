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
  flex-direction: row;
  font-size: 1.2vw;
  justify-content: center;
  align-content: center;
`;
const InfoContentStuff = styled.div`
    display: flex;
    justify-content:center;
    align-content:center; 
    text-align: center;
    padding: 20px;  
    top: 50%;
`;
const HeatmapButton = styled.button`
  background-color: #f4511e;
  border: none;
  color: white;
  //   padding: 0.5vw 1vw;
  text-align: center;
  font-size: 1.2vw;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

class LocationContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocationInfo: props.selectedLocationInfo,
      s3Client: props.s3Client,
      s3URL: "https://s3-ap-northeast-1.amazonaws.com/mitipa-images/",
      loaded: false
    };
  }

  componentDidMount() {}
  render() {
    const { s3URL } = this.state;
    const { selectedLocationInfo } = this.props;
    console.log("selectedLocationInfo: ", selectedLocationInfo);
    /////////////////////////
    const xLabels = new Array(10).fill(0).map((_, i) => `${i}`);

    // Display only even labels
    const xLabelsVisibility = new Array(10)
      .fill(0)
      .map((_, i) => (i % 2 === 0 ? true : false));

    const yLabels = new Array(5).fill(0).map((_, i) => `${i}`);
    const data = new Array(yLabels.length)
      .fill(0)
      .map(() =>
        new Array(xLabels.length)
          .fill(0)
          .map(() => Math.floor(Math.random() * 100))
      );
    //////////////////

    return (
      <InfoWrapper className="infowrapper">
        {selectedLocationInfo == null ? null : (
          <Fade spy={selectedLocationInfo}>
            <Infos className="infos">
              <InfoHeader>{selectedLocationInfo.location}</InfoHeader>
              <InfoImageContainer>
                <InfoImage src={s3URL + selectedLocationInfo.image} />
                <HeatMapOverlay>
                  <HeatMap
                    xLabels={xLabels}
                    yLabels={yLabels}
                    data={data}
                    height={50}
                    squares
                    //   xLabelWidth={200}
                    //   yLabelWidth={200}
                    cellStyle={(background, value, min, max, data, x, y) => ({
                      background: `rgb(0, 151, 230, ${1 -
                        (max - value) / (max - min)})`,
                      color: "#000"
                    })}

                    // cellRender={value => value && `${value}%`}
                  />
                </HeatMapOverlay>
              </InfoImageContainer>
              <InfoContent>
                <HeatmapButton>Existence Heatmap</HeatmapButton>
                <InfoContentStuff>
                  score: {selectedLocationInfo.score}
                </InfoContentStuff>
              </InfoContent>
            </Infos>
          </Fade>
        )}
      </InfoWrapper>
    );
  }
}

export default LocationContent;
