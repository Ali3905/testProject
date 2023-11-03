import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return  <>
  <div style={{
    display : "grid",
    gridTemplateColumns : "1fr 4fr",
    minHeight : "100vh"
  }}>
  <SideBar/>
  <Component {...pageProps} />
  </div>
  </>
 
}
