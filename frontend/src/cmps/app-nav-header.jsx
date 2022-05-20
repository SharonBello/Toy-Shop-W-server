import React, { Component, useState } from "react";
// import React from "react"
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, signup, logout } from '../store/actions/user.action.js'
import { LoginSignup } from './login-signup.jsx'
import { UserMsg } from './user-msg.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import LogoutIcon from '@mui/icons-material/Logout';
import { Search, LogoFull } from "../services/svg.service.js";
import LanguageIcon from '@mui/icons-material/Language';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export const AppNavHeader = (props) => {

    const { user } = useSelector((storeState) => storeState.userModule)
    const { toys } = useSelector((storeState) => storeState.toyModule)
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()

    const onHandleChange = ({ target }) => {
        const field = target.name
        let { value } = target
        let { filterBy } = props
        if (field === '') value = [target.value]
        filterBy = { ...filterBy, [field]: value }
        props.setFilter(filterBy)
    }

    const onLogin = (credentials) => {
        dispatch(login(credentials))
    }

    const onSignup = (credentials) => {
        dispatch(signup(credentials))
    }

    const onLogout = () => {
        dispatch(logout())
    }

    const onOpenModal = () => {
        if (user) return
        setIsModalOpen(true)
    }

    const onCloseModal = (ev) => {
        ev.preventDefault()
        setIsModalOpen(false)
    }
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


    return (
        <header className="header-nav">
            <section className="main-header-nav">
                <div className="logo-nav"><LogoFull /></div>
                <div className="main-link-nav">
                    <div className="main-nav">
                        <div className="home-link btn-light"><NavLink to="/">Home</NavLink></div>
                        <div className="btn-light"><NavLink to="/toy">Toys</NavLink></div>
                        <div className="btn-light"><NavLink to="/about">About</NavLink></div>
                        <div className="search-container">
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </div>
                    </div>
                    <div className="user-actions-info">
                        <div className="sale-offers">Coupon-Code<span>SUM2022</span></div>
                    </div>
                    <div className="lan-switch-container">
                        <div className="lang-switch btn-dark"><LanguageIcon />
                        </div>
                    </div>
                </div>


                <div className="login-container">
                    {user && <p className="user-greet">Hello: <span>{user.username}</span></p>}
                    <div className="login-btn-container">
                        <button onClick={() => onOpenModal()} className="login-btn"><AccountCircleIcon /></button>
                        {isModalOpen && <Dialog open={true} >
                            {!user && <LoginSignup onLogin={onLogin} onSignup={onSignup} onCloseModal={onCloseModal} />}</Dialog>}
                    </div>

                    <div className="signup-btn-container ">
                        <button className="login-btn">
                            <i className="fa-solid fa-user-plus"></i></button>
                    </div>
                    <div className="logout-btn-container">
                        <button className="user-logout login-btn" onClick={() => onLogout()}><LogoutIcon /></button>
                    </div>
                </div>
            </section>
        </header >
    )
}