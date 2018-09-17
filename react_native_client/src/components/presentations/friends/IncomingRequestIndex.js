import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  View,
  Text,
  Alert,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { ListItem, ActionButton, Icon } from "react-native-material-ui";
import { distanceInWordsToNow } from "date-fns";
import { withNavigation } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import { friendRequestActions } from "../../../actions";
import { IncomingReqSwipeable } from "../../gestures";

const mapStateToProps = (state, nextOwnProps) => state;
const mapDispatchToProps = dispatch => {
  return {
    confirmReq: async reqId => {
      try {
        await dispatch(friendRequestActions.update(reqId));
      } catch (error) {
        console.log(error);
      }
    },
    declineReq: async reqId => {
      try {
        await dispatch(friendRequestActions.destroy(reqId));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

const Row = ({ incomingReq, navigation }) => (
  <ListItem
    divider
    rightElement={
      <Text style={styles.rightElementText}>
        {`${distanceInWordsToNow(incomingReq.created_at)} ago`}
      </Text>
    }
    centerElement={{
      primaryText: `${incomingReq.request_sender.first_name} ${
        incomingReq.request_sender.last_name
      }`,
      secondaryText: incomingReq.request_sender.email
    }}
    onPress={() => {
      navigation.navigate("FriendProfile");
    }}
  />
);

class IncomingRequestIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fecthing: true,
      refreshing: false
    };
  }

  // _onRefresh = () => {
  //   this.setState({ refreshing: true });
  //   this.props.index().then(() => {
  //     this.setState({ refreshing: false });
  //   });
  // };

  render() {
    const { friendRequest, navigation, confirmReq, declineReq } = this.props;
    return (
      <View style={styles.root}>
        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh}
          //   />
          // }
          data={friendRequest.incomingReqs}
          renderItem={({ item: incomingReq }) => {
            return (
              <IncomingReqSwipeable
                incomingReq={incomingReq}
                navigation={navigation}
                confirmReq={confirmReq}
                declineReq={declineReq}
              >
                <Row incomingReq={incomingReq} navigation={navigation} />
              </IncomingReqSwipeable>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(255, 255,255)"
  },
  rightElementText: {
    marginRight: 16,
    height: 55,
    color: "rgb(117, 117, 117)"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(IncomingRequestIndex));
