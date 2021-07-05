/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */

/**
 * HOC component used to apply a delay before the
 * wrapped component starts being rendered. Useful
 * to get smoothly navigations.
 * */

import React, {useLayoutEffect, useState} from "react";
import Box from "../components/Box";
import {ActivityIndicator} from "react-native-paper";

export const delayedRender = (Comp: any, disableLoading = false) => {
    return ((props) => {
        const [mayRender, setMayRender] = useState(false);
        const [mayShow, setMayShow] = useState(false);

        useLayoutEffect(() => {
            setTimeout(() => {
                setMayRender(true);

                if (!disableLoading) {
                    setTimeout(() => {
                        setMayShow(true);
                    }, 200);
                }
            }, 200);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <>
                {mayRender ? <Comp {...props} /> : null}
                {!disableLoading && !mayShow &&
                    <Box fitAbsolute primary centralize>
                        <ActivityIndicator color={"#673AB7"}/>
                    </Box>
                }
            </>
        );
    }) as React.FC;
};
