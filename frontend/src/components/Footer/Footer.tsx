import { Container } from './styles'
import reactIcon from '../../assets/react-icon.svg'

export function Footer() {
  return (
    <Container className="footer">
      <div>
        <p className='text'>
          This Website was made with <img src={reactIcon} alt="React" />
          <span>❤️</span>
        </p>
      </div>
     
    </Container>
  )
}
