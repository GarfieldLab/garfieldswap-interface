import { ChainId } from 'garfieldswap-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import sidebar from '../../assets/images/sidebar.jpg'
import Logo from '../../assets/images/logo.png'
import LogoDark from '../../assets/svg/logo_white.svg'
import Wordmark from '../../assets/svg/wordmark.svg'
import WordmarkDark from '../../assets/svg/wordmark_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'
import { NavLink, Link as HistoryLink } from 'react-router-dom'
import Row, { RowBetween } from '../Row'
import Web3Status from '../Web3Status'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`

const TitleText = styled(Row)`
  width: fit-content;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ebe0da;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  box-shadow:3px 3px 0px #372007;
    // border: 1px solid #372007;
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`
const Sidebar = styled.div`
position: fixed;
left: 0;
top: 0;
width: 240px;
background: url(${sidebar}) #d4c4a4;
height: 100%;
z-index:99;
`
const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  margin:20px 0 44px 20px
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 4.5rem;
    }
  `};
`
const navlinkstyle = {
  fontSize: '20px',
  display: "inline-block",
  height: '40px',
  width: '200px',
  'border-radius': '3px',
  'text-align': 'center',
  color: '#372007',
  'line-height': '40px',
  background: '#ebe0da',
  border: '1px solid #a08357',
  margin: '0 0 15px 20px',
  'text-decoration': 'none'
}

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`
const NavList = styled.div`

`
const Tabs = styled.div`
 z-index:99;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})
  `
  height: 40px;
  width:200px;
  border-radius: 3px;
  outline: none;
  text-align:center;
  margin: 0 0 15px 20px;
  cursor: pointer;
  text-decoration: none;
  color: #372007;
  font-size: 20px;
  line-height: 40px;
  background:#ebe0da;
  border:1px solid #a08357;
  display: inline-block;
  // &.${activeClassName} {
  //   background:#dd330b;
  //   font-weight: 500;
  //   color: #ffffff;
  // }
`
const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.HECO]: 'HECO'
}
function SwapPoolTabs({ active }: { active: 'swap' | 'pool' | 'farm' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '20px' }} >
       <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
      兑换
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
        资金池
      </StyledNavLink>
     <a href="https://farm.garfield.finance/#/" target="_blank" style={navlinkstyle}>
        挖矿
        </a>
        <a target="_blank" style={navlinkstyle} href="https://farm.garfield.finance/#/vault">
            机枪池
          </a>
        <a href="https://garfieldfinance.gitbook.io/garfieldfinance/" target="_blank" style={navlinkstyle}>
        产品说明
        </a>
        <a style={navlinkstyle} href="https://github.com/GarfieldLab/garfieldfinance-Valut/blob/main/REP-GarfieldFinance-2021-05-29.pdf" target="_blank">
          Certik审计报告
          </a>
          <a style={navlinkstyle} href="https://github.com/GarfieldLab/garfieldswap-core/blob/main/Garfield%20Finance%20Swap_audit.pdf" target="_blank">
          Armors Labs审计报告
          </a>
    </Tabs>
  )
}
export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances([account])[account]
  const [isDark] = useDarkModeManager()

  return (
    <>
      <Sidebar  className="tabs">
        <Title href=".">
          <UniIcon>
            <img src={Logo} alt="logo" />
          </UniIcon>
        </Title>
        <NavList>
          <SwapPoolTabs active={'pool'} />
        </NavList>
      </Sidebar>
      <HeaderFrame>
        <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
          <HeaderElement>
          </HeaderElement>
          <HeaderControls>
            <HeaderElement>
              <TestnetWrapper>
                {!isMobile && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
              </TestnetWrapper>
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && userEthBalance ? (
                  <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                    {userEthBalance?.toSignificant(4)} HT
                  </BalanceText>
                ) : null}
                <Web3Status />
              </AccountElement>
            </HeaderElement>
            <HeaderElementWrap>
              <Settings />
              <Menu />
            </HeaderElementWrap>
          </HeaderControls>
        </RowBetween>
      </HeaderFrame>
    </>
  )
}
