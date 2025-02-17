import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, DropButton } from 'grommet';
import { Menu, Language, FormDown } from 'grommet-icons';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import EthDiamond from '../static/agora/mainlogo.svg';
import { web3ReactInterface } from '../pages';
import {
  AllowedNetworks,
  NetworkChainId,
} from '../pages/ConnectWallet/web3Utils';
import { Dot } from './Dot';
import { Link } from './Link';
import { Text } from './Text';
import { routesEnum } from '../Routes';
import { Heading } from './Heading';
import {
  IS_MAINNET,
  NETWORK_NAME,
  MAINNET_AGORA_STAKING_URL,
  TESTNET_AGORA_STAKING_NAME,
  TESTNET_AGORA_STAKING_URL,
} from '../utils/envVars';
import { trimString } from '../utils/trimString';
import useIntlNetworkName from '../hooks/useIntlNetworkName';
import useMobileCheck from '../hooks/useMobileCheck';
import { colors } from '../styles/styledComponentsTheme';

const RainbowBackground = styled(Box)`
  background-color: ${colors.blue.darkest}};
`;

const EthLogo = styled.img`
  height: 28px;
  margin: 15px 0;
`;

const NetworkText = styled.div`
  padding: 5px 8px;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: ${colors.lemon};
  background-color: ${colors.blue.subtext};
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 2px;
  &:hover {
    border-radius: 2px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-color: ${colors.blue.subtext};
    transition: transform 0.1s;
    transform: scale(1.02);
    color: ${colors.lemon};
  }
`;

const NavBarLinks = styled.div`
  display: flex;
  @media only screen and (max-width: 1080px) {
    .secondary-link {
      display: none;
    }
  }
`;

const ValidatorDropdown = styled(DropButton)`
  padding: 12px 8px;
  font-weight: 300;
  display: flex;
  align-items: center;
  border: none;
  :hover {
    border: none;
    box-shadow: none;
  }
`;

const DotDropdown = styled(DropButton)`
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  :hover {
    transition: transform 0.2s;
    transform: scale(1.1);
  }
`;

const DropdownLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

const Card = styled.div``;

const NetworkInfo = styled.div`
  background: ${p => p.theme.gray.light};
  padding: 32px;
`;

const NavLinksRight = styled.div`
  display: flex;
  align-items: center;
`;

const BarLinkText = styled(Heading)`
  :not(.no-padding) {
    padding: 0 12px 0 6px;
    white-space: nowrap;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: ${(p: { active?: boolean }) => (p.active ? 'bold' : 300)};
  color: ${colors.white};
`;

const _AppBar = ({ location }: RouteComponentProps) => {
  const {
    active: walletConnected,
    account,
    chainId,
  }: web3ReactInterface = useWeb3React<Web3Provider>();
  const { executionLayerName, consensusLayerName } = useIntlNetworkName();
  const oppositeNetwork = IS_MAINNET ? (
    <FormattedMessage
      defaultMessage="{TESTNET_AGORA_STAKING_NAME} testnet"
      values={{ TESTNET_AGORA_STAKING_NAME }}
    />
  ) : (
    <FormattedMessage defaultMessage="Mainnet" />
  );

  let network;
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = Object.values(AllowedNetworks).includes(network);
  }

  const pathname: string = React.useMemo(() => location.pathname, [
    location.pathname,
  ]);

  const isDropdownPage = React.useMemo(
    () =>
      pathname === routesEnum.lighthouse ||
      pathname === routesEnum.nimbus ||
      pathname === routesEnum.prysm ||
      pathname === routesEnum.teku,
    [pathname]
  );

  const mobile = useMobileCheck('1080px');
  const switchLaunchpadUrl = IS_MAINNET
    ? TESTNET_AGORA_STAKING_URL
    : MAINNET_AGORA_STAKING_URL;

  return (
    <RainbowBackground
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <NavBarLinks>
        <Link to={routesEnum.landingPage} className="mr30">
          <EthLogo src={EthDiamond} alt="eth-diamond" />
          {!mobile && (
            <div className="flex flex-column center ml5">
              <BarLinkText
                active={pathname === routesEnum.landingPage}
                level={4}
                margin="none"
                className="bar-link-text no-padding"
              >
                <FormattedMessage
                  defaultMessage=" {network}"
                  values={{
                    network: IS_MAINNET ? '' : `(${NETWORK_NAME})`,
                  }}
                  description="{network} inserts the testnet name, only if on the testnet"
                />
              </BarLinkText>
            </div>
          )}
        </Link>

        <Link
          to={routesEnum.acknowledgementPage}
          className="mx10 secondary-link"
        >
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.acknowledgementPage}
          >
            <FormattedMessage defaultMessage="Deposit" />
          </BarLinkText>
        </Link>
        <ValidatorDropdown
          className="secondary-link"
          label={
            <BarLinkText level={4} margin="none" active={isDropdownPage}>
              <FormattedMessage defaultMessage="Clients" />
            </BarLinkText>
          }
          dropAlign={{ top: 'bottom', right: 'right' }}
          dropContent={
            <Box pad="medium">
              <Text className="my10">
                <b>Execution clients</b>
              </Text>
              <Box pad="small">
                {/* <DropdownLink to={routesEnum.besu}>Besu</DropdownLink> */}
                {/* <DropdownLink to={routesEnum.erigon}>Erigon</DropdownLink> */}
                <DropdownLink to={routesEnum.geth}>Agora-el</DropdownLink>
                {/* <DropdownLink to={routesEnum.nethermind}>
                  Nethermind
                </DropdownLink> */}
              </Box>
              <Text className="my10">
                <b>Consensus clients</b>
              </Text>
              <Box pad="small">
                {/* <DropdownLink to={routesEnum.lighthouse}>
                  Lighthouse
                </DropdownLink> */}
                {/* <DropdownLink to={routesEnum.nimbus}>Nimbus</DropdownLink> */}
                <DropdownLink to={routesEnum.prysm}>Agora-cl</DropdownLink>
                {/* <DropdownLink to={routesEnum.teku}>Teku</DropdownLink> */}
              </Box>
            </Box>
          }
        />
        <Link to={routesEnum.checklistPage} className="mx10 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.checklistPage}
          >
            <FormattedMessage defaultMessage="Checklist" />
          </BarLinkText>
        </Link>
        <Link to={routesEnum.FaqPage} className="mx10 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.FaqPage}
          >
            <FormattedMessage defaultMessage="FAQ" />
          </BarLinkText>
        </Link>
        <Link to={routesEnum.topUpPage} className="mx10 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.topUpPage}
          >
            <FormattedMessage defaultMessage="Top Up" />
          </BarLinkText>
        </Link>
        {/* TODO : Hide the merge menu so we can see it when we need it. */}
        {/* <Link to={routesEnum.mergeReadiness} className="mx10 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.mergeReadiness}
          >
            <FormattedMessage defaultMessage="The Merge" />
          </BarLinkText>
        </Link> */}
      </NavBarLinks>
      <NavLinksRight>
        {!mobile && (
          <Link to={routesEnum.languagesPage} className="mx10 secondary-link">
            <Language size="20px" color={colors.blue.agoraLight} />
            <BarLinkText
              level={5}
              margin="none"
              className="bar-link-text"
              active={pathname === routesEnum.languagesPage}
            >
              <FormattedMessage defaultMessage="Languages" />
            </BarLinkText>
          </Link>
        )}
        {mobile && (
          <Link to={routesEnum.languagesPage} className="mx10">
            <Language color="black" />
          </Link>
        )}
        {mobile && (
          <ValidatorDropdown
            className="secondary-link"
            label={<Menu color="black" />}
            dropAlign={{ top: 'bottom', right: 'right' }}
            dropContent={
              <Card>
                <NetworkInfo>
                  {walletConnected && (
                    <Box className="flex flex-row mb20">
                      <Dot success={networkAllowed} error={!networkAllowed} />
                      <Text size="small" className="ml10">
                        {trimString(account as string, 10)}
                      </Text>
                    </Box>
                  )}
                  <span>
                    <FormattedMessage defaultMessage="AgoraStaking network:" />{' '}
                    <b>{consensusLayerName}</b>
                  </span>
                  <Link primary to={switchLaunchpadUrl}>
                    <FormattedMessage
                      defaultMessage="Switch to {oppositeNetwork} AgoraStaking"
                      values={{ oppositeNetwork }}
                    />
                  </Link>
                  <Text className="mt20">
                    <em>
                      <FormattedMessage defaultMessage="Visit this site on desktop to become a validator." />
                    </em>
                  </Text>
                </NetworkInfo>
                <Box pad="large" className="mt0">
                  <DropdownLink to={routesEnum.FaqPage}>
                    <FormattedMessage defaultMessage="FAQ" />
                  </DropdownLink>
                  <DropdownLink to={routesEnum.checklistPage}>
                    <FormattedMessage defaultMessage="CheckList" />
                  </DropdownLink>
                  <DropdownLink to={routesEnum.languagesPage}>
                    <FormattedMessage defaultMessage="Languages" />
                  </DropdownLink>
                  <Text className="my20">
                    <b>
                      <FormattedMessage defaultMessage="Execution clients" />
                    </b>
                  </Text>
                  <DropdownLink to={routesEnum.geth}>Agora-el</DropdownLink>
                  <Text className="my20">
                    <b>
                      <FormattedMessage defaultMessage="Consensus clients" />
                    </b>
                  </Text>
                  <DropdownLink to={routesEnum.prysm}>Agora-cl</DropdownLink>
                </Box>
              </Card>
            }
          />
        )}
        {!mobile && (
          <ValidatorDropdown
            className="secondary-link"
            label={
              <NetworkText>
                {NETWORK_NAME}
                <FormDown color={colors.lemon} />
              </NetworkText>
            }
            dropAlign={{ top: 'bottom', right: 'right' }}
            dropContent={
              <Card>
                <Box pad="small" className="mt0">
                  {!IS_MAINNET && (
                    <Text className="mb10">
                      <FormattedMessage defaultMessage="This is a test network ⚠️" />
                    </Text>
                  )}
                  <DropdownLink to={switchLaunchpadUrl}>
                    <FormattedMessage
                      defaultMessage="Switch to {oppositeNetwork} AgoraStaking"
                      values={{ oppositeNetwork }}
                    />
                  </DropdownLink>
                </Box>
              </Card>
            }
          />
        )}
        {!mobile && walletConnected && (
          <Box className="flex flex-row mr20">
            {networkAllowed && (
              <DotDropdown
                className="secondary-link"
                label={<Dot success={networkAllowed} error={!networkAllowed} />}
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <Box pad="small">
                    <Text>
                      <FormattedMessage defaultMessage="Your wallet is connected to the right network!" />
                    </Text>
                  </Box>
                }
              />
            )}
            {!networkAllowed && (
              <DotDropdown
                className="secondary-link"
                label={<Dot error={!networkAllowed} />}
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <Box pad="small">
                    <Text>
                      <FormattedMessage
                        defaultMessage="Your wallet should be set to {executionLayerName} to use this AgoraStaking."
                        values={{ executionLayerName }}
                      />
                    </Text>
                  </Box>
                }
              />
            )}
            <Text size="small" className="ml10">
              {trimString(account as string, 10)}
            </Text>
          </Box>
        )}
      </NavLinksRight>
    </RainbowBackground>
  );
};

export const AppBar = withRouter(_AppBar);
