import React from 'react'
import { Image } from 'react-native'

import titleLogo from '~/assets/images/titleLogo.png'

export default function HeaderTitle() {
  return <Image source={titleLogo} style={{ width: 140, height: 20 }} />
}
