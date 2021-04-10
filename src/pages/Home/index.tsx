/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box } from "../../components/Box";
import { ScheduleDays } from "../../components/ScheduleDays";

export const Home: React.FC = () => {
    return (
        <Box fit orientation={"column"} backgroundColor={"backgroundLightGrey"} stretch>
            <ScheduleDays />
        </Box>
    );
};
