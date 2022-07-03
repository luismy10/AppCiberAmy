import React, { Fragment } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from "react-native";
import axios from 'axios';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES, URL } from '../../constants';

class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            reload: false,
            message: 'Cargando información...',
            documento: '123123213',
            celular: '',
            informacion: '',
            email: ''

        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        this.allTableInformation();
    }

    async onEventReload() {
        this.allTableInformation();
    }

    async allTableInformation() {
        await this.setStateAsync({
            isLoading: true,
            reload: false,
            message: 'Cargando información...'
        })

        const { idUsuario, celular, informacion } = JSON.parse(this.props.token.userToken);
        try {
            let result = await axios.get(URL.USUARIO, {
                params: {
                    idUsuario: idUsuario
                }
            });
            let cliente = result.data;
            this.setState({
                documento: cliente.documento.toString(),
                celular: celular,
                informacion: informacion,
                email: cliente.email,
                isLoading: false
            });

        } catch (error) {
            await this.setStateAsync({
                reload: true,
                message: 'Se produjo un error, intente nuevamente en un par de minutos.'
            });
        }
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f8e6f6' }}>
                    <StatusBar translucent barStyle={this.state.isLoading ? "dark-content" : "ligth-content"} backgroundColor="transparent" hidden={false} />
                    {
                        this.state.isLoading ?
                            (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: SIZES.padding }}>
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                    <Text style={{ ...FONTS.h3, color: COLORS.black, textAlign: 'center', marginBottom: 10 }}>{this.state.message}</Text>
                                    {
                                        this.state.reload ?
                                            (
                                                <TouchableOpacity onPress={() => this.onEventReload()}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 20,
                                                        paddingVertical: 15,
                                                        marginVertical: 5,
                                                        borderRadius: 50,
                                                        backgroundColor: '#3fa9ff',
                                                        justifyContent: 'center'
                                                    }}>
                                                    <EvilIcons
                                                        name={"pointer"}
                                                        color="white"
                                                        size={30}
                                                    />
                                                    <Text style={{ ...FONTS.p, color: COLORS.white, textAlign: 'center' }}>Actualizar Vista</Text>
                                                </TouchableOpacity>
                                            ) :
                                            (
                                                <></>
                                            )
                                    }
                                </View>
                            )
                            :
                            (
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#898cff', '#7377ff']}
                                    style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 20 }}>
                                        <Feather style={{ position: 'absolute', zIndex: 0, opacity: 0.1, alignSelf: 'center', left: '0%' }} name="twitch" color={"white"} size={30} />
                                        <Feather style={{ position: 'absolute', zIndex: 0, opacity: 0.1, alignSelf: 'center', left: '20%' }} name="twitter" color={"white"} size={30} />
                                        <Feather style={{ position: 'absolute', zIndex: 0, opacity: 0.1, alignSelf: 'center', left: '40%' }} name="facebook" color={"white"} size={30} />
                                        <Feather style={{ position: 'absolute', zIndex: 0, opacity: 0.1, alignSelf: 'center', left: '60%' }} name="youtube" color={"white"} size={30} />
                                        <Feather style={{ position: 'absolute', zIndex: 0, opacity: 0.1, alignSelf: 'center', left: '80%' }} name="wifi" color={"white"} size={30} />
                                        <Feather style={{ position: 'absolute', zIndex: 0, opacity: 0.1, alignSelf: 'center', left: '100%' }} name="package" color={"white"} size={30} />

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                            <Feather name="chevron-left" color={"white"} size={40} />
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ marginHorizontal: 10 }}>
                                                <Text style={{ ...FONTS.body1, color: COLORS.white }}>ZONA VIP</Text>
                                                <Text style={{ ...FONTS.body6, color: COLORS.white }}>{this.state.informacion}</Text>
                                                <LinearGradient
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    colors={['#e1afdb', '#cb82c3']}
                                                    style={{ borderRadius: 50, paddingHorizontal: 10, paddingVertical: 2 }}>
                                                    <Text style={{ ...FONTS.body6, color: COLORS.white }}>CLIENTE GAMER</Text>
                                                </LinearGradient>
                                            </View>
                                            <View style={{ backgroundColor: '#26158c', borderColor: '#ffffff', borderWidth: 2, borderRadius: 5, padding: 5 }}>
                                                <Feather name="user" color={"white"} size={30} />
                                            </View>
                                        </View>
                                    </View>


                                    <View style={{ flex: 6, paddingHorizontal: 20, paddingTop: 30, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ ...FONTS.h2, color: '#2f4667' }}>Perfil</Text>
                                        </View>
                                        <ScrollView
                                            contentInsetAdjustmentBehavior="automatic"
                                            keyboardShouldPersistTaps='handled'
                                            style={{ backgroundColor: "white", }}>

                                            <View style={{
                                                backgroundColor: "#f2f2fc",
                                                borderRadius: 100,
                                                paddingHorizontal: 25,
                                                paddingVertical: 8,
                                                marginBottom: 10,
                                                flexDirection: "column",
                                            }}>

                                                <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>N° de Documento</Text>
                                                <TextInput
                                                    editable={false}
                                                    autoFocus={false}
                                                    placeholder={"76423388"}
                                                    placeholderTextColor={COLORS.grayLight}
                                                    autoCapitalize={"none"}
                                                    selectionColor={"#3fa9ff"}
                                                    style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                                    value={this.state.documento}
                                                />
                                            </View>

                                            <View style={{
                                                backgroundColor: "#f2f2fc",
                                                borderRadius: 100,
                                                paddingHorizontal: 25,
                                                paddingVertical: 8,
                                                marginBottom: 10,
                                                flexDirection: "column",
                                            }}>

                                                <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>Apellidos y Nombres</Text>
                                                <TextInput
                                                    editable={false}
                                                    placeholder={"Mi Apellido y Nombre"}
                                                    placeholderTextColor={COLORS.grayLight}
                                                    autoCapitalize={"none"}
                                                    selectionColor={"#3fa9ff"}
                                                    style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                                    value={this.state.informacion}
                                                />

                                            </View>

                                            <View style={{
                                                backgroundColor: "#f2f2fc",
                                                borderRadius: 100,
                                                paddingHorizontal: 25,
                                                paddingVertical: 8,
                                                marginBottom: 10,
                                                flexDirection: "column",
                                            }}>

                                                <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>N° de Celular</Text>
                                                <TextInput
                                                    placeholder={"+51 966750883"}
                                                    placeholderTextColor={COLORS.grayLight}
                                                    autoCapitalize={"none"}
                                                    selectionColor={"#3fa9ff"}
                                                    style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                                    value={this.state.celular}
                                                />

                                            </View>

                                            <View style={{
                                                backgroundColor: "#f2f2fc",
                                                borderRadius: 100,
                                                paddingHorizontal: 25,
                                                paddingVertical: 8,
                                                marginBottom: 10,
                                                flexDirection: "column",
                                            }}>

                                                <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>Email</Text>
                                                <TextInput
                                                    placeholder={"ejemplo@company.com"}
                                                    placeholderTextColor={COLORS.grayLight}
                                                    autoCapitalize={"none"}
                                                    selectionColor={"#3fa9ff"}
                                                    style={{ ...FONTS.h4, width: '100%', backgroundColor: 'transparent', color: '#2f4667', padding: 0 }}
                                                    value={this.state.email}
                                                />

                                            </View>

                                        </ScrollView>
                                    </View>
                                </LinearGradient>
                            )
                    }

                </SafeAreaView>
            </Fragment >
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
        restore: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);