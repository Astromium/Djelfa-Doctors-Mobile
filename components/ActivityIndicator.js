import React from 'react'
import LottieView from 'lottie-react-native'

export default function ActivityIndicator({ visible = false }) {
    if (!visible) return null
    return (
        <LottieView source={require('../animations/loading5.json')} autoPlay loop style={{ width: 200 }} />
    )
}
