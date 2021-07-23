import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  homeContainer: {
    display: 'flex',
    background: '#f2f5f9',
    width: '100%',
    margin: '0 auto',
    maxWidth: "1210px",
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '10px',
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
    marginTop: '20px',
  }
  ,
  homeContainerBlogs: {
    display: 'flex',
    maxWidth: "1210px",
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
  ,
  homeContainerPagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))

export { useStyles }
