import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from '@chakra-ui/core'


const Error = ({ message, onClose }) => (
  <Alert status="error">
    <AlertIcon />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      { message }
    </AlertDescription>
    <CloseButton position="absolute" right="8px" top="8px" />
  </Alert>
)

export default Error
