import React, { Fragment } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    FlatList,
    Linking

} from "react-native";
import axios from 'axios';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions';
import SecureStorage from 'react-native-secure-storage';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import { timeForma24, formatMoney } from '../tools/Tools';
import { icons, COLORS, FONTS, SIZES, URL } from '../../constants';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            reload: false,
            message: 'Cargando información...',
            celular: '',
            informacion: '',
            empresaCelular: '',
            empresaMensaje: '',
            paginacion: 0,
            totalPaginacion: 0,
            filasPorPagina: 10,
            transacciones: [],
            monto: 0,
            refreshing: false,
            reached: false
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        await this.setStateAsync({ reached: false, paginacion: 1 })
        this.allTableInformation();
    }

    async onEventSignOut() {
        try {
            await SecureStorage.removeItem('user');
            this.props.restore();
        } catch (error) {
            this.props.restore();
        }
    }

    async allTableInformation() {
        try {
            await this.setStateAsync({
                isLoading: true,
                reload: false,
                message: 'Cargando información...'
            })

            const { idUsuario, celular, informacion } = JSON.parse(this.props.token.userToken);
            let result = await axios.get(URL.TRANSACCIONES, {
                params: {
                    "idUsuario": idUsuario,
                    "posicionPagina": (this.state.paginacion - 1) * this.state.filasPorPagina,
                    "filasPorPagina": this.state.filasPorPagina,
                }
            });

            let totalPaginacion = parseInt(
                Math.ceil(parseFloat(result.data.total) / this.state.filasPorPagina)
            );

            let newArray = this.state.reached ? [].concat(this.state.transacciones, result.data.result) : result.data.result;

            await this.setStateAsync({
                celular: celular,
                informacion: informacion,
                transacciones: newArray,
                totalPaginacion: totalPaginacion,
                monto: result.data.monto,
                empresaCelular: result.data.celular,
                empresaMensaje: result.data.mensaje,
                isLoading: false,
                reached: false,
            })
        } catch (error) {
            await this.setStateAsync({
                reload: true,
                message: 'Se produjo un error, intente nuevamente en un par de minutos.'
            })
        }
    }

    async handleOnEndReach() {
        if (this.state.paginacion >= this.state.totalPaginacion) return;

        await this.setStateAsync({ reached: true, paginacion: this.state.paginacion + 1 })
        this.allTableInformation();
    }


    async onRefresh() {
        await this.setStateAsync({ reached: false, paginacion: 1, refreshing: true, refreshing: false });
        this.allTableInformation();
    }

    async onEventReload() {
        await this.setStateAsync({ reached: false, paginacion: 1 })
        this.allTableInformation();
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f8e6f6' }}>
                    <StatusBar translucent barStyle={this.state.isLoading ? "dark-content" : "ligth-content"} backgroundColor="transparent" hidden={false} />
                    {
                        this.state.isLoading && !this.state.reached ?
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
                            ) :
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

                                        <TouchableOpacity onPress={() => this.onEventSignOut()}>
                                            <Feather name="log-out" color={"white"} size={40} />
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
                                            <TouchableOpacity
                                                style={{ backgroundColor: '#26158c', borderColor: '#ffffff', borderWidth: 2, borderRadius: 5, padding: 5 }}
                                                onPress={() => this.props.navigation.navigate('Perfil')}
                                            >
                                                <Feather name="user" color={"white"} size={30} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                    <View style={{ flex: 6, paddingHorizontal: 20, paddingTop: 30, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ ...FONTS.h2, color: '#2f4667' }}>Transacciones</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                <Text style={{ ...FONTS.body4, color: '#b9b9b9', marginHorizontal: 5 }}>Por</Text>
                                                <Text style={{ ...FONTS.body4, color: '#2f4667' }}>Fecha </Text>
                                                <Feather name="chevron-down" color={"#2f4667"} size={20} />
                                            </View>
                                        </View>

                                        <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ ...FONTS.h4, color: '#b9b9b9' }}>Monto Actual</Text>
                                            <Text style={{ ...FONTS.h4, color: '#2f4667' }}>S/ {formatMoney(this.state.monto)}</Text>
                                        </View>

                                        <FlatList
                                            refreshControl={
                                                <RefreshControl
                                                    refreshing={this.state.refreshing}
                                                    onRefresh={() => this.onRefresh()}
                                                />
                                            }
                                            data={this.state.transacciones}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) =>
                                                <View>
                                                    <View style={{
                                                        backgroundColor: "#f2f2fc",
                                                        borderRadius: 100,
                                                        // paddingHorizontal: 20,
                                                        // paddingVertical: 10,
                                                        marginBottom: 10,
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }}>
                                                        <View style={{ width: '60%', paddingHorizontal: 20, paddingVertical: 10, }}>
                                                            <Text style={{ ...FONTS.h5, color: '#2f4667' }}>{item.tipo == 1 ? "INGRESO" : "DESCUENTO"}</Text>
                                                            <View style={{ flexDirection: "column" }}>
                                                                {item.comentario !== "" ? <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>{item.comentario} </Text> : null}
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>{item.fecha} </Text>
                                                                    <Text style={{ ...FONTS.body5, color: '#b9b9b9' }}>{timeForma24(item.hora)}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: '40%', paddingHorizontal: 20, paddingVertical: 10, }}>
                                                            <Text style={{ ...FONTS.h3, textAlign: 'right', color: item.tipo == 1 ? '#00b26a' : '#df6574' }}>S/ {item.tipo == 1 ? "+" : "-"}{formatMoney(item.monto)}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            }
                                            ListFooterComponent={() =>
                                                this.state.isLoading && this.state.reached &&
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: SIZES.padding
                                                }}>
                                                    <ActivityIndicator size="small" color={COLORS.primary} />
                                                    <Text style={{
                                                        ...FONTS.h4,
                                                        color: COLORS.black,
                                                        textAlign: 'center',
                                                        marginBottom: 10
                                                    }}>
                                                        {"Cargando más transacciones..."}
                                                    </Text>
                                                </View>
                                            }
                                            onEndReached={() => this.handleOnEndReach()}
                                        />
                                        {this.state.empresaCelular !== "" ?
                                            <TouchableOpacity
                                                onPress={() => Linking.openURL(`whatsapp://send?phone=${this.state.empresaCelular}&text=${this.state.empresaMensaje}`)}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    backgroundColor: '#7377ff',
                                                    margin: 20,
                                                    right: 0,
                                                    padding: 10,
                                                    borderRadius: 100,
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 12,
                                                    },
                                                    shadowOpacity: 0.58,
                                                    shadowRadius: 16.00,

                                                    elevation: 24,
                                                    zIndex: 100
                                                }}>
                                                <Image
                                                    source={icons.whatsapp}
                                                    resizeMode='contain'
                                                    style={{ width: 40, height: 40 }} />
                                            </TouchableOpacity>
                                            : null
                                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);