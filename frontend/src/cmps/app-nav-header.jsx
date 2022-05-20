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

    return (
        <header >
            <section className="main-header-nav">
                <div className="main-link-nav">
                    <ul className="main-nav clean-list flex">
                        <li className="home-link btn-light"><NavLink to="/">Home</NavLink></li>
                        <li className="btn-light"><NavLink to="/toy">Toys</NavLink></li>
                        <li className="btn-light"><NavLink to="/reviews-explore">Reviews</NavLink></li>
                        <li className="btn-light"><NavLink to="/about">About</NavLink></li>
                        {user && <li className="btn-light"><NavLink to="/user-details">User Page</NavLink></li>}
                    </ul>
                </div>

                <div className="sale-offers">Coupon-Code<span>SUM2022</span></div>

                <div className="lan-search-container">
                    <a href="/" className="lang-switch btn-dark">en</a>
                    <input type="text" className="input-search" placeholder="Search" value={searchTerm} onChange={onHandleChange}></input>
                    <button className="main-header-search" ><Search /></button>
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
            <i className="fa-solid fa-user-plus"></i>
        </header >
    )
}