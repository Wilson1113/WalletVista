import SideHeader from "../components/SideHeader/SideHeader"
import NetWorth from "../components/NetWorth/NetWorth"
import BalanceTable from "../components/BalanceTable/BalanceTable"

export default function Dashboard() {
  return(
  <>
    <SideHeader></SideHeader>
    <div className="dashboard-content">
      <NetWorth></NetWorth>
      <BalanceTable></BalanceTable>
    </div>
    
  </>
  )
}