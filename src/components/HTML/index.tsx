import React, { useCallback, useMemo } from "react";
import { Element, HTMLProps } from "../../utils/TagUtil/types";
import { TagUtil } from "../../utils/TagUtil";
import { Text } from "../Text";
import { Box } from "../Box";
import { BoxUnit } from "../Box/types";

export const HTML = ({ children }: HTMLProps): React.ReactElement => {
    const elements = useMemo<Array<Element | string>>(() => {
        return TagUtil.extractElements(children || "");
    }, [children]);

    const renderElements = useCallback((elements: Array<Element | string>, parent?: string) => {
        return elements.map((el, idx) => {
            if (typeof el === "string") {
                return (
                    <Text key={idx} typography={parent?.includes("h") ? "subtitle" : "body1"}>
                        {el}
                    </Text>
                );
            } else {
                return (
                    <Box orientation={"column"} margin={BoxUnit.HALF} stretch>
                        {renderElements(el.content, el.tag)}
                    </Box>
                );
            }
        });
    }, []);

    return (
        <Box orientation={"column"} stretch>
            {renderElements(elements)}
        </Box>
    );
};
