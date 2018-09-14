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
      primaryText: `${item.user.first_name} ${item.user.last_name}`,
      secondaryText: item.user.email
    }}
    onPress={() => {
      navigation.navigate("TodayDiary");
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

  // async componentDidMount() {
  //   if (!this.props.friendRequest.fulfilledIndex) {
  //     await this.props.index();
  //   }
  //   this.setState({ fecthing: false });
  // }

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
          data={friendRequest.data.incoming_requests}
          renderItem={({ item }) => {
            return <Row item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
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
