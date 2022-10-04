import React from 'react'
import { TaxForm } from '../components/forms/TaxForm'
import { ITaxTypes } from '../interfaces/ITax'
import supabase from '../supabase/supabaseClient'

const NewTax = ({ taxTypes}:{ taxTypes: ITaxTypes[]}) => {
  return (
   <TaxForm taxTypes={taxTypes}/>
  )
}

export default NewTax


export const getStaticProps = async () => {
  const { data: taxTypes, error } = await supabase.from('tax_type').select('*');
  return {
    props: {
      taxTypes
  }
}
} 