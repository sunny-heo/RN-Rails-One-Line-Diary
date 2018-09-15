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
import { ListItem, ActionButton, Icon, Button } from "react-native-material-ui";
import { distanceInWordsToNow } from "date-fns";
import { withNavigation } from "react-navigation";
import { FlatList, Switch } from "react-native-gesture-handler";
import { friendRequestActions } from "../../../actions";
import { FriendTopNav } from "../../navigations";
import { IncomingRequestIndex, OutgoingRequestIndex } from "./";
import Tab from "./Tab";

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

const Presentation = ({ active }) => {
  switch (active) {
    case "Incoming":
      return <IncomingRequestIndex />;
    case "Outgoing":
      return <OutgoingRequestIndex />;
    default:
      return <Text>text</Text>;
  }
};

class FriendHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecthing: true,
      refreshing: false,
      active: "Incoming"
    };
  }

  async componentDidMount() {
    if (!this.props.friendRequest.fulfilledIndex) {
      await this.props.index();
    }
    this.setState({ fecthing: false });
  }

  // _onRefresh = () => {
  //   this.setState({ refreshing: true });
  //   this.props.index().then(() => {
  //     this.setState({ refreshing: false });
  //   });
  // };

  _onPressTabItem = active => {
    console.log(active);
    this.setState({ active });
  };

  render() {
    const { navigation } = this.props;
    const { active } = this.state;
    return (
      <View style={styles.root}>
        <Tab _onPressTabItem={this._onPressTabItem} />
        <View style={styles.listContainer}>
          {this.state.fecthing ? (
            <ActivityIndicator />
          ) : (
            <Presentation active={active} />
          )}
        </View>
        <ActionButton
          icon="person-add"
          onPress={() => {
            // console.log("pressed");
            navigation.navigate("FriendNew");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignContent: "space-between",
    backgroundColor: "rgb(255, 255,255)"
  },
  tabContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 3,
    paddingVertical: 6
  },
  tabWrapper: {
    flex: 1 / 3,
    marginHorizontal: 6
  },
  tab: { backgroundColor: "#fff" },
  listContainer: {
    flex: 1
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
)(withNavigation(FriendHome));
