import * as S from "./styles";
import React, { useCallback, useMemo } from "react";
import { HeaderProps } from "./types";
import { Text } from "../Text";
import { BoxUnit } from "../Box/types";
import { Box } from "../Box";
import { BaseButton } from "../BaseButton";
import { useLocale } from "../../i18n";
import Languages from "../../constants/Languages.json";
import { observer } from "mobx-react";
import { ImageRequireSource } from "react-native";

const FLAGS = {
    EN: require("../../assets/flags/us.png"),
    ES: require("../../assets/flags/es.png"),
} as Record<string, ImageRequireSource>;

export const Header: React.FC<HeaderProps> = observer(({ title, ...props }) => {
    const { locale, setLocale } = useLocale();

    const lang = useMemo(() => locale.split("-")[0].toUpperCase(), [locale]);

    const toggleLang = useCallback(() => {
        const index = Languages.indexOf(locale);
        const next = Languages[(index + 1) % Languages.length];

        console.log(`Setting locale: ${locale} => ${next}`);

        setLocale(next);
    }, [locale, setLocale]);

    return (
        <S.Header paddingLeft={BoxUnit.HALF} paddingRight={BoxUnit.HALF} contentAlignment={"left-center"} {...props}>
            <Box fit paddingLeft={BoxUnit.HALF} paddingRight={BoxUnit.HALF}>
                <Text typography={"title"} value={title} />
            </Box>

            <BaseButton padding={BoxUnit.HALF} contentAlignment={"center"} onPress={toggleLang} circle>
                <Text typography={"body2"} value={lang} />
                <Box spacerHorizontal={BoxUnit.HALF} />
                <S.Flag source={FLAGS[lang]} />
            </BaseButton>
        </S.Header>
    );
});
