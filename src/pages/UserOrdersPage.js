import React from 'react'
import Navbar from '../features/nav/Navbar'
import UserOrders from '../features/user/components/UserOrders'
const MyOrders  = () => {
  return (
    <Navbar>
        <UserOrders/>
    </Navbar>
    )
}

export default MyOrders