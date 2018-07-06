import styled from 'styled-components'

export const Header = styled.div`
    
`
export const Navbar = styled.div`
    background-color : #9b9b9b;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    line-height: 47px;
`

export const Side = styled.div`
    margin : ${props => props.margin}
`
export const Border = styled.div`
    padding : ${props => props.padding}   
    margin : ${props => props.margin}  
    background : ${props => props.background} 
    line-height: ${props => props.lineHeight} 
    border-color:${props => props.borderColor}
    border: 1px solid gray;
`
export const Content = styled.div`
    text-align : ${props => props.textAlign}
    margin : ${props => props.margin}
    margin-top: ${props => props.marginTop}
`
