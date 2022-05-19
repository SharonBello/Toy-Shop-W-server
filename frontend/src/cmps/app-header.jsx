import React, { Component, useState } from "react";
// import React from "react"
import { NavLink } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'
// import { loadToy } from '../store/actions/toy.action.js'
import { login, signup, logout } from '../store/actions/user.action.js'
// import { Login } from './login.jsx'
// import { Signup } from './signup.jsx'
import { LoginSignup } from './login-signup.jsx'
import { UserMsg } from './user-msg.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import LogoutIcon from '@mui/icons-material/Logout';
import { Search, LogoFull } from "../services/svg.service.js";

export const AppHeader = (props) => {

    const {user} = useSelector((storeState) => storeState.userModule)
    const {toys} = useSelector((storeState) => storeState.toyModule)
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()

    // state = {
    //     searchTerm: '',
    //     isModalOpen: false,
    // }

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
        // console.log('user',this.props.user )
        if(user) return
        setIsModalOpen(true)
        // setState({ isModalOpen: true }, () => {
        //     console.log('onOpenModal - isModalOpen', isModalOpen)
        // })
    }
    
    const onCloseModal = (ev) => {
        ev.preventDefault()
        setIsModalOpen(false)
        // setState({ isModalOpen: false })
    }
    
    
        // const { searchTerm, isModalOpen } = this.state
        // const { user } = this.props
        return (
            <header className="main-header">
                <img className="toy-img-header" src="img/carousel.gif" alt="" />
                <UserMsg />

                <section className="main-header-nav">
                    <div>
                        <ul className="main-nav clean-list flex">
                            <li className="home-link btn-light"><NavLink to="/">Home</NavLink></li>
                            <li className="btn-light"><NavLink to="/toy">Toys</NavLink></li>
                            <li className=" btn-light"><NavLink to="/about">About</NavLink></li>
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
                            {!user && <LoginSignup onLogin={onLogin} onSignup={onSignup} onCloseModal={onCloseModal}/>}</Dialog>} 
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
                <div className="header-title">
                    <LogoFull />
                    <p>Treasures<br></br><span>&</span><br></br>Giggles</p>
                </div>

            </header>
        )
    }

// const mapStateToProps = (storeState) => {
//     return {
//         // user: storeState.userModule.user,
//         // toys: storeState.toyModule.toys
//     }
// }

// const mapDispatchToProps = {
//     loadToy,
//     login,
//     signup,
//     logout,
// }

// export const AppHeader = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(_AppHeader)

