import React from 'react'
import { TaxForm } from '../components/forms/TaxForm'
import supabase from '../supabase/supabaseClient'

const NewTax = ({ taxTypes}:{ taxTypes: any}) => {
  return (
   <TaxForm taxTypes={taxTypes}/>
  )
}

export default NewTax


export const getStaticProps = async () => {
  const { data: taxTypes, error } = await supabase.from('taxType').select('*');
  console.log('Tasks ',taxTypes, error)
  return {
    props: {
      taxTypes
  }
}
} 