// pages/index.js
import React from "react";
import Default from "../layouts/default";
import axios from "axios";
import styled from "styled-components";
import PageHeader from "../components/pageHeader";
import LocationList from "../components/locations/locationList";
import LocationContent from "../components/locationContent/locationContent";
const meta = { title: "Index title", description: "Index description" };
import AWS from "aws-sdk";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faCircle, faBookReader } from "@fortawesome/free-solid-svg-icons";
const secret = require("../secret");

library.add(faCircle, faBookReader);

AWS.config.update({
  ...secret
});

const AllContent = styled.div`
  display: grid;
  height: 100vh;
  width: 100%;
  grid-template-rows: 30% 70%;
  grid-template-areas:
    "header"
    "content";
`;
const FinalPageHeader = styled(PageHeader)`
  grid-area: header;
`;
const PageContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  grid-template-areas: "list info";
  grid-area: content;
`;
const PageList = styled.div`
  grid-area: list;
`;

const PageInfo = styled.div`
  grid-area: info;
  height: inherit;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dyanmoClient: null,
      s3Client: null,
      selectedLocationInfo: null
    };
  }
  componentDidMount = () => {
    this.setState({
      dynamoClient: new AWS.DynamoDB.DocumentClient(),
      s3Cient: new AWS.S3()
    });
  };

  onLocationSelected = location => {
    this.setState({ selectedLocationInfo: location });
  };

  render() {
    var { dynamoClient, s3Cient, selectedLocationInfo } = this.state;
    return (
      <AllContent>
        <FinalPageHeader />
        {dynamoClient == null ? null : (
          <PageContent>
            <PageList>
              <LocationList
                dynamoClient={dynamoClient}
                s3Cient={s3Cient}
                onLocationSelected={this.onLocationSelected}
              />
            </PageList>
            <PageInfo>
              <LocationContent
                selectedLocationInfo={selectedLocationInfo}
                s3Cient={s3Cient}
              />
            </PageInfo>
          </PageContent>
        )}
      </AllContent>
    );
  }
}

export default HomePage;
