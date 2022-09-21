import React, { useState } from 'react'
import supabase from '../../supabase/supabaseClient';

const styles = {
  inputs: 'dark:bg-slate-800 rounded-full border-2 border-blue-400 p-2',
  button: 'text-lg font-semibold text-white dark:text-slate-900 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full py-2'
}

const initialState = {
  date: `${new Date().getFullYear()}-${new Date().getMonth() < 9 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1}-${new Date().getDate()}`,
  taxTypeId: 1,
  amount: 0
}

export const TaxForm = ({ taxTypes}:{ taxTypes: any[]}) => {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (ev:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     setFormData(prev => {
       return {
        ...prev,
        [ev.target.name]: ev.target.value
       }
     })
  }

  const handleSubmit  = async (ev:React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    ev.preventDefault();
    const {amount, date,taxTypeId} = formData;
    if(!amount || !taxTypeId || !date || parseFloat(amount.toString()) == 0) {
      setFormError('Please fill in all the fields correctly.')
      return;
    }
    const {data, error} = await supabase.from('tax').insert([ {...formData} ]);
    if(error) {
      setFormError(error.message);
      return;
    }
    if(data) {
      setFormError(null);
      setFormData(initialState);
    }
  }

  return (
    <div className='w-[90% mx-auto py-4'>
      <h2 className='text-2xl text-center font-semibold py-3'>Add New Tax</h2>
      <form className='grid gap-5 items-center justify-center' onSubmit={handleSubmit}>
        {formError && <p className='text-red-500 text-sm text-center'>{formError}</p>}
        <input className={styles.inputs} type="date" id="date" name="date" value={formData.date} onChange={handleChange}/>
        <select className={styles.inputs} id="taxTypeId" name="taxTypeId" value={formData.taxTypeId} onChange={handleChange}>
          {taxTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        <input className={styles.inputs} type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange}  />
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  )
}
