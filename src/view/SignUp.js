import React, { Fragment } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import { images, COLORS, FONTS, SIZES, URL } from '../../constants';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documento: '',
            informacion: '',
            celular: '',
            email: '',
            clave: '',
            isLoading: false,
        }

        this.refDocumento = React.createRef();
        this.refInformacion = React.createRef();
        this.refCelular = React.createRef();
        this.refEmail = React.createRef();
        this.refClave = React.createRef();
    }

    onEventPress = async () => {

        if (this.state.isLoading) return;

        if (this.state.documento == "") {
            this.refDocumento.current.focus();
        } else if (this.state.informacion == "") {
            this.refInformacion.current.focus();
        } else if (this.state.celular == "") {
            this.refCelular.current.focus();
        } else if (this.state.clave == "") {
            this.refClave.current.focus();
        } else {
            try {
                Keyboard.dismiss();
                this.setState({ isLoading: true });

                let result = await axios.post(URL.SIGN_UP, {
                    "documento": this.state.documento.trim(),
                    "informacion": this.state.informacion.trim().toUpperCase(),
                    "celular": this.state.celular.trim(),
                    "email": this.state.email.trim(),
                    "clave": this.state.clave.trim(),
                    "token": "",
                    "tipo": 2,
                    "estado": 1
                });
                this.setState({ isLoading: false })
                Alert.alert("Bien!!", result.data, [
                    {
                        onPress: () => { this.props.navigation.navigate('SignIn') }
                    }
                ]);
            } catch (error) {
                this.setState({ isLoading: false })
                if (error.response !== null || error.response !== undefined) {
                    Alert.alert("Un problema", error.response.data);
                } else {
                    Alert.alert("Un problema", "Se genero un error de cliente, intente nuevamente por favor.");
                }
            }
        }
    }

    render() {
        return (
            <Fragment>
                <StatusBar translucent barStyle="ligth-content" backgroundColor="transparent" />
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView
                        // contentInsetAdjustmentBehavior="automatic"
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
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    resizeMode='contain'
                                    source={images.logo}
                                    style={{ width: 160, height: 150 }}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 20, marginBottom: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={{ ...FONTS.h2, color: '#2f4667' }}>Ingrese sus Datos</Text>
                                </View>

                                {
                                    this.state.isLoading ?
                                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                            <ActivityIndicator size="large" color={COLORS.primary} />
                                            <Text style={{ ...FONTS.h4, color: '#2f4667' }}>Validando datos...</Text>
                                        </View>
                                        : null
                                }

                                <View style={{
                                    backgroundColor: "#f2f2fc",
                                    borderRadius: 100,
                                    paddingHorizontal: 25,
                                    paddingVertical: 8,
                                    marginBottom: 10,
                                    flexDirection: "column",
                                    width: "100%",
                                }}>

                                    <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>N° de Documento</Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder={"56565656"}
                                        placeholderTextColor={COLORS.grayLight}
                                        autoCapitalize={"none"}
                                        selectionColor={"#3fa9ff"}
                                        style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                        value={this.state.documento}
                                        onChangeText={(text) => this.setState({ documento: text })}
                                        ref={this.refDocumento}
                                        onSubmitEditing={() => this.onEventPress()}
                                    />
                                </View>

                                <View style={{
                                    backgroundColor: "#f2f2fc",
                                    borderRadius: 100,
                                    paddingHorizontal: 25,
                                    paddingVertical: 8,
                                    marginBottom: 10,
                                    flexDirection: "column",
                                    width: "100%",
                                }}>

                                    <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>Apellidos y Nombres</Text>
                                    <TextInput
                                        placeholder={"Mis Apellidos y Nombres"}
                                        placeholderTextColor={COLORS.grayLight}
                                        autoCapitalize={"none"}
                                        selectionColor={"#3fa9ff"}
                                        style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                        value={this.state.informacion}
                                        onChangeText={(text) => this.setState({ informacion: text })}
                                        ref={this.refInformacion}
                                        onSubmitEditing={() => this.onEventPress()}
                                    />
                                </View>

                                <View style={{
                                    backgroundColor: "#f2f2fc",
                                    borderRadius: 100,
                                    paddingHorizontal: 25,
                                    paddingVertical: 8,
                                    marginBottom: 10,
                                    flexDirection: "column",
                                    width: "100%",
                                }}>

                                    <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>N° de Celular</Text>
                                    <TextInput
                                        placeholder={"+51 966750883"}
                                        keyboardType='numeric'
                                        placeholderTextColor={COLORS.grayLight}
                                        autoCapitalize={"none"}
                                        selectionColor={"#3fa9ff"}
                                        style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                        value={this.state.celular}
                                        onChangeText={(text) => this.setState({ celular: text })}
                                        ref={this.refCelular}
                                        onSubmitEditing={() => this.onEventPress()}
                                    />
                                </View>

                                <View style={{
                                    backgroundColor: "#f2f2fc",
                                    borderRadius: 100,
                                    paddingHorizontal: 25,
                                    paddingVertical: 8,
                                    marginBottom: 10,
                                    flexDirection: "column",
                                    width: "100%",
                                }}>

                                    <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>Email</Text>
                                    <TextInput
                                        placeholder={"ejemplo@company.com"}
                                        placeholderTextColor={COLORS.grayLight}
                                        autoCapitalize={"none"}
                                        selectionColor={"#3fa9ff"}
                                        style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({ email: text })}
                                        ref={this.refEmail}
                                        onSubmitEditing={() => this.onEventPress()}
                                    />
                                </View>

                                <View style={{
                                    backgroundColor: "#f2f2fc",
                                    borderRadius: 100,
                                    paddingHorizontal: 25,
                                    paddingVertical: 8,
                                    marginBottom: 10,
                                    flexDirection: "column",
                                    width: "100%",
                                }}>

                                    <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>Contraseña</Text>
                                    <TextInput
                                        placeholder={"******"}
                                        placeholderTextColor={COLORS.grayLight}
                                        autoCapitalize={"none"}
                                        selectionColor={"#3fa9ff"}
                                        style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                        value={this.state.clave}
                                        onChangeText={(text) => this.setState({ clave: text })}
                                        ref={this.refClave}
                                        onSubmitEditing={() => this.onEventPress()}
                                    />
                                </View>
                            </View>

                            <View style={{ paddingHorizontal: 20 }}>
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
                                    onPress={() => this.onEventPress()}>
                                    <Feather
                                        name={"save"}
                                        color="white"
                                        size={20} />
                                    <Text style={{ ...FONTS.p, color: COLORS.white }}> Registrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment >
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "white",
    },
});

export default SignUp;
