/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Theme } from '../theme';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

export type BoxProps = {
    centralize?: boolean,
    alignCenter?: boolean,
    alignStart?: boolean,
    alignEnd?: boolean,
    alignStretch?: boolean,

    justifyCenter?: boolean,
    justifyStart?: boolean,
    justifyEnd?: boolean,
    justifySpaceAround?: boolean,
    justifySpaceBetween?: boolean,
    justifySpaceEvenly?: boolean,

    flex?: number,
    column?: boolean,
    fit?: boolean,
    fitAbsolute?: boolean,

    wrap?: boolean,
    padding?: boolean,
    paddingSmall?: boolean,
    paddingExtraSmall?: boolean,
    margin?: boolean,
    marginSmall?: boolean,
    marginExtraSmall?: boolean,

    children?: React$Node,
    style?: any,
    color?: string | null,
    border?: boolean,
    primary?: boolean,
    secondary?: boolean,
    lowOpacity?: boolean,
    paper?: boolean,
    rounded?: boolean,
    circle?: boolean,
    hideOverflow?: boolean,
    scroll?: boolean,
    scrollHorizontal?: boolean,

    spacerSmall?: boolean,
    spacer?: boolean,
    spacerLarge?: boolean,
    spacerVerticalSmall?: boolean,
    spacerVertical?: boolean,
    spacerVerticalLarge?: boolean,
};

class Box extends Component<BoxProps> {
    render(): React$Node {
        const {
            children,

            centralize,

            alignCenter,
            alignStart,
            alignEnd,
            alignStretch,

            justifyCenter,
            justifyStart,
            justifyEnd,
            justifySpaceAround,
            justifySpaceBetween,
            justifySpaceEvenly,

            flex,
            column,
            fit,
            fitAbsolute,

            wrap,
            padding,
            paddingSmall,
            paddingExtraSmall,
            margin,
            marginSmall,
            marginExtraSmall,

            style,
            color,
            border,
            primary,
            secondary,
            lowOpacity,
            paper,
            rounded,
            circle,
            hideOverflow,
            scroll,
            scrollHorizontal,

            spacerSmall,
            spacer,
            spacerLarge,
            spacerVerticalSmall,
            spacerVertical,
            spacerVerticalLarge,

            ...anotherProps
        } = this.props;

        const _staticStyles = staticStyles;

        const _styles = [_staticStyles.box];

        if (centralize) {
            _styles.push(_staticStyles.centralize);
        }
        if (alignCenter) {
            _styles.push(_staticStyles.alignCenter);
        }
        if (alignStart) {
            _styles.push(_staticStyles.alignStart);
        }
        if (alignEnd) {
            _styles.push(_staticStyles.alignEnd);
        }
        if (alignStretch) {
            _styles.push(_staticStyles.alignStretch);
        }
        if (justifyCenter) {
            _styles.push(_staticStyles.justifyCenter);
        }
        if (justifyStart) {
            _styles.push(_staticStyles.justifyStart);
        }
        if (justifyEnd) {
            _styles.push(_staticStyles.justifyEnd);
        }
        if (justifySpaceAround) {
            _styles.push(_staticStyles.justifySpaceAround);
        }
        if (justifySpaceBetween) {
            _styles.push(_staticStyles.justifySpaceBetween);
        }
        if (justifySpaceEvenly) {
            _styles.push(_staticStyles.justifySpaceEvenly);
        }
        if (column || scroll) {
            _styles.push(_staticStyles.column);
        }
        if (fit) {
            _styles.push(_staticStyles.fit);
        }
        if (fitAbsolute) {
            _styles.push(_staticStyles.fitAbsolute);
        }
        if (wrap) {
            _styles.push(_staticStyles.wrap);
        }
        if (padding) {
            _styles.push(_staticStyles.padding);
        }
        if (paddingSmall) {
            _styles.push(_staticStyles.paddingSmall);
        }
        if (paddingExtraSmall) {
            _styles.push(_staticStyles.paddingExtraSmall);
        }
        if (margin) {
            _styles.push(_staticStyles.margin);
        }
        if (marginSmall) {
            _styles.push(_staticStyles.marginSmall);
        }
        if (marginExtraSmall) {
            _styles.push(_staticStyles.marginExtraSmall);
        }
        if (border) {
            _styles.push(_staticStyles.border);
        }
        if (lowOpacity) {
            _styles.push(_staticStyles.lowOpacity);
        }
        if (paper) {
            _styles.push(_staticStyles.paper);
        }
        if (rounded) {
            _styles.push(_staticStyles.rounded);
        }
        if (circle) {
            _styles.push(_staticStyles.circle);
        }
        if (hideOverflow) {
            _styles.push(_staticStyles.hideOverflow);
        }

        if (spacerSmall) {
            _styles.push(_staticStyles.spacerSmall);
        }
        if (spacer) {
            _styles.push(_staticStyles.spacer);
        }
        if (spacerLarge) {
            _styles.push(_staticStyles.spacerLarge);
        }
        if (spacerVerticalSmall) {
            _styles.push(_staticStyles.spacerVerticalSmall);
        }
        if (spacerVertical) {
            _styles.push(_staticStyles.spacerVertical);
        }
        if (spacerVerticalLarge) {
            _styles.push(_staticStyles.spacerVerticalLarge);
        }

        _styles.push({
            backgroundColor: color
                ? color
                : secondary
                ? Theme.palette.backgroundSecondary
                : primary || paper
                ? Theme.palette.backgroundPrimary
                : 'transparent',
        });

        if (flex) {
            _styles.push({
                flex,
            });
        }

        if (style) {
            _styles.push(style);
        }

        return scroll || scrollHorizontal ? (
            <ScrollView
                style={scrollHorizontal ? {} : _staticStyles.scroll}
                horizontal={scrollHorizontal}
                showsHorizontalScrollIndicator={false}>
                <View
                    style={[
                        scrollHorizontal ? {} : _staticStyles.scrollInner,
                        _styles,
                    ]}
                    {...(anotherProps: ViewProps | Object)}>
                    {children}
                </View>
            </ScrollView>
        ) : (
            <View style={_styles} {...(anotherProps: ViewProps | Object)}>
                {children}
            </View>
        );
    }
}

const staticStyles = {
    box: {
        position: 'relative',
        flexDirection: 'row',
    },
    scroll: {
        flex: 1,
    },
    scrollInner: {
        flex: 1,
    },
    centralize: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    lowOpacity: {
        opacity: 0.5,
    },

    alignCenter: {
        alignItems: 'center',
    },
    alignStart: {
        alignItems: 'flex-start',
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    alignStretch: {
        alignItems: 'stretch',
    },

    justifyCenter: {
        justifyContent: 'center',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    justifySpaceAround: {
        justifyContent: 'space-around',
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
    },
    justifySpaceEvenly: {
        justifyContent: 'space-evenly',
    },

    column: {
        flexDirection: 'column',
    },
    fit: {
        flex: 1,
    },
    fitAbsolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    wrap: {
        flexWrap: 'wrap',
    },
    border: {
        borderWidth: 1,
        borderColor: '#555',
    },

    hideOverflow: {
        overflow: 'hidden',
    },

    padding: {
        padding: Theme.metrics.spacing * 2,
    },
    paddingSmall: {
        padding: Theme.metrics.spacing,
    },
    paddingExtraSmall: {
        padding: Theme.metrics.spacing / 2,
    },
    margin: {
        margin: Theme.metrics.spacing * 2,
    },
    marginSmall: {
        margin: Theme.metrics.spacing,
    },
    marginExtraSmall: {
        margin: Theme.metrics.spacing / 2,
    },
    paper: {
        borderRadius: Theme.metrics.borderRadius,
        elevation: 2,
        // borderWidth: 1,
        // borderColor: 'rgba(0, 0, 0, .1)',
    },
    rounded: {
        borderRadius: Theme.metrics.borderRadius,
    },
    circle: {
        borderRadius: Theme.metrics.borderRadius * 1920,
    },
    spacerSmall: {
        width: Theme.metrics.spacing,
    },
    spacer: {
        width: Theme.metrics.spacing * 2,
    },
    spacerLarge: {
        width: Theme.metrics.spacing * 4,
    },
    spacerVerticalSmall: {
        height: Theme.metrics.spacing,
    },
    spacerVertical: {
        height: Theme.metrics.spacing * 2,
    },
    spacerVerticalLarge: {
        height: Theme.metrics.spacing * 4,
    },
};

export default Box;
