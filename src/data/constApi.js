const constApi = {
    home: {
        index: {url: "/api/v1/Page/Index", state: "homeIndex"},
        customContent: {url: "/api/v1/Content/GetContentCustom", queryObject: {ID: ""}, state: "customContent"},
    },
    //  矿机
    mining: {
        contractPackage: {url: "/api/v1/Contract/Package", state: "packageList"},
        packageEarnInfo: {url: "/api/v1/Contract/Release", state: "packageEarnInfo"},
        buyPackage: {url: "/api/v1/Contract/PostContract", state: "buyPackage"},
        myPackageList: {url: "/api/v1/Contract/GetContractList", state: "myPackageList"},
        myOtherPackageList: {url: "/api/v1/Contract/GetContractList2", state: "myOtherPackageList"},
        pointDeductionOptions: {url: "/api/v1/Contract/GetPointDeductionOption", state: "pointDeductionOption"}
    },
    liquidity: {
        liquidityPackage: {url: "/api/v1/Contract/Package2", state: "liquidityPackage"},
        postContract2: {
            url: "/api/v1/Contract/PostContract2",
            method: "POST",
            reqBody: {
                PackageID: "",
                PointDeductionMethod: "",
                SecondPassword: "",
                Capital: "",
                CustomInt: ""
            }
        }
    },
    // 我的
    profile: {
        getProfile: {
            url: "/api/v1/Member/GetProfile",
            state: "profile"
        },
        activateCost: {
            url: "/api/v1/Member/Activate",
            state: "activateCost"
        },
        activate: {
            url: "/api/v1/Member/Activate",
            method: "PUT",
            reqBody: {
                secondPassword: ""
            }
        },
        edit: {
            url: "/api/v1/Member/PostProfile",
            method: "POST",
            reqBody: {
                FullName: "",
                Email: "",
                // MobileDialCode: "",
                // MobileNo: "",
                // DocumentNumber: "",
                // SecondPassword: "",
                EmailVerificationDigit: ""
            }
        },
        updateMobile: {
            url: "/api/v1/Member/Mobile",
            method: "PUT",
            reqBody: {
                MobileDialCode: "",
                MobileNo: "",
                SMSVerificationDigit: ""
            }
        },
        invitePosterAndQR: {
            url: "/api/v1/QRCode/GetInvitation2Base64?Code=MARS",
            state: "invitePosterAndQR"
        },
        currency: {
            url: "/api/v1/Member/UpdateCurrency",
            method: "POST",
            reqBody: {
                Currency: ""
            }
        }
    },
    // 新闻 or 资讯
    article: {
        memoList: {url: "/api/v1/Content/GetMemoList", state: "memoList"},
        // dapp 快讯
        articleList: {url: "/api/v1/Content/GetArticleList", state: "articleList"},
        memo: {url: "/api/v1/Content/GetMemo", queryObject: {id: ""}, state: "memo"}
    },
    // 团队 or 社区
    team: {
        myTeam: {
            url: '/api/v1/Member/GetMyTeam', state: "myTeam",
            queryObject: {
                MemberID: ""
            }
        },
        teamInfo: {url: '/api/v1/Team/Info', state: "temInfo"},
        coinflow_list: {
            url: 'assets/coinflow_list',
            method: 'POST'
        },
        searchUser: {
            url: '/api/v1/Member/PostMyTeam',
            method: 'POST',
            state: "searchUser",
            reqBody: {
                keyword: "",
                MemberID: ""
            }
        },
    },
    report: {
        reward: {url: "/api/v1/Report/RewardTransaction", state: "reportRewardTransaction"}
    },
    // p2p or c2c
    trade: {
        tradeList: {
            url: '/api/v1/Trade/GetTradeList',
        },
        poolBonus: {url: "/api/v1/Trade/PoolBonus", state: "PoolBonus"},
        tradeBuy: {
            url: '/api/v1/Trade/PostItem',
            method: 'POST',
            reqBody: {
                Point: "",
                Price: "",
                PaymentWechat: "",
                PaymentAliPay: "",
                PaymentWallet: "",
                PaymentBank: "",
                SecondPassword: "",
            }
        },
        tradeDetail: {
            url: '/api/v1/Trade/GetTrade',
            queryObject: {
                ID: ""
            }
        },
        updateTrade: {
            url: '/api/v1/Trade/UpdateTrade',
            method: 'POST',
            reqBody: {
                TransactionID: "",
                Status: "",
                ComplainID: "",
                SecondPassword: "",
            }
        },
        winner: {
            url: "/api/v1/Trade/Winner",
            state: "tradeWinner"
        }
    },
    wallet: {
        transfer2: {
            url: '/api/v1/Point/Transfer2',
            method: 'POST',
            reqBody: {
                A10WalletAddress: "",
                Amount: "",
                SecondPassword: "",
                TransferPointType: ""
            }
        },
        deposit: {
            a10Address: {url: "/api/v1/Crypto/a10/WalletAddress", state: "a10Address"},
            btcAddress: {url: "/api/v1/Crypto/btc/DepositAddress", state: "btcAddress"}
        },
        withdrawCoin: {
            url: "/api/v1/Point/Withdraw",
            method: "POST",
            reqBody: {
                WithdrawalMethod: "",
                WithdrawAmount: "",
                WalletAddress: "",
                PointType: "",
                EmailVerificationDigit: "",
                SecondPassword:"",
                ContractAddress:""
            }
        },
        updateWallet:{
            url:"/api/v1/Member/UpdateWalletAddress",
            method:"POST",
            reqBody:{
                WalletAddress:""
            }
        },
        buyCoin:{
            url:"/api/v1/Pay/Item",
            method:"POST",
            reqBody:{
                Amount:"",
                WalletType:"",
                FiatCurrency:""
            }
        }
    },
    // 投票
    vote: {
        list: {url: '/api/v1/Vote/List', state: "voteList"},
        info: {url: '/api/v1/Vote/Info', state: "voteInfo"},
        history: {url: '/api/v1/Vote/HistoryList', state: "voteHistory"},
        voteItem: {
            url: '/api/v1/Vote/Item',
            method: 'POST',
            reqBody: {
                Point: "",
                Direction: "",
                SecondPassword: ""
            }
        },
    },
    // 其他
    common: {
        countryList: {url: "/api/v1/System/CountryList", state: "countryList"}
    },
    system: {
        systemVersion: {url: "/api/v1/System/GetSystemVersion", state: "systemVersion"}
    },
    market: {
        watchList: {
            url: "/api/v1/Market/GetWatchListDetails?ListID=200502", state: "watchList"
        },
        horizontalWatchList: {
            url: "/api/v1/Market/GetWatchListDetails?ListID=200503", state: "horizontalWatchList"
        }
    },
    dapp: {
        dappList: {
            url: "/api/v1/Content/CustomList?MainType=11", state: "dappList"
        },
    },
    invite: {
        earning: {url: "/api/v1/Report/Earning", state: "inviteEarning"}
    },
    inbox: {
        messageList: {url: "/api/v1/Inbox/MessageList", state: "messageList"},
        MessageItem: {
            url: "/api/v1/Inbox/MessageItem",
            queryObject: {
                MessageID: ""
            },
            state: "MessageItem"
        },
        MessageStatus: {url: "/api/v1/Inbox/MessageList", method: "PUT"},
    },
    gift:{
        claim:{
            url:'/api/v1/Gift/Item',
            method:'POST'
        }
    }
};

export default constApi;
