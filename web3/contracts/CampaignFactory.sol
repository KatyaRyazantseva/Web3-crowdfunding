// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;
 

    function createCampaign(uint _campaignGoal, address _creator, string memory _title, string memory _description, uint _period) public {
        Campaign NewCampaign = new Campaign(_campaignGoal, _creator, _title, _description, _period);
        deployedCampaigns.push(address(NewCampaign));
        
    }

    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}

