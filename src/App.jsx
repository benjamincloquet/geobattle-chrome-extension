import React from 'react';
import {
  Container, Header, Input, Button,
} from 'semantic-ui-react';

const App = () => (
  <Container>
    <Header as="h4">GeoBattle</Header>
    <Button primary>Create Challenge</Button>
    <Input placeholder="Enter Challenge Link..." />
    <Button attached="right">Send</Button>
  </Container>
);

export default App;
