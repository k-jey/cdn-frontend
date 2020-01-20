import React, { useState } from 'react'
import Layout from '../core/Layout'
import { register } from '../api'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        contact: '',
        userRole: 2,
        skillSet: [],
        hobby:'',
        error: '',
        success: false
    })

    const { name, email, contact, userRole, hobby, skillSet, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({
            ...values,
            error: false
        })
        register({ name, email, contact, skillSet, hobby, userRole })
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false
                })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    contact: '',
                    skillSet: [],
                    hobby:'',
                    error: '',
                    success: true
                })
            }
        })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Contact Number</label>
                <input type="text" onChange={handleChange('contact')} className="form-control" value={contact} />
            </div>
            <div className="form-group">
                <label className="text-muted">Skillset</label>
                <input type="text" onChange={handleChange('skillSet')} className="form-control" value={skillSet} />
            </div>
            <div className="form-group">
                <label className="text-muted">Hobby</label>
                <input type="text" onChange={handleChange('hobby')} className="form-control" value={hobby} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : "none" }}>
            { error }
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : "none" }}>
            User has been created !
        </div>
    )

    return (
        <Layout 
            title="Register Page" 
            description="Complete Developer Network" 
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup