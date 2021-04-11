import React, { useCallback, useImperativeHandle, useState } from "react";
import { Box } from "../Box";
import { ScheduleDayModalRef } from "./types";
import { Text } from "../Text";
import { BoxUnit } from "../Box/types";
import * as S from "./styles";
import { Image, Modal, useWindowDimensions } from "react-native";
import { Sport } from "../../@types";
import { useTheme } from "../../Theme";
import { BaseButton } from "../BaseButton";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { HTML } from "../HTML";

export const ScheduleDayModal = React.forwardRef<ScheduleDayModalRef>((props, ref) => {
    const [sport, setSport] = useState<Sport | null>(null);

    const theme = useTheme();
    const windowSize = useWindowDimensions();

    const blur = useCallback(() => {
        setSport(null);
    }, []);

    useImperativeHandle(ref, () => ({
        focus(sport) {
            setSport(sport);
        },
        blur() {
            blur();
        },
    }));

    return (
        <Modal visible={!!sport} transparent animationType={"fade"} onRequestClose={blur}>
            {!!sport && (
                <S.ModalScrollWrapper
                    style={{ width: windowSize.width, height: windowSize.height }}
                    backgroundColor={"backgroundLight"}>
                    <S.ModalScroll stickyHeaderIndices={[0]}>
                        <Box
                            elevated
                            contentAlignment={"left-center"}
                            padding={BoxUnit.HALF}
                            backgroundColor={"backgroundLight"}
                            grow>
                            <Box padding={BoxUnit.HALF} fit>
                                <Text typography={"title"} value={sport.title} numberOfLines={1} />
                            </Box>

                            <BaseButton padding={BoxUnit.HALF} onPress={blur} paper>
                                <Icon name={"close"} size={24} />
                            </BaseButton>
                        </Box>

                        {sport.about.image.url && (
                            <Box backgroundColor={"backgroundLightGrey"}>
                                <Image
                                    source={{ uri: sport.about.image.url }}
                                    style={{ width: windowSize.width, height: (windowSize.width * 9) / 16 }}
                                />
                            </Box>
                        )}

                        <Box fit orientation={"column"} backgroundColor={theme.palette.backgroundLight} stretch>
                            {!!sport.about &&
                                sport.about.texts.map((text, index) => (
                                    <Box key={index} orientation={"column"} stretch>
                                        <HTML>{text}</HTML>
                                    </Box>
                                ))}
                        </Box>
                    </S.ModalScroll>
                </S.ModalScrollWrapper>
            )}
        </Modal>
    );
});
