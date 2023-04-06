import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, TextStyle } from 'react-native';

export function AnimatedText({ text, style }) {
    const [innerText, setInnerText] = useState(text);
    const animation = useRef(new Animated.Value(1));

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: 0,
            useNativeDriver: true,
            duration: 300,
            easing: Easing.linear
        }).start();

        setTimeout(() => {
            setInnerText(text);
            Animated.timing(animation.current, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300,
                easing: Easing.linear
            }).start();
        }, 301)
    }, [text])

    return (<Animated.Text style={[style, {opacity: animation.current}]}>{innerText}</Animated.Text>);
}
