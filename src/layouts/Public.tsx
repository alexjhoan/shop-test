import { Box, useMediaQuery, useTheme, styled, Container, Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useStoreActions } from '../store/products'
import { useCartActions, useUserActions, useUsersActions } from '../store/user'
import { mockData } from '../utils/mockData'
import Header from './public/Header'
import Sidebar from './public/Sidebar'

const ContainerLayout = styled(Box)(({ theme }) => ({
  marginTop: 80,
  '.innerContent': {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 300px)',
    minHeight: 'calc(100vh - 80px)',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0
    }
  }
}))

const PublicLayout = ({ children, maxWidth = 'xl', ...rest }: { children: ReactNode; maxWidth?: any }) => {
  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.down('xl'))

  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()
  const { updateUsers } = useUsersActions()
  const { updateUser } = useUserActions()

  useEffect(() => {
    let mount = true
    if (mount) {
      // Verificar si hay datos en el localStorage
      const storedData = localStorage.getItem('products')
      const storedCart = localStorage.getItem('cart')
      const storedUser = localStorage.getItem('user')
      const storedUsers = localStorage.getItem('users')
      if (storedData) {
        // Si hay datos en el localStorage, cargarlos en el estado de React
        updateData(JSON.parse(storedData))
      } else {
        // Si no hay datos, cargar la data de prueba y guardarla en el localStorage
        localStorage.setItem('products', JSON.stringify(mockData))
        updateData(mockData)
      }
      if (storedCart) {
        updateCart(JSON.parse(storedCart))
      }
      if (storedUser) {
        updateUser(JSON.parse(storedUser))
      }
      if (storedUsers) {
        updateUsers(JSON.parse(storedUsers))
      }
    }
    return () => {
      mount = false
    }
  }, [])

  return (
    <ContainerLayout>
      <Header />
      <Stack direction={'row'}>
        <Sidebar />
        <Box className={'innerContent'}>
          <Container maxWidth={maxWidth} sx={{ ml: isLg ? 'auto' : maxWidth ? 0 : 'auto' }} {...rest}>
            <Box mb={10} pt={3}>
              {children}
            </Box>
          </Container>
        </Box>
      </Stack>
    </ContainerLayout>
  )
}

export default PublicLayout
