import React from 'react'
import { Button } from '@mui/material'
import { useLang } from '../../../../contexts/UIContext'

import SelectOne from '../../../../common/SelectOne/SelectOne'

import './MainPageNavbar.scss'



const MainPageNavbar = ({ type = '', setType = null, selectedFilter = '', setSelectedFilter = null }) => {
    const [lang] = useLang()
    const filterTypes = [{ type: 'Date', name: lang.main.date }, { type: 'Alphabet', name: lang.main.alphabet }]

    return (
        <div className='p-3'>
            <div className=" mainPageNavbar rounded bg-white p-2 d-flex align-items-center justify-content-between">
                <div className='btnBox'>
                    <Button variant={type === 'items' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('items')}>{lang.common.items}</Button>
                    <Button variant={type === 'collections' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('collections')}>{lang.common.collections}</Button>
                    <Button variant={type === 'tags' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('tags')}>{lang.common.tags}</Button>
                    <Button variant={type === 'users' ? 'contained' : 'text'} className='me-2 px-3' onClick={() => setType('users')}>{lang.common.users}</Button>
                </div>
                {
                    type !== 'users' && type !== 'tags' ? <div className='w-25 select'>
                        <SelectOne types={type === 'items' ? filterTypes : [...filterTypes, { type: 'Items count', name: lang.main.itemsCount }]} label={lang.main.chooseFilter} value={selectedFilter} setValue={(e) => setSelectedFilter(e.target.value)} />
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default MainPageNavbar