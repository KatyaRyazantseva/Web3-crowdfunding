import Campaign from "../build/Campaign.json";
import { web3 } from "../../utils/web3";

/**
 * Creates and instance of a deployed campaign contract
 * @param contractAddress
 * @returns {Contract}
 */
const getCampaignInstance = async (contractAddress) => {
  const campaignInstance = await new web3.eth.Contract(Campaign.abi, contractAddress);
  return campaignInstance;
} 

export default getCampaignInstance;
