import { Outlet, Link } from "react-router-dom"
import styles from './Routes.module.scss'
import Table from '../common/table'
import TableSet from './tableSet'

function App() {
  return (
    <div className={styles.app}>
      <nav>
        <ul>
          <li>
            <Link to="d3">d3</Link>
          </li>
          <li>
            <Link to="tableset">tableset</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  )
}

export default App
