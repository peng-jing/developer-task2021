import React, { useEffect, useState } from 'react'
import { Hub, Auth } from 'aws-amplify'
import styled, { createGlobalStyle } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fab)

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1.5em;
    text-decoration: none;
  }
`
const Container = styled.div`
  background: #f1f5ff;
  height: 100vh;
  position: relative;
`
const RegisterCard = styled.div`
  background: #ffffff;
  height: 100vh;
  position: relative;
  padding: 75px 21px;
  @media screen and (min-width: 768px) {
    width: 610px;
    height: 680px;
    box-shadow: 0px 5px 10px 5px rgba(222, 231, 255, 0.25);
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 75px 110px;
  }
`
const TitleWrapper = styled.div`
  overflow: hidden;
`
const BackBtn = styled.div`
  cursor: pointer;
  position: absolute;
  & span {
    margin-left: 10px;
  }
  top: 41px;
  left: 19px;
  @media screen and (min-width: 768px) {
    top: 32px;
    left: 31px;
  }
  &:hover {
    font-weight: bold;
    border-bottom: solid 3px #3c71ff;
  }
`
const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`
const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
`
const SocialRegister = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
const SocialBtn = styled.div`
  cursor: pointer;
  padding: 15px 5px;
  display: flex;
  align-items: center;
  border: solid 1px rgba(60, 113, 255, 0.5);
  border-radius: 5px;
  & span {
    font-size: 13px;
    margin-left: 5px;
    font-weight: 500;
  }
  @media screen and (min-width: 768px) {
    padding: 15px;
    & span {
      margin-left: 10px;
    }
  }
  &:hover {
    background: #3c71ff;
    color: #ffffff;
    box-shadow: 0px 6px 15px rgba(60, 113, 255, 0.4);
    .fa-icon {
      color: #ffffff;
    }
  }
`
const EmailRegister = styled.form``
const EmailTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  position: relative;
  margin: 30px auto;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    background: #000000;
    height: 1px;
    width: 100%;
    margin-left: 10px;
  }
`
const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  & div + div {
    margin-left: 20px;
  }
`
const InputWrapper = styled.div`
  position: relative;
`
const InputTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  transition: transform 0.1s;
  pointer-events: none;
`
const Input = styled.input`
  width: 100%;
  border: none;
  background: #f1f5ff;
  padding: 25px 10px 10px;
  border-radius: 5px;
  margin: 10px auto;
  &:placeholder-shown::placeholder {
    color: transparent;
  }
  &:focus {
    outline: none;
  }
  &:focus + ${InputTitle}, &:not(:placeholder-shown) + ${InputTitle} {
    transform: scale(0.75) translate(-10px, -32px);
  }
`
const SubmitBtn = styled.div`
  background: #3c71ff;
  color: #ffffff;
  width: 100%;
  padding: 19px;
  text-align: center;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0px 6px 15px rgba(60, 113, 255, 0.4);
  }
`
const LoginBtn = styled.div`
  cursor: pointer;
  font-size: 13px;
  color: #757575;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  &:hover {
    & a {
      border-bottom: solid #3c71ff 3px;
    }
  }
  & a {
    color: #3c71ff;
    font-weight: 700;
    margin-left: 5px;
  }
`

export default function Register() {
  const [user, setUser] = useState(null)
  async function getUser() {
    try {
      const token = await Auth.currentAuthenticatedUser()
      setUser(token)
    } catch (err) {
      console.log(err)
    }
  }
  async function getUser() {
    try {
      const token = await Auth.currentAuthenticatedUser()

      setUser(token)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <GlobalStyle />
      <Container>
        <RegisterCard>
          <BackBtn>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </BackBtn>

          <SubTitle children={'Start from free'} />
          <Title children={'Create an account'} />
          <SocialRegister>
            <SocialBtn
              onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
            >
              <FontAwesomeIcon
                icon={['fab', 'google']}
                className='fa-icon'
                color='#3C71FF'
                size='lg'
              />
              <span>Sign up with Google</span>
            </SocialBtn>
            <SocialBtn
              onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
            >
              <FontAwesomeIcon
                icon={['fab', 'facebook-f']}
                className='fa-icon'
                color='#3C71FF'
                size='lg'
              />
              <span>Sign up with Facebook</span>
            </SocialBtn>
          </SocialRegister>

          <EmailRegister>
            <TitleWrapper>
              <EmailTitle children={'Or use your email for registration'} />
            </TitleWrapper>
            <UserName>
              <InputWrapper>
                <Input placeholder='First Name' />
                <InputTitle children='First Name' />
              </InputWrapper>
              <InputWrapper>
                <Input placeholder='Last Name' />
                <InputTitle children='Last Name' />
              </InputWrapper>
            </UserName>
            <InputWrapper>
              <Input placeholder='Email' />
              <InputTitle children='Email' />
            </InputWrapper>
            <InputWrapper>
              <Input type='Password' placeholder='Password' />
              <InputTitle children='Password' />
            </InputWrapper>
            <SubmitBtn children='Create an Free Account!' />
          </EmailRegister>
          <LoginBtn>
            Already have an account?
            <a href='/'>Log in</a>
          </LoginBtn>
        </RegisterCard>
      </Container>
    </>
  )
}
