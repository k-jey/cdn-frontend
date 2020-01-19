import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { getUsers } from '../api'

const Home = () => {

    const [userList, setUserList] = useState([])
    const [error, setError] = useState(false)

    const loadDevelopers = () => {
        getUsers().then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setUserList(data)
            }
        })
    }

    useEffect(()=> {
        loadDevelopers()
    }, [])

    return (
        <Layout title="Home Page" description="Complete Developer Network" className="container-fluid">
            <h2 className="mb-4">Developer Listing</h2>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Skills</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((user, index) => (
                    <tr key={index}>
                        <th scope="row">
                        <Link to={`/user/${user._id}`}>
                            <span className="badge badge-warning badge-pill">Update</span>
                        </Link>&nbsp;
                        <span 
                            
                            className="badge badge-danger badge-pill"
                        >Delete</span>
                        </th>
                        <td>{user.email}</td>
                        <td>{user.email}</td>
                        <td>{user.contact}</td>
                        <td>{user.skillSet}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Home