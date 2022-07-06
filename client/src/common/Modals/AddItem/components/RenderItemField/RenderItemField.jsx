import React from 'react'
import TextInput from '../../../../Inputs/TextInput/TextInput'
import TextareaInput from '../../../../Inputs/TextareaInput/TextareaInput'
import NumberInput from '../../../../Inputs/NumberInput/NumberInput'
import DateInput from '../../../../Inputs/DateInput/DateInput'
import BooleanInput from '../../../../Inputs/BooleanInput/BooleanInput'

const RenderItemField = ({ fields = [], setFields = null }) => {

    const setValue = (e, i) => {
        let newFields = [...fields]
        newFields[i].value = e.target.value
        setFields(newFields)
    }

    const setDate = (date, i) => {
        let newFields = [...fields]
        newFields[i].value = date
        setFields(newFields)
    }

    return (
        fields.map((v, i) => {
            return v.type === 'String' ? <TextInput label={v.name} value={v.value} setValue={(e) => setValue(e, i)} className='mb-2' key={i} /> :
                v.type === 'Text' ? <TextareaInput label={v.name} value={v.value} setValue={(e) => setValue(e, i)} className='mb-2' key={i} /> :
                    v.type === 'Number' ? <NumberInput label={v.name} value={v.value} setValue={(e) => setValue(e, i)} className='mb-2' key={i} /> :
                        v.type === 'Date' ? <DateInput label={v.name} value={v.value} setValue={(date) => setDate(date, i)} className='mb-2' key={i} /> :
                            v.type === 'Boolean' ? <BooleanInput label={v.name} setValue={(e) => setValue(e, i)} className='mb-2' key={i} /> :
                                v.type === 'Link' ? <TextInput label={v.name} value={v.value} setValue={(e) => setValue(e, i)} className='mb-2' key={i} /> : ''
        })
    )
}

export default RenderItemField