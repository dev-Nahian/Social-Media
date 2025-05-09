import { useAuth } from '../hooks/useAuth'

const HomePage = () => {

  const {auth} = useAuth();
  console.log(auth);
  

  return (
    <div>
      <p>Home Page</p>
    </div>
  )
}

export default HomePage