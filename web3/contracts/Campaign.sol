// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Campaign {
    
    mapping(address => uint) public contributors;
    
    address public manager;
    string public campaignTitle;
    string public campaignDescription;
    uint public campaignGoal;
    uint public contributorsCount;
    uint public raisedFunding; // saves funding amount after withdrawal or refund
    uint public deadline;
    
    modifier onlyManger(){
        require(msg.sender==manager,"Only manager can call this function");
        _;
    }

    constructor(uint _campaignGoal, address _creator, string memory _title, string memory _description, uint _deadline) {
        manager = _creator;
        campaignTitle = _title;
        campaignDescription = _description;
        campaignGoal = _campaignGoal;
        contributorsCount = 0;
        raisedFunding = 0;
        deadline = _deadline;
    }

    function contribute() public payable {
        require(block.timestamp < deadline, "Deadline has expired. Campaign closed for contribution!");
        require(msg.sender != manager, "You can't contribute in your own campaign!");
        require(contributors[msg.sender] == 0, "You can contribute only once!");

        contributorsCount++;
        contributors[msg.sender] = msg.value;
        raisedFunding = raisedFunding + msg.value;      
    }

    function withdraw() public payable onlyManger {
        require(block.timestamp >= deadline, "Campaign has not reached the deadline!");
        require(raisedFunding >= campaignGoal, "Campaign has not reached the goal!");
        require(address(this).balance > 0, "Campaign balance is equal to 0!");

        payable(msg.sender).transfer(address(this).balance);
    }
    
    function refund() public payable {
        require(block.timestamp >= deadline, "Campaign has not reached the deadline!");
        require(raisedFunding < campaignGoal, "Campaign reached the goal. Refund is not possible!");
        require(contributors[msg.sender] > 0, "You have not contributed into the campaign!");
        require(address(this).balance > 0, "Campaign balance is equal to 0!");

        uint refundAmount = contributors[msg.sender];
        contributors[msg.sender] = 0;
        payable(msg.sender).transfer(refundAmount);
    }

    function getCampaignStatus() public view returns(string memory) {
        if (block.timestamp < deadline) {
            return "Opened";
        } else if (block.timestamp >= deadline && raisedFunding >= campaignGoal) {
            return "Succeeded";
        } else if (block.timestamp >= deadline && raisedFunding < campaignGoal) {
            return "Failed";
        } else {
            return "Undefined";
        }
    }

    function getCampaignSummary() public view returns(uint, address, string memory, string memory, uint, uint, uint, uint, uint, string memory) {
        return (
            address(this).balance,
            manager,
            campaignTitle,
            campaignDescription,
            campaignGoal,
            contributorsCount,
            raisedFunding,
            deadline,
            block.timestamp,
            getCampaignStatus()
        );
    }
}
