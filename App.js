import React from 'react';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { restoreToken } from './src/redux/actions';
import { sleep } from './src/tools/Tools';
import { SplashScreen, SignIn, SignUp, Home, Perfil } from './src';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsubscribe: null,
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidMount() {
    console.log("app")
    try {
      await sleep(3000);
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        if (this.props.token.userToken !== null) {
          this.onDisplayNotification(remoteMessage);
        }
      });
      await this.setStateAsync({ unsubscribe: unsubscribe });

      let userToken = await AsyncStorage.getItem('user');
      this.props.restore(userToken);
    } catch (e) {
      this.props.restore(null);
    }
  }

  onDisplayNotification = async (remoteMessage) => {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default channels',
    });

    // Display a notification   
    await notifee.displayNotification({
      title: remoteMessage.data.title,
      subtitle: remoteMessage.data.subtitle,
      body: remoteMessage.data.body,
      android: {
        channelId: channelId
      }
    });
  }

  componentWillUnmount() {
    console.log("end")
    if (this.state.unsubscribe != null) {
      this.state.unsubscribe();
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {
            this.props.token.isLoading ? (
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
            ) : this.props.token.userToken == null ? (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Perfil"
                  component={Perfil}
                  options={{ headerShown: false }}
                />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.reducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    restore: (persona) => dispatch(restoreToken(persona))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
