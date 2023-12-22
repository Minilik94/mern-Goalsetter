import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoaItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    // Check if user is not defined or user.token is not defined
    if (!user || !user.token) {
      // Handle the case where user or token is not defined
      navigate('/login');
      return;
    }

    if (isError) {
      console.log(message);
    }

    dispatch(getGoals());

    // Cleanup logic
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // Check if user is not defined
  if (!user) {
    // Handle the case where user is not defined
    return navigate("/login")
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
