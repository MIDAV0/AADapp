// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Store {


    struct Article {
        uint id;
        address owner;
    }

    struct ArticleInfo {
        uint uid;
        uint price;
        bytes32 title;
        address creator;
    }

    mapping(bytes32 => Article) public ownedArticles;
    mapping(uint => ArticleInfo) public articles;
    mapping(address => uint) public royalties;
    

    uint public totalOwnedArticles;

    address public owner;

    constructor() {
        owner = msg.sender;
        totalOwnedArticles = 0;
    }

    function purchaseArticle(uint articleId) external payable {
        bytes32 articleHash = keccak256(abi.encodePacked(articleId, msg.sender));
        // Check ownership
        require(articles[articleId].creator != address(0), "Article does not exist");
        require(ownedArticles[articleHash].owner != msg.sender, "You already purchased this article");
        require(msg.value >= articles[articleId].price, "Incorrect price");
        uint id = totalOwnedArticles++;
        ownedArticles[articleHash] = Article(
            id, 
            msg.sender);
        royalties[articles[articleId].creator] += msg.value;
    }

    function createArticle(uint uid, uint _price, bytes32 _title) external {
        require(articles[uid].creator == address(0), "Article with this uid already exists");
        articles[uid] = ArticleInfo(
            uid,
            _price,
            _title,
            msg.sender
        );
    }

    function withdraw() external {
        require(royalties[msg.sender] > 0, "No royalties to withdraw");
        payable(msg.sender).transfer(royalties[msg.sender]);
    }

    function getArticle(uint uid) external view returns(ArticleInfo memory) {
        return articles[uid];
    }

    function getOwnedArticle(uint articleId) external view returns(address) {
        bytes32 articleHash = keccak256(abi.encodePacked(articleId, msg.sender));
        return ownedArticles[articleHash].owner;
    }
}