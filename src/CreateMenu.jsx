import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Box,
  Button,
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
  Select
} from "@chakra-ui/core"

import { createGame, getPlayers, startGame } from './utils/Mock'
import { useInterval } from './utils/useInterval'


const CreateMenu = ({ context, setContext }) => {
  const [titulo, setTitulo] = useState('')
  const [numero, setNumero] = useState(2)
  const [nos, setNos] = useState([''])
  const [ellos, setEllos] = useState([''])
  const [listPlayers, setListPlayers] = useState([])
  console.log('Grupos: ', nos, ellos)

  useInterval(() => {
      getPlayers(setListPlayers, (r)=>console.log('Error getPlayers', r))
    },
    2000
  )


  const onChangeRadio = e => {
    const num = parseInt(e.target.value)
    setNumero(num)
    setNos(Array(num/2).fill(''))
    setEllos(Array(num/2).fill(''))
  }

  const form = (
    <>
      <Input isRequired
        id="fname"
        placeholder="titulo"
        type="text"
        onChange={event => setTitulo(event.target.value)}
      />
      <RadioGroup
        onChange={onChangeRadio}
        defaultValue="2"
        spacing={5}
        isInline
      >
        <Radio value="2">2</Radio>
        <Radio value="4">4</Radio>
        <Radio value="6">6</Radio>
      </RadioGroup>
      <FormHelperText id="email-helper-text">
        Selecciona la cantidad de jugadores.
      </FormHelperText>

    </>
  )

  const makeMap = (quien, setQuien, textQuien) => {
    const onChange = index => e => {
      const newNos = quien
      newNos[index] = e.target.value
      setQuien(newNos)
    }
    return quien.map((item, index) => (
      <Select
        placeholder={textQuien}
        key={index}
        onChange={onChange(index)}
      >
        { listPlayers.map(({ username }, index) => (
            <option key={index} value={username}>{username}</option>
          ))
        }
      </Select>
    ))
  }

  let players = (
    <>
      { makeMap(nos, setNos, 'Nosotros') }
      { makeMap(ellos, setEllos, 'Ellos') }
    </>
  )

  const onSuccessCreate = () => {
    setContext({...context, stage: 'running'})
  }

  const onFailureCreate = () => {}

  const setStart = () => {
    startGame()
    setContext({...context, stage: 'started'})
  }

  if (context.stage === 'started') {
    return (<Redirect to={'/game'} push />)
  }

  if (context.stage === 'running') {
    return (
      <Button onClick={setStart}>
        Comenzar!
      </Button>
    )
  }

  return(
    <Box w="50%">
      Create Menu
      { form }
      { players }
      <Button
        onClick={() => createGame(context.username, titulo, numero, nos, ellos, onSuccessCreate, onFailureCreate)}
      >
        Crear
      </Button>
    </Box>
  )
}

export default CreateMenu
