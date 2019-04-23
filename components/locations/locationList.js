import React from "react";
import styled from "styled-components";
import LocationItem from "./locationItem";
import Fade from "react-reveal/Fade";

const LocationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 100vh;
`;

class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      loaded: false,
      dynamoClient: props.dynamoClient,
      selected_location: null
    };
  }
  componentDidMount() {
    var params = {
      TableName: "mitipa-database",
      Item: {
        clientId: "year"
      }
    };
    this.state.dynamoClient.scan(params, this.onScan);
  }

  onScan = (err, data) => {
    if (err) {
      console.error(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      this.setState(
        {
          locations: data.Items
        },
        () => {
          this.setState({ loaded: true });
          console.log("LOCATIONS: ", this.state.locations);
        }
      );
    }
  };

  onLocationSelected = index => {
    const { locations } = this.state;
    this.setState(
      {
        selected_location: index
      },
      this.props.onLocationSelected(locations[index])
    );
  };

  render() {
    const { locations, loaded, selected_location } = this.state;
    return (
      <LocationsContainer>
        {loaded == false
          ? null
          : locations.map((location, index) => (
              <Fade>
                <LocationItem
                  location={location}
                  index={index}
                  onLocationSelected={this.onLocationSelected}
                  isSelected={selected_location == index}
                  key={"location-" + index}
                />
              </Fade>
            ))}
      </LocationsContainer>
    );
  }
}

export default LocationList;
