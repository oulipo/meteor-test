import React from 'react'

import LinksList from '../ui/LinksList'
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinksListFilter from './LinksListFilter'

const Link = () => {
  return (
    <div>
      <PrivateHeader title="Vos liens" />
      <LinksListFilter />
      <AddLink />
      <LinksList />
    </div>
  )
}

export default Link