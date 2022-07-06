import React from 'react'
import { Button } from '@mui/material'

import SelectOne from '../../../../common/SelectOne/SelectOne'

const filterTypes = ['Date', 'Likes', 'Viewed', 'Alphabite']

const MainPageNavbar = ({ type = '', setType = null, selectedFilter = '', setSelectedFilter = null }) => {
    return (
        <div className='p-3'>
            <div className="rounded bg-white p-2 d-flex align-items-center justify-content-between">
                <div>
                    <Button variant={type === 'items' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('items')}>Items</Button>
                    <Button variant={type === 'collections' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('collections')}>Collections</Button>
                    <Button variant={type === 'tags' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('tags')}>Tags</Button>
                    <Button variant={type === 'users' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('users')}>Users</Button>
                </div>
                <div className='w-25'>
                    <SelectOne types={filterTypes} label='Choose the filter type' value={selectedFilter} setValue={(e) => setSelectedFilter(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default MainPageNavbar