import React from 'react'
import styled from 'styled-components'

import { RowBetween } from '../../components/Row'

const Wrapper = styled(RowBetween)`
  justify-content: space-around;
`

const Title = styled.h1`
  font-size: 80px;
`

function Game() {
  return (
    <Wrapper>
      <Title>Coming Soon</Title>
    </Wrapper>
  )
}

export default Game
