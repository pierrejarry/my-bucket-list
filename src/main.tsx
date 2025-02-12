import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BucketListProvider } from './context/bucketListContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BucketListProvider>
      <App />
    </BucketListProvider>
  </StrictMode>,
)
