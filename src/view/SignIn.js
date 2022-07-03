import React, { Fragment, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { signIn } from '../redux/actions';
import messaging from '@react-native-firebase/messaging';
import SecureStorage from 'react-native-secure-storage';
import Feather from 'react-native-vector-icons/Feather';
import { images, COLORS, FONTS, SIZES, URL } from '../../constants';

const SignIn = (props) => {

    const [checked, setChecked] = useState(true);
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [loading, setLoading] = useState(false);

    const refUsuario = useRef();
    const refClave = useRef();

    const onEventSignIn = async () => {
        if (usuario === "") {
            refUsuario.current.focus();
        } else if (clave == "") {
            refClave.current.focus();
        } else {
            try {
                Keyboard.dismiss();
                setLoading(true);
                await messaging().registerDeviceForRemoteMessages();
                const token = await messaging().getToken();
                let result = await axios.get(URL.SIGN_IN, {
                    params: {
                        "usuario": usuario,
                        "clave": clave,
                        "tipo": 2,
                        "token": token
                    }
                });

                await SecureStorage.setItem('user', JSON.stringify(result.data));
                props.restore(JSON.stringify(result.data));
            } catch (error) {
                setLoading(false);
                if (error.response !== null || error.response !== undefined) {
                    Alert.alert("Un problema", error.response.data);
                } else {
                    Alert.alert("Un problema", "Se genero un error de cliente, intente nuevamente por favor.");
                }
            }
        }
    }

    return (
        <Fragment>
            <StatusBar translucent barStyle="ligth-content" backgroundColor="transparent" />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    keyboardShouldPersistTaps='handled'
                    style={styles.scrollView}>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 10 }}>
                        <View style={{ height: SIZES.height * 0.25, backgroundColor: 'white', paddingTop: StatusBar.currentHeight }}>
                            <View style={{
                                backgroundColor: '#66baff',
                                position: 'absolute',
                                borderRadius: 200,
                                top: -((SIZES.height * 0.30) / 2),
                                left: 0,
                                width: SIZES.height * 0.30,
                                height: SIZES.height * 0.30,
                                zIndex: 1
                            }} />
                            <View style={{
                                backgroundColor: '#7377ff',
                                position: 'absolute',
                                borderRadius: 200,
                                top: -((SIZES.height * 0.50) / 2),
                                right: -((SIZES.height * 0.50) / 2),
                                width: SIZES.height * 0.50,
                                height: SIZES.height * 0.50
                            }} />
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Image
                                resizeMode='contain'
                                source={images.logo}
                                style={{ width: 160, height: 150 }}
                            />
                        </View>

                        {
                            loading ?
                                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                    <Text style={{ ...FONTS.h4, color: '#2f4667' }}>Validando datos...</Text>
                                </View>
                                : null
                        }

                        <View style={{ paddingHorizontal: 20, marginBottom: 30, alignItems: 'center' }}>
                            <View style={{
                                width: '100%',
                                backgroundColor: "#f2f2fc",
                                borderRadius: 100,
                                paddingHorizontal: 25,
                                paddingVertical: 8,
                                marginBottom: 10,
                                flexDirection: "column",
                            }}>

                                <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>Email o Numero de Celular</Text>
                                <TextInput
                                    placeholder={"email@email.com o 963852741"}
                                    placeholderTextColor={COLORS.grayLight}
                                    autoCapitalize={"none"}
                                    selectionColor={"#3fa9ff"}
                                    style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                    ref={refUsuario}
                                    value={usuario}
                                    onChangeText={setUsuario}
                                    onSubmitEditing={() => { }}
                                />
                            </View>
                            <View style={{
                                width: '100%',
                                backgroundColor: "#f2f2fc",
                                borderRadius: 100,
                                paddingHorizontal: 25,
                                paddingVertical: 8,
                                marginBottom: 10,
                                flexDirection: "column",
                            }}>

                                <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>Contraseña</Text>
                                <TextInput
                                    placeholder={"******"}
                                    placeholderTextColor={COLORS.grayLight}
                                    secureTextEntry={true}
                                    autoCapitalize={"none"}
                                    selectionColor={"#3fa9ff"}
                                    style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                    ref={refClave}
                                    value={clave}
                                    onChangeText={setClave}
                                    onSubmitEditing={() => { }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{
                                    backgroundColor: '#3da9fd',
                                    padding: 1,
                                    marginHorizontal: 3
                                }}
                                    onPress={() => setChecked(!checked)}>
                                    <Feather
                                        name={checked ? "check" : "minus"}
                                        color="white"
                                        size={20} />
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'center', color: '#3fa9ff', marginHorizontal: 3 }}>Recordarme</Text>
                            </View>

                        </View>

                        <View style={{ paddingHorizontal: 20, flexDirection: 'column', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 20,
                                    paddingVertical: 15,
                                    marginVertical: 5,
                                    borderRadius: 50,
                                    backgroundColor: '#3fa9ff',
                                    justifyContent: 'center'
                                }}
                                onPress={onEventSignIn}>
                                <Feather
                                    name={"log-in"}
                                    color="white"
                                    size={20} />
                                <Text style={{ ...FONTS.p, color: COLORS.white, textAlign: 'center' }}> Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingHorizontal: 20, flexDirection: 'column', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 20,
                                    paddingVertical: 15,
                                    marginVertical: 5,
                                    borderRadius: 50,
                                    backgroundColor: 'white',
                                    borderColor: '#3fa9ff',
                                    borderWidth: 1,
                                    justifyContent: 'center'
                                }}
                                onPress={() => props.navigation.navigate('SignUp')}>
                                <Feather
                                    name={"user-plus"}
                                    color="#3fa9ff"
                                    size={20} />
                                <Text style={{
                                    ...FONTS.p,
                                    color: '#3fa9ff',
                                    textAlign: 'center'
                                }}> Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "white",
    },
});

const mapStateToProps = (state) => {
    return {
        token: state.reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        restore: (persona) => dispatch(signIn(persona))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
