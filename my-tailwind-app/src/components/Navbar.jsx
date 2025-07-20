import React from 'react'

const Navbar = () => {
    return (
        <div className="flex justify-evenly items-center bg-blue-200  h-32 font-bold text-lg font-serif">
            <h1 className='hover:text-white cursor-pointer'>Anonymous Post</h1>
            <h1 className='hover:text-white cursor-pointer'>Anonymous User</h1>
            <h1 className='hover:text-white cursor-pointer'>Hidden Identity</h1>
        </div>
    );
}

export default Navbar;

