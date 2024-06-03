import { AppBar, CssBaseline, IconButton, InputBase, Paper, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountMenu from './menu'
// import React from 'react'
import  SearchIcon from "@mui/icons-material/Search"


const drawerWidth = 240

interface ModalProps {
    handleDrawerToggle : () => void
}

const Header = ({handleDrawerToggle}:ModalProps) => {

    // const handleDrawerToggle = () => {
    //     if (!isClosing) {
    //         setMobileOpen();
    //     }
    // };

    return (
        <>
        <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: '#fff',
                }}
            >
                <Toolbar>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Products"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div
                        className='flex justify-between items-center w-full'
                    >
                        <Typography variant="h6" noWrap component="div">
                            
                        </Typography>
                        <AccountMenu/>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
