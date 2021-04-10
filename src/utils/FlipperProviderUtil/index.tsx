/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { addPlugin, Flipper } from "react-native-flipper";

export const FlipperContext = React.createContext<Flipper.FlipperConnection | null>(null);

export const FlipperProvider: React.FC = ({ children }) => {
    const [connection, setConnection] = useState<Flipper.FlipperConnection | null>(null);

    useEffect(() => {
        if (__DEV__) {
            addPlugin({
                getId(): string {
                    return "hc";
                },
                onConnect(connection: Flipper.FlipperConnection) {
                    setConnection(connection);
                },
                onDisconnect() {
                    setConnection(null);
                },
                runInBackground(): boolean {
                    return false;
                },
            });
        }
    }, []);

    return <FlipperContext.Provider value={connection}>{children}</FlipperContext.Provider>;
};
