import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// import { userService } from "../services/user.service.js"
import { login } from '../store/actions/user.action.js'

export const _Login = () => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: ''
    })
    const [isSignup, setIsSignup] = useState(false)
    const {user} = useSelector((storeState) => storeState.userModule)
    const {toys} = useSelector((storeState) => storeState.toyModule.toys)

    // state = {
    //     credentials: {
    //         username: '',
    //         password: '',
    //         fullname: ''
    //     },
    //     isSignup: false,
    // }

    const clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignup: false,
        }
        setState({ clearTemplate })
    }

    const handleChange = (ev, fieldName) => {
        const value = ev.target.value;
        if (fieldName === 'username') {
            setState({ credentials: { ...credentials, username: value } });
        } else if (fieldName === 'password') {
            setState({ credentials: { ...credentials, password: value } });
        }
    }

    const onLogin = (ev = null) => {
        if (!credentials.username || !credentials.password) return;
        if (ev) ev.preventDefault()
        dispatch(login(this.state.credentials))
        console.log('this.state.credentials',credentials )
        // userService.login(this.state.credentials)
        dispatch(clearState())
        dispatch(onHandleCloseDialog(ev))
    }

    
        // const { username, password } = this.state.credentials;
        // const { isSignup } = this.state;
        return (
            <div className="login-page">
                {!isSignup && <form>
                    <TextField
                        label="username"
                        variant="filled"
                        required
                        value={username}
                        onChange={(ev) => this.handleChange(ev, 'username')}
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        required
                        value={password}
                        onChange={(ev) => this.handleChange(ev, 'password')}
                    />
                    <div>
                        <Button onClick={this.onLogin} type="submit" variant="contained" color="primary" >
                            SignIn
                        </Button>
                        <Button variant="contained" onClick={this.props.onHandleCloseDialog}>
                            Cancel
                        </Button>
                    </div>
                </form>}
            </div>
        )
    }



// const mapStateToProps = (storeState) => {
//     return {
//         // user: storeState.userModule.user,
//         // toys: storeState.toyModule.toys,
//     }
// }

// const mapDispatchToProps = {
//     login,
// }

// export const Login = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(_Login)
