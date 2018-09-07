# One-Line-Diary-RN-Rails

React-Native app with Rails backend to help people write post-dated diary (one line a day) that will be shared with their friends, children or partner on the predetermined future date.

## Getting Started

Open your terminal or shell and clone this repository

```
git clone git@github.com:sunny-heo/RN-Rails-One-Line-Diary.git
```

### Prerequisites

If you have not installed React Native, please follow the setup instructions on
[this link](https://facebook.github.io/react-native/docs/getting-started). (Building Projects with Native Code)

### Setup Rails

Run the following commands below in this project's Terminal to setup database and start RestAPI server,

```
$ cd rails-backend
$ bundle
$ rails db:create db:migrate db:seed
$ rails s
```

### Setup React Native

After opening new Terminal, run the following commands below to start react-native development server to bundle packages.

```
$ cd react_native_client
$ npm install or yarn install
$ react-native link react-native-vector-icons
$ react-native link react-native-gesture-handler
$ react-native start
```

### Run iOS application

Assuming that you have Xcode installed, run the following commands below in new Terminal to start app on iOS device.

```
$ react-native run-ios
```

### Run android application

Assuming that you have Android Studio installed, run the following commands below in new Terminal to start app on android device.

```
$ react-native run-android
```
