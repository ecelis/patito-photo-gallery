import './App.css'
import PhotoGallery from './components/gallery/PhotoGallery'

export default function App() {
  return (
    <PhotoGallery
      dataUrl="/data.json"
    />
  )
}
