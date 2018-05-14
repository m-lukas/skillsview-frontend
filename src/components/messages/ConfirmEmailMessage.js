import React from 'react';
import { Message } from 'semantic-ui-react'

//template for confirmation reminder message
const ConfirmEmailMessage = () => (
    <Message info>
        <Message.Header>Please confirm your email ...</Message.Header>
    </Message>
);

export default ConfirmEmailMessage;