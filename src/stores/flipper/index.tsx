/* eslint-disable @typescript-eslint/no-explicit-any */

import { autorun } from "mobx";
import React, { useContext, useEffect } from "react";
import { StoreContextValue } from "../Provider/types";
import { StoreKey } from "../types";
import { FlipperContext } from "../../utils/FlipperProviderUtil";

export const StoreFlipper: React.FC<{ storeContext: StoreContextValue }> = ({ storeContext, children }) => {
    const connection = useContext(FlipperContext);

    useEffect(() => {
        if (connection) {
            connection.receive("store-clear", async (params, responder) => {
                const keys = params.keys as StoreKey[];
                await storeContext.clear(...keys);
                responder.success();
            });

            connection.receive("store-update-value", (params, responder) => {
                const storeKey = params.storeKey as StoreKey;
                const path = params.path as string[];
                const value = params.value as any;

                let spot: any = storeContext.stores[storeKey];
                let pathLeft = path;

                while (spot && pathLeft.length > 1) {
                    spot = spot[pathLeft[0]];
                    pathLeft = pathLeft.slice(1);
                }

                if (spot && pathLeft.length === 1) {
                    spot[pathLeft[0]] = value;
                }

                responder.success();
            });
            const _sendStores = (): void => {
                for (const store of Object.values(storeContext.stores)) {
                    connection.send("store-update", store);
                }
            };
            connection.receive("store-initial-update", _sendStores);
            return autorun(_sendStores);
        }
    }, [storeContext, connection]);

    return <>{children}</>;
};
