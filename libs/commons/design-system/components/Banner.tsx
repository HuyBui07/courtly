import { styles } from '@/libs/commons/design-system/styles'

import { View, Text } from 'react-native'

const Banner = () => {
  return (
    <View style={{...styles.container, width: "100%", height: 112}}>
      <Text>Banner</Text>
    </View>
  )
}

export default Banner