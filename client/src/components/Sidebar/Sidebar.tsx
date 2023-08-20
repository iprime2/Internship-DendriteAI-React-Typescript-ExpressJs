import { FC } from 'react'
import './sidebar.scss'

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return <div className='sidebar w-25 p-3 bg-primary h-100'>Sidebar</div>
}

export default Sidebar
