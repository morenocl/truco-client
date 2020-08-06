import React from 'react'
import {
  Box,
  Button,
  Stack,
  Text
} from "@chakra-ui/core"


const GameScreen = (props) => {
  console.log('Render game')
  const { name, currentPlayer, playersInfo, points, turn, winner } = props

  const Card = ({n, p, ...rest}) => (
    <Box
      bg={n===' ' ? 'gray.400' : 'gray.200'}
      w='50px'
      h='40px'
      shadow="md"
      borderWidth="1px"
      rounded="md"
      {...rest}
    >
      <Text mt={4}>{n} {p}</Text>
    </Box>
  )

  const StackCards = ({cards, rest}) => (
    <Stack isInline spacing={1} align="center" justify='center' {...rest}>
      {cards.map((card, index) => (
        <Card key={index} n={card[0]} p={card[1]} />
      ))}
    </Stack>
  )

  const ViewPlayer = ({username, cards, playedCards, width, onTop}) => (
    <Box w={width} align='center'>
      {onTop && <StackCards cards={playedCards} />}
      <Text fontSize="md" as={username===turn ? 'mark' : ''}>{username}</Text>
      <StackCards cards={cards} />
      {!onTop && <StackCards cards={playedCards} />}
    </Box>
  )
  console.log('CurrentPlayer: ', currentPlayer)
  const myself = (
    <ViewPlayer
      username={currentPlayer.player}
      cards={currentPlayer.cards}
      playedCards={currentPlayer.playedCards}
      width={4/10}
      onTop={true}
    />
  )

  const players = playersInfo
  const morePlayers = (
    <Stack isInline spacing={10} align="center" justify='center'>
      {players.map((player, index) => (
        <ViewPlayer
          key={index}
          username={player.player}
          cards={player.cards}
          playedCards={player.playedCards}
          width={3/10}
          onTop={false}
        />
      ))}
    </Stack>
  )


  const buttons = (
    <Box w={4/10}>
      {currentPlayer.actions.map((act, index) => (
        <Button key={index} onClick={act.func}>
          {act.type}
        </Button>
      ))}
    </Box>
  )

  const pointsTable = (
    <Stack align='left' w={2/10}>
      <Card n={'nos'} w={70} p={points.nos} />
      <Card n={'ellos'} w={70} p={points.ellos} />
    </Stack>
  )

  return (
    <>
      {morePlayers}
      Game
      <Stack isInline spacing={2} align="center" justify="space-between">
        {pointsTable}
        {myself}
        {buttons}
      </Stack>
    </>
  )
}

export default GameScreen
