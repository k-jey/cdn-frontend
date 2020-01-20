import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import { updateUser, getUser } from '../api'

const UpdateUser = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        contact: '',
        skillSet: [],
        hobby:'',
        error: '',
        success: false,
        redirectToProfile: false
    })

    const { name, email, contact, hobby, skillSet, error, success, redirectToProfile } = values

    const loadUser = (id) => {
        getUser(id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email,
                    contact: data.contact,
                    skillSet: data.skillSet,
                    shipping: data.shipping,
                    hobby: data.hobby
                });
            }
        })
    }

    useEffect(()=> {
        loadUser(match.params.id)
    }, [])

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({
            ...values,
            error: false
        })
        updateUser(match.params.id, { name, email, contact, hobby, skillSet })
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
                    password: '',
                    contact: '',
                    skillSet: [],
                    hobby:'',
                    error: '',
                    redirectToProfile: true,
                    success: true
                })
            }
        })
    }

    const UpdateUserForm = () => (
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
            <button onClick={clickSubmit} className="btn btn-primary">Update</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : "none" }}>
            { error }
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : "none" }}>
            The User has been updated
        </div>
    )

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />
            }
        }
    }

    return (
        <Layout 
            title="Update User" 
            description="Complete Developer Network" 
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {UpdateUserForm()}
            {redirectUser()}
        </Layout>
    )
}

export default UpdateUser