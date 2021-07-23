import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { Avatar, Button, ButtonGroup } from '@material-ui/core'
import { useLocation } from 'wouter'
import { useStyles } from '../styles/NavBarStyle'
import Logo from '../favicon.svg'
import { useUser } from '../hooks/useUser'

const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
}

const NavBar = (): JSX.Element => {
  const classes = useStyles()
  const [location, setLocation] = useLocation()
  const { User } = useUser()

  const handleLocationChange = (Route: string) => {
    setLocation(Route)
  }

  return (
    <>
      <AppBar className={classes.AppBar}>
        <Toolbar variant="dense" className={classes.NavBar}>
          <IconButton
            onClick={() => handleLocationChange(ROUTES.HOME)}
            className={classes.iconShop}
            aria-label="Icon-Shop"
          >
            <img src={Logo} alt="logo" width="30" height="30" />
          </IconButton>
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.input}
              placeholder="Search Products"
              inputProps={{ 'aria-label': 'search Products' }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          {!User.isFetching ? (
            <ButtonGroup color="default" aria-label="Login and SingUp">
              <Button onClick={() => handleLocationChange(ROUTES.LOGIN)}>
                Log in
              </Button>
              <Button onClick={() => handleLocationChange(ROUTES.SIGNUP)}>
                Sing Up
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup color="default" aria-label="Avatar and Button">
              <IconButton className={classes.iconButton} aria-label="Icon-User">
                <Avatar alt={User.user.name}>
                  <img src={User.user.avatar} />
                </Avatar>
              </IconButton>
              <Button>Log Out</Button>
            </ButtonGroup>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '70px' }} />
    </>
  )
}
export default NavBar
