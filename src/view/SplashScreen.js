import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    View,
    Image
} from 'react-native';
import { images, FONTS, SIZES } from '../../constants';

class SplashScreen extends React.Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f8e6f6', justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View
                    style={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}>
                    <View>
                        <Image
                            resizeMode='contain'
                            source={images.logo}
                            style={{ width: 180, height: 160 }}
                        />
                    </View>
                    <View>
                        <Text style={{ ...FONTS.text_splash, padding: SIZES.base }}>Cargando....</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 0, padding: SIZES.padding }}>
                    <Text style={{ ...FONTS.text_splash }}>{"Copyright ©"} {new Date().getFullYear()} {"Todos los derechos reservados"}</Text>
                </View>
            </SafeAreaView>
        );
    }

}

export default SplashScreen;