export const IS_MAINNET                 = Boolean(process.env.REACT_APP_IS_MAINNET !== 'false');  // If REACT_APP_IS_MAINNET is unset, set it to true by default
export const TESTNET_AGORA_STAKING_NAME     = process.env.REACT_APP_TESTNET_AGORA_STAKING_NAME || 'Testnet';
export const EL_TESTNET_NAME            = process.env.REACT_APP_EL_TESTNET_NAME || 'Localtestnet';

// private vars (or derived from)
export const PORTIS_DAPP_ID             = process.env.REACT_APP_PORTIS_DAPP_ID     || '';
export const INFURA_PROJECT_ID          = process.env.REACT_APP_INFURA_PROJECT_ID  || '';
export const ENABLE_RPC_FEATURES        = Boolean(INFURA_PROJECT_ID && INFURA_PROJECT_ID !== '');
export const INFURA_URL                 = `https://${IS_MAINNET ? "mainnet.bosaogra.org" : "testnet.bosagora.org"}`;

// public
export const NETWORK_NAME               = IS_MAINNET ? 'Mainnet' : TESTNET_AGORA_STAKING_NAME;
export const TICKER_NAME                = IS_MAINNET ? 'BOA' : 'tBOA';
export const ETHERSCAN_URL              = IS_MAINNET ? 'https://boascan.io' : 'https://testnet.boascan.io';
export const BEACONSCAN_URL             = IS_MAINNET ? 'https://agorascan.io/validator' : `https://testnet.agorascan.io/validator`;
export const BEACONCHAIN_URL            = process.env.REACT_APP_BEACONCHAIN_URL || `https://${NETWORK_NAME.toLowerCase()}.beaconcha.in`;
export const FORTMATIC_KEY              = process.env.REACT_APP_FORTMATIC_KEY       || 'pk_test_D113D979E0D3508F';
export const CONTRACT_ADDRESS           = process.env.REACT_APP_CONTRACT_ADDRESS    || '0x00000000219ab540356cBB839Cbe05303d7705Fa';
export const MIN_DEPOSIT_CLI_VERSION    = process.env.REACT_APP_MIN_DEPOSIT_CLI_VERSION  || '1.0.0';
export const LIGHTHOUSE_INSTALLATION_URL = process.env.REACT_APP_LIGHTHOUSE_INSTALLATION_URL || 'https://lighthouse-book.sigmaprime.io/';
export const NIMBUS_INSTALLATION_URL    = process.env.REACT_APP_NIMBUS_INSTALLATION_URL  || 'https://nimbus.guide/intro.html';
export const PRYSM_INSTALLATION_URL     = process.env.REACT_APP_PRYSM_INSTALLATION_URL   || 'https://docs.bosagora.org/en/validator-start/install-an-agora-node/agora-cl';
export const TEKU_INSTALLATION_URL      = process.env.REACT_APP_TEKU_INSTALLATION_URL    || 'https://docs.teku.pegasys.tech/en/latest/HowTo/Get-Started/Build-From-Source/';
export const MAINNET_AGORA_STAKING_URL      = 'https://agora-staking.bosagora.org';
export const TESTNET_AGORA_STAKING_URL      = 'https://testnet-agora-staking.bosagora.org';
export const FAUCET_URL                 = process.env.REACT_APP_FAUCET_URL || 'https://faucet.bosagora.org';
export const TUTORIAL_URL               = process.env.REACT_APP_TUTORIAL_URL || null;

if(process.env.REACT_APP_ETH_REQUIREMENT && Number.isNaN(Number(process.env.REACT_APP_ETH_REQUIREMENT))) {
    throw new Error("REACT_APP_ETH_REQUIREMENT must be of type: number")
}
export const ETH_REQUIREMENT            = process.env.REACT_APP_ETH_REQUIREMENT     || 655_360_000;

// ETH_DEPOSIT_OFFSET is added to the balance of the deposit contract to account for testnet deposit-contracts that allow some number of free deposit
if(process.env.REACT_APP_ETH_DEPOSIT_OFFSET && Number.isNaN(Number(process.env.REACT_APP_ETH_DEPOSIT_OFFSET))) {
    throw new Error("REACT_APP_ETH_DEPOSIT_OFFSET must be of type: number")
}
export const ETH_DEPOSIT_OFFSET = Number(process.env.REACT_APP_ETH_DEPOSIT_OFFSET) * Number(!IS_MAINNET) || 0;

let forkVersion = Buffer.from('00000000', 'hex')
if(typeof process.env.REACT_APP_GENESIS_FORK_VERSION === 'string'){
    forkVersion = Buffer.from(process.env.REACT_APP_GENESIS_FORK_VERSION.replace(/0x/g, ''), 'hex');
}
export const GENESIS_FORK_VERSION = forkVersion;


if(process.env.REACT_APP_PRICE_PER_VALIDATOR && Number.isNaN(Number(process.env.REACT_APP_PRICE_PER_VALIDATOR))) {
    throw new Error("REACT_APP_PRICE_PER_VALIDATOR must be of type: number")
}
export const PRICE_PER_VALIDATOR        = process.env.REACT_APP_PRICE_PER_VALIDATOR || 40_000;

if(process.env.REACT_APP_EJECTION_PRICE && Number.isNaN(Number(process.env.REACT_APP_EJECTION_PRICE))) {
    throw new Error("REACT_APP_EJECTION_PRICE must be of type: number")
}
export const EJECTION_PRICE             = process.env.REACT_APP_EJECTION_PRICE || 20_000;

// BLS signature verification variables
export const ETHER_TO_GWEI              = 1e9;
export const MIN_DEPOSIT_AMOUNT         = 1 * ETHER_TO_GWEI;
export const DOMAIN_DEPOSIT             = Buffer.from('03000000', 'hex');
export const EMPTY_ROOT                 = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');
