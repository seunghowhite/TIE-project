import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Logo = () => {
  const navigator = useNavigate()
  return (
    <DivContainer onClick={() => navigator('/')}>
      <StyledLOGO >TIE</StyledLOGO>
    </DivContainer>
  )
}

const StyledLOGO = styled.p`
  font-family: VariableFont_YEAR;
  font-size: 30px;
  color: #2975CC;
`
const DivContainer = styled.div`
  cursor: pointer
`

export default Logo;