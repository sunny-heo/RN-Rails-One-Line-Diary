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

const mapStateToProps = (state, nextOwnProps) => state;
const mapDispatchToProps = dispatch => {
  return {
    index: async () => {
      try {
        await dispatch(friendRequestActions.index());
      } catch (error) {
        console.log(error);
      }
    }
  };
};

const Row = ({ item, navigation }) => (
  <ListItem
    divider
    rightElement={
      <Text style={styles.rightElementText}>
        {`${distanceInWordsToNow(item.created_at)} ago`}
      </Text>
    }
    centerElement={{
      primaryText: `${item.request_receiver.first_name} ${
        item.request_receiver.last_name
      }`,
      secondaryText: item.request_receiver.email
    }}
    onPress={() => {
      navigation.navigate("FriendProfile");
    }}
  />
);

class OutgoingRequestIndex extends Component {
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
    const { friendRequest, navigation, dispatch } = this.props;
    console.log(friendRequest.data);

    return (
      <View style={styles.root}>
        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh}
          //   />
          // }
          data={friendRequest.outgoingReqs}
          renderItem={({ item }) => {
            return <Row item={item} navigation={navigation} />;
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
)(withNavigation(OutgoingRequestIndex));
