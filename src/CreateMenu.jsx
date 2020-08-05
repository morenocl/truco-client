import React, { useState } from 'react'
import {
  Box,
  Button,
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/core"

import { createGame, getPlayers } from './utils/Api'
import { useInterval } from './utils/useInterval'
import { DropDowns, onChangeRadio } from './utils/functionsLobby'

const CreateMenu = ({ context, setContext }) => {
  const [titulo, setTitulo] = useState('')
  const [nos, setNos] = useState([''])
  const [ellos, setEllos] = useState([''])
  const [listPlayers, setListPlayers] = useState([])
  const toast = useToast()
  console.log('Grupos: ', nos, ellos)

  useInterval(() => {
      getPlayers(setListPlayers, (r)=>console.log('Error getPlayers', r))
    },
    5000
  )

  const form = (
    <>
      <Input isRequired
        id="fname"
        placeholder="titulo"
        type="text"
        onChange={event => setTitulo(event.target.value)}
      />
      <RadioGroup
        onChange={onChangeRadio(setNos, setEllos)}
        defaultValue="2"
        spacing={5}
        isInline
      >
        <Radio value="2">2</Radio>
        <Radio value="4">4</Radio>
        <Radio value="6">6</Radio>
      </RadioGroup>
      <FormHelperText id="num-players-helper-text">
        Selecciona la cantidad de jugadores.
      </FormHelperText>

    </>
  )


  let players = (
    <>
      <DropDowns quien={nos} setQuien={setNos}  textQuien='Nosotros' listOptions={listPlayers} />
      <DropDowns quien={ellos} setQuien={setEllos} textQuien='Ellos' listOptions={listPlayers} />
    </>
  )

  const onSuccessCreate = (id) => {
    console.log('Game created, id: ', id)
    setContext({...context, stage: 'created', game: {id: id}})
    toast({
      title: "Game created.",
      description: "Got to JoinGame to start.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  const onFailureCreate = (r) => { console.log('Error Create Game: ', r)}

  const onClick = () => {
    createGame({username: context.username, name: titulo, nosotros: nos, ellos}, onSuccessCreate, onFailureCreate)
  }

  return(
    <Box w="50%">
      Create Menu
      { form }
      { players }
      <Button
        onClick={onClick}
      >
        Crear
      </Button>
    </Box>
  )
}

export default CreateMenu
