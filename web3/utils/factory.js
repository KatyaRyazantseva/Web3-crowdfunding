import CampaignFactory from "../build/CampaignFactory.json";
import { web3 } from "../../utils/web3";

/**
 * Creates an instance of a deployed factory contract
 * @returns {Contract}
 */
 const getFactoryInstance = () =>
 new web3.eth.Contract(
   CampaignFactory.abi,
  "0x18F2bd0eB9FAEf362c07b01A3314D3c20973b95d"
 );

export default getFactoryInstance;
