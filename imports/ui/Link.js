import React from 'react'

import LinksList from '../ui/LinksList'
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinksListFilter from './LinksListFilter'

const Link = () => {
  return (
    <div>
      <PrivateHeader title="Short Lnk" />
      <div className="page-content">
        <LinksListFilter />
        <AddLink />
        <LinksList />
      </div>
      
    </div>
  )
}

export default Link