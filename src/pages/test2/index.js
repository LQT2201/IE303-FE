import React from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const page = () => {
  return (
    <div>page</div>
  )
}

page.getLayout = page => <BlankLayout> {page}</BlankLayout>

export default page