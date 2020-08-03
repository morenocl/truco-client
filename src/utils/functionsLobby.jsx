import React from 'react'
import { Select } from "@chakra-ui/core"


export const onChangeRadio = (setNos, setEllos) => e => {
  const num = parseInt(e.target.value)
  setNos(Array(num/2).fill(''))
  setEllos(Array(num/2).fill(''))
}


export const DropDowns = ({ quien, setQuien, textQuien, listOptions }) => {
  const onChange = index => e => {
    const newNos = quien
    newNos[index] = e.target.value
    setQuien(newNos)
  }
  console.log('Quien: ', quien)
  return (
    <>
      {quien.map((item, index) => (
        <Select
          placeholder={textQuien}
          key={index}
          onChange={onChange(index)}
        >
          { console.log('ListPlayers', listOptions) }
          { listOptions.map((user, index) => (
              <option key={index} value={user}>{user}</option>
            ))
          }
        </Select>
      ))}
    </>
  )
}
