import './App.css';
import { HeaderProvider } from './HeaderContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Posts from './Posts';
import Users from './Users';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Posts /> },
    { path: '/posts', element: <Posts /> },
    { path: '/users', element: <Users /> },
  ])

  return (
    <div>
      <HeaderProvider>
        <RouterProvider router={router} />
      </HeaderProvider>
    </div>
  )

}

export default App