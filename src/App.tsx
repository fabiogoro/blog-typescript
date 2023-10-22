import './App.css';
import { HeaderProvider } from './HeaderContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Posts from './Posts';
import Users from './Users';

function App() {
  const router = createBrowserRouter([
    { path: '/blog-typescript?', element: <Posts /> },
    { path: '/blog-typescript?/posts', element: <Posts /> },
    { path: '/blog-typescript?/users', element: <Users /> },
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