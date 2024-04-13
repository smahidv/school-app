import { useStateContext } from '../../../contexts/ContextProvider' ;

export default function AdminDashboard() {
  const {currentUser } = useStateContext();
 
    return <div className='capitalize '>Welcome, {currentUser['first name']} </div>;
}
