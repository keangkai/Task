import styled from 'styled-components'

export const Title = 'Preliminary Research Report'

export const Text = styled.span`
    font-size: ${props => props.size};
    color:${props => props.color || 'black'};
    font-weight: ${props => props.type};
    float: ${props => props.float};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    text-decoration: ${props => props.textDecoration};
    text-align: ${props => props.textAlign};
`
export const Textline = styled.p`
    font-size: ${props => props.size};
    color:${props => props.color || 'black'};
    font-weight: ${props => props.type};
    text-align: ${props => props.textAlign};
`
export const Space = styled.br``

