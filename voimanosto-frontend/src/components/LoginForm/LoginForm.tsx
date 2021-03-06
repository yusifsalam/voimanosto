import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'

const LoginForm: React.FC<ILoginProps> = ({
  username,
  password,
  errorMessage,
  handleLogin,
  setUsername,
  setPassword
}) => {
  return (
    <div>
      <Header inverted as='h2'>
        Login
      </Header>
      {errorMessage !== null ? (
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{errorMessage}</p>
        </Message>
      ) : (
        <div> </div>
      )}
      <Segment inverted placeholder style={{ backgroundColor: '#222' }}>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form inverted onSubmit={handleLogin}>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />

              <Button inverted content='Login' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button
              inverted
              as={NavLink}
              to='/register'
              content='Sign up'
              icon='signup'
              size='big'
            />
          </Grid.Column>
        </Grid>

        <Divider inverted vertical>
          Or
        </Divider>
      </Segment>
    </div>
  )
}

export default LoginForm
