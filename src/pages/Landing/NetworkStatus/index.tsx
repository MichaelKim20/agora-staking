import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Button } from '../../../components/Button';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import { BEACONCHAIN_URL, TICKER_NAME } from '../../../utils/envVars';
import calculateStakingRewards from '../../../utils/calculateStakingRewards';
import { backgroundColors } from '../../../styles/styledComponentsTheme';

//
// Styled Components

const Container = styled.div`
  background-color: ${p => p.theme.gray.lightest};
  position: relative;
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? '64px 0' : '124px 0')};
`;
const Content = styled.div`
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? '0 20px' : '0 60px'};
  }
`;

const BoldBlue = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.blue.agoraBlue};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;

const Card = styled.div`
  padding: 24px;
  //border: 1px solid ${p => p.theme.gray.dark};
  //border-radius: 4px;
  width: 100%;
  margin: 16px;
  background: ${backgroundColors.sectionGray};
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

type PropData = {
  amountEth: number;
  totalValidators: number;
  epochNum: number;
  status: number;
};

//
// Main Component

export const NetworkStatus: React.FC<{
  state: PropData;
}> = ({ state }): JSX.Element | null => {
  const { formatMessage } = useIntl();
  const [m, setM] = React.useState<boolean>((window as any).mobileCheck());
  const { amountEth, totalValidators, epochNum, status } = state;

  React.useEffect(() => {
    const resizeListener = () => {
      setM((window as any).mobileCheck());
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const currentAPR = calculateStakingRewards({
    totalAtStake: amountEth,
    epochNum: epochNum,
  });
  const formattedAPR = (Math.round(currentAPR * 1000) / 10).toLocaleString();

  const LoadingHandler: React.FC<{
    value?: string;
  }> = ({ value }): JSX.Element => {
    if (status === 200) {
      return <span>{value}</span>;
    }
    if (status === 500) {
      return <FormattedMessage defaultMessage="Loading error" />;
    }
    return <FormattedMessage defaultMessage="Loading..." />;
  };

  return (
    <Container isMobile={m}>
      <ScrollAnimation delay={750} animateIn="fadeIn" animateOnce>
        <Content isMobile={m}>
          <Heading level={2} size="medium" className="mb40">
            <FormattedMessage defaultMessage="The Agora Chain" />
          </Heading>
          <CardContainer>
            <Card>
              <Heading level={4} size="medium" margin="none">
                <FormattedMessage
                  defaultMessage="Total {TICKER_NAME} staked"
                  values={{ TICKER_NAME }}
                />
              </Heading>
              <Text size="x-large" className="mt20">
                <BoldBlue className="mr10" fontSize={25}>
                  <LoadingHandler
                    value={`${numberWithCommas(amountEth)} ${TICKER_NAME}`}
                  />
                </BoldBlue>
              </Text>
            </Card>
            <Card>
              <Heading level={4} size="medium" margin="none">
                <FormattedMessage defaultMessage="Total validators" />
              </Heading>
              <Text size="x-large" className="mt20">
                <BoldBlue className="mr10" fontSize={25}>
                  <LoadingHandler value={numberWithCommas(totalValidators)} />
                </BoldBlue>
              </Text>
            </Card>
            <Card>
              <Heading level={4} size="medium" margin="none">
                <FormattedMessage
                  defaultMessage="Current APR"
                  description="APR refers to Annual Percentage Rate"
                />
              </Heading>
              <Text size="x-large" className="mt20">
                <BoldBlue className="mr10" fontSize={25}>
                  {formattedAPR}%
                </BoldBlue>
              </Text>
            </Card>
          </CardContainer>
          <ButtonContainer className="pt40">
            <Link isTextLink={false} to={BEACONCHAIN_URL}>
              <Button
                fullWidth
                rainbow
                width={m ? undefined : 400}
                label={formatMessage({ defaultMessage: 'More stats' })}
              />
            </Link>
          </ButtonContainer>
        </Content>
      </ScrollAnimation>
    </Container>
  );
};
