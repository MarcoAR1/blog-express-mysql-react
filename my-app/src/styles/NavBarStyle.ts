import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 32,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  NavBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconShop: {},
  AppBar: {
    position: 'absolute',
    top: 0,
  },
}))

export { useStyles }
