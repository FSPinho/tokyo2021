import database from '@react-native-firebase/database';

export const DEF_CONFIG = {
    ads: {
        banner: false,
        popup: false,
    },
};

export default {
    doAddRemoteConfigListener: (listener) => {
        listener.onConfigChange(DEF_CONFIG);

        const ref = database().ref('/config');
        ref.on('value', snapshot => {
            const config = snapshot.val();
            console.log('---', config);
            if (
                config &&
                config.ads &&
                typeof config.ads.banner === 'boolean' &&
                typeof config.ads.popup === 'boolean'
            ) {
                listener.onConfigChange(config);
            } else {
                console.log(
                    ' --- INVALID CONFIG:',
                    config,
                    config.ads,
                    typeof config.ads.banner,
                    typeof config.ads.popup,
                );
            }
        });
    },
};
