﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using SimpleJSON;
using System.Text;
using UnityEngine.SceneManagement;

public class GamePlayButtons : MonoBehaviour {

	public Button collectFundsButton;
	public Button pollProvinceButton;
	public Button campaignButton;

    public GameObject loadScreen;
    public GameObject loadText;

    public GameObject weeksPanel;
    public Text weeksLeftPanelText;
    public Text actionsLeftText;
    public Button closeweeksPanel;

    public Button closeExtraInfPanel;
    public Text extraInfoPanelText;
    public GameObject containerPanel;

    public static string finalScore;
	public int actionCount; 

    public string campaignType;
    public string campaignIssue;

    public Button afterGameLdbBut;
    public GameObject afterGameLdbButObject;

    public GameObject errorBox;
    public Text errorMessage;
    public Button closeError;

    public Button creditsOpen;
    public Button creditsClose;
    public GameObject credits;

    public GameObject campaignTopics;
    public GameObject campaignTypes;

    public Button closecampaignTopics;
    public Button closecampaignTypes;

    public Button Issue1;
    public Button Issue2;
    public Button Issue3;
    public Button Issue4;
    public Button Issue5;
    public Button Issue6;
    public Button Issue7;
    public Button Issue8;
    public Button Issue9;
    public Button Issue10;

    public Button campaignType1;
    public Button campaignType2;
    public Button campaignType3;

    public Text campaignType1T;
    public Text campaignType2T;
    public Text campaignType3T;

    public Text Issue1Text;
    public Text Issue2Text;
    public Text Issue3Text;
    public Text Issue4Text;
    public Text Issue5Text;
    public Text Issue6Text;
    public Text Issue7Text;
    public Text Issue8Text;
    public Text Issue9Text;
    public Text Issue10Text;


    public Button endTurnButton;
	public Text endTurnText;
	public Text AI1Action;
	public Text AI2Action;
	public Text AI3Action;
	public Text AI4Action;
	public Text AI1Name;
	public Text AI2Name;
	public Text AI3Name;
	public Text AI4Name;

	public Text userName;

    public Text Score;
	public int weeks;

    public Text collectFundsText;
	public Text pollProvinceText;
	public Text campaignText;

	public Animator pollProvinceTextAnim;
	public Animator collectFundsTextAnim;
	public Animator campaignTextAnim;

	private WWW www;
	private WWW www2;
	private WWW www3;
	private WWW www4;
	private WWW www5;
	private WWW www6;
	private WWW www7;
	private WWW www8;
	private WWW www9;
	public Text userFunds;
	public Text userSupport;

	public Image NCcoin;
	public Animator NCcoinAnim;

	public Image WCcoin;
	public Animator WCcoinAnim;

	public Image ECcoin;
	public Animator ECcoinAnim;

	public Image GPcoin;
	public Animator GPcoinAnim;

	public Image KZNcoin;
	public Animator KZNcoinAnim;

	public Image  LPcoin;
	public Animator LPcoinAnim;

	public Image MPcoin;
	public Animator MPcoinAnim;

	public Image NWcoin;
	public Animator NWcoinAnim;

	public Image FScoin;
	public Animator FScoinAnim;

	public Image NCmanpower;
	public Animator NCmanAnim;

	public Image WCmanpower;
	public Animator WCmanAnim;

	public Image ECmanpower;
	public Animator ECmanAnim;

	public Image GPmanpower;
	public Animator GPmanAnim;

	public Image KZNmanpower;
	public Animator KZNmanAnim;

	public Image LPmanpower;
	public Animator LPmanAnim;

	public Image MPmanpower;
	public Animator MPmanAnim;

	public Image NWmanpower;
	public Animator NWmanAnim;

	public Image FSmanpower;
	public Animator FSmanAnim;

	public Text NCmanp;
	public Text WCmanp;
	public Text ECmanp;
	public Text GPmanp;
	public Text KZNmanp;
	public Text LPmanp;
	public Text MPmanp;
	public Text NWmanp;
	public Text FSmanp;

    public Text infoPanelText;
    public Text infoPanelHeadingText;
    public GameObject infoPanel;
    public Animator infoPanelAnim;

    int ncCoinHash = Animator.StringToHash("NC_CoinAnimation");
	int ncManPowerHash = Animator.StringToHash("NC_ManPowerAnimation");

	int wcCoinHash = Animator.StringToHash("WC_CoinAnimation");
	int wcManPowerHash = Animator.StringToHash("WC_ManPowerAnimation");

	int ecCoinHash = Animator.StringToHash("EC_CoinAnimation");
	int ecManPowerHash = Animator.StringToHash("EC_ManPowerAnimation");

	int gpCoinHash = Animator.StringToHash("GP_CoinAnimation");
	int gpManPowerHash = Animator.StringToHash("GP_ManPowerAnimation");

	int kznCoinHash = Animator.StringToHash("KZN_CoinAnimation");
	int kznManPowerHash = Animator.StringToHash("KZN_ManPowerAnimation");

	int mpCoinHash = Animator.StringToHash("MP_CoinAnimation");
	int mpManPowerHash = Animator.StringToHash("MP_ManPowerAnimation");

	int lpCoinHash = Animator.StringToHash("LP_CoinAnimation");
	int lpManPowerHash = Animator.StringToHash("LP_ManPowerAnimation");

	int nwCoinHash = Animator.StringToHash("NW_CoinAnimation");
	int nwManPowerHash = Animator.StringToHash("NW_ManPowerAnimation");

	int fsCoinHash = Animator.StringToHash("FS_CoinAnimation");
	int fsManPowerHash = Animator.StringToHash("FS_ManPowerAnimation");

	int pollProvinceTextHash = Animator.StringToHash("PollTextAnimation");
	int collectFundsTextHash = Animator.StringToHash("CollectFundsTextAnimation");
	int campaignTextHash = Animator.StringToHash("CampaignTextAnimation");

    int infoPanelHash = Animator.StringToHash("InformationPanel");
    int infoPanelPollHash = Animator.StringToHash("InformationPanelPoll");

    string fundsVal;
    string manPowerVal;

    // Use this for initialization
    void Start () {

       loadScreen.SetActive(false);
       loadText.SetActive(false);

        weeksPanel.SetActive(false);

        containerPanel.SetActive(true);

        Button closeExtraInfPanelbtn = closeExtraInfPanel.GetComponent<Button>();
        closeExtraInfPanelbtn.onClick.AddListener(closeExtraInfPanelFun);

        print ("newGameJson: " + IssuesStancesSelection.newGameJson);

		// Set new game variables
		var jsonObj = JSON.Parse(IssuesStancesSelection.newGameJson);
        //print("userName: " + jsonObj["Username"].Value.ToString());
        userName.text = jsonObj["Username"].Value.ToString();
        userFunds.text = jsonObj["Funds"].Value.ToString();
        userSupport.text = jsonObj["TotalSupport"].Value.ToString();
        endTurnText.text = jsonObj["Weeks"].Value.ToString();
        weeks = int.Parse(jsonObj["Weeks"].Value);

        //userSupportCurrent = int.Parse(jsonObj["TotalSupport"].Value);
        //userFundsCurrent = int.Parse(jsonObj["Funds"].Value);

        AI1Name.text = jsonObj["AI1"].Value.ToString();
        AI2Name.text = jsonObj["AI2"].Value.ToString();
        AI3Name.text = jsonObj["AI3"].Value.ToString();
        AI4Name.text = jsonObj["AI4"].Value.ToString();


        AI1Name.text += ":";
        AI2Name.text += ":";
        AI3Name.text += ":";
        AI4Name.text += ":";

        actionCount = 0;
		actionsLeftText.text = " 3";

        campaignType = "";
        campaignIssue = "";

        campaignType1T.text = "Telemarketing";
        campaignType2T.text = "Rally";
        campaignType3T.text = "Social Media";

        campaignTopics.SetActive(false);
        campaignTypes.SetActive(false);

        NCcoin.enabled = false;
		NCmanpower.enabled = false;

		WCcoin.enabled = false;
		WCmanpower.enabled = false;

		ECcoin.enabled = false;
		ECmanpower.enabled = false;

		GPcoin.enabled = false;
		GPmanpower.enabled = false;

		KZNcoin.enabled = false;
		KZNmanpower.enabled = false;

		LPcoin.enabled = false;
		LPmanpower.enabled = false;

		MPcoin.enabled = false;
		MPmanpower.enabled = false;

		NWcoin.enabled = false;
		NWmanpower.enabled = false;

		FScoin.enabled = false;
		FSmanpower.enabled = false;

        infoPanel.SetActive(false);

        infoPanelAnim = infoPanel.GetComponent<Animator>();

        NCcoinAnim = NCcoin.GetComponent<Animator>();
		NCmanAnim = NCmanpower.GetComponent<Animator>();

		WCcoinAnim = WCcoin.GetComponent<Animator>();
		WCmanAnim = WCmanpower.GetComponent<Animator>();

		ECcoinAnim = ECcoin.GetComponent<Animator>();
		ECmanAnim = ECmanpower.GetComponent<Animator>();

		GPcoinAnim = GPcoin.GetComponent<Animator>();
		GPmanAnim = GPmanpower.GetComponent<Animator>();

		KZNcoinAnim = KZNcoin.GetComponent<Animator>();
		KZNmanAnim = KZNmanpower.GetComponent<Animator>();

		MPcoinAnim = MPcoin.GetComponent<Animator>();
		MPmanAnim = MPmanpower.GetComponent<Animator>();

		LPcoinAnim = LPcoin.GetComponent<Animator>();
		LPmanAnim = LPmanpower.GetComponent<Animator>();

		NWcoinAnim = NWcoin.GetComponent<Animator>();
		NWmanAnim = NWmanpower.GetComponent<Animator>();

		FScoinAnim = FScoin.GetComponent<Animator>();
		FSmanAnim = FSmanpower.GetComponent<Animator>();

		pollProvinceTextAnim = pollProvinceText.GetComponent<Animator>();
		collectFundsTextAnim = collectFundsText.GetComponent<Animator>();
		campaignTextAnim = campaignText.GetComponent<Animator>();

		Button btn1 = collectFundsButton.GetComponent<Button>();
		btn1.onClick.AddListener(collectFunds);

		Button btn2 = pollProvinceButton.GetComponent<Button>();
		btn2.onClick.AddListener(pollProvince);

		Button btn3 = campaignButton.GetComponent<Button>();
		btn3.onClick.AddListener(campaign);

		Button btn4 = endTurnButton.GetComponent<Button>();
		btn4.onClick.AddListener(endTurn);
        errorBox.SetActive(false);

        Button closeErrorbtn = closeError.GetComponent<Button>();
        closeErrorbtn.onClick.AddListener(closeErrorFun);
        

        Button closeweeksPanelbtn = closeweeksPanel.GetComponent<Button>();
        closeweeksPanelbtn.onClick.AddListener(closeweeksPanelFun);

        credits.SetActive(false);

        Button closecreditbtn = creditsClose.GetComponent<Button>();
        closecreditbtn.onClick.AddListener(closeCredits);

        Button opencreditbtn = creditsOpen.GetComponent<Button>();
        opencreditbtn.onClick.AddListener(openCredits);

        

        Button issue1 = Issue1.GetComponent<Button>();
		issue1.onClick.RemoveAllListeners();
        issue1.onClick.AddListener(issue1Campaign);

        Button issue2 = Issue2.GetComponent<Button>();
		issue2.onClick.RemoveAllListeners();
        issue2.onClick.AddListener(issue2Campaign);

        Button issue3 = Issue3.GetComponent<Button>();
		issue3.onClick.RemoveAllListeners();
        issue3.onClick.AddListener(issue3Campaign);

        Button issue4 = Issue4.GetComponent<Button>();
		issue4.onClick.RemoveAllListeners();
        issue4.onClick.AddListener(issue4Campaign);

        Button issue5 = Issue5.GetComponent<Button>();
		issue5.onClick.RemoveAllListeners();
        issue5.onClick.AddListener(issue5Campaign);

        Button issue6 = Issue6.GetComponent<Button>();
		issue6.onClick.RemoveAllListeners();
        issue6.onClick.AddListener(issue6Campaign);

        Button issue7 = Issue7.GetComponent<Button>();
		issue7.onClick.RemoveAllListeners();
        issue7.onClick.AddListener(issue7Campaign);

        Button issue8 = Issue8.GetComponent<Button>();
		issue8.onClick.RemoveAllListeners();
        issue8.onClick.AddListener(issue8Campaign);

        Button issue9 = Issue9.GetComponent<Button>();
		issue9.onClick.RemoveAllListeners();
        issue9.onClick.AddListener(issue9Campaign);

        Button issue10 = Issue10.GetComponent<Button>();
		issue10.onClick.RemoveAllListeners();
        issue10.onClick.AddListener(issue10Campaign);

        Button ct1 = campaignType1.GetComponent<Button>();
        ct1.onClick.AddListener(CampaignType1);

        Button ct2 = campaignType2.GetComponent<Button>();
        ct2.onClick.AddListener(CampaignType2);

        Button ct3 = campaignType3.GetComponent<Button>();
        ct3.onClick.AddListener(CampaignType3);

        Issue1Text.text = IssuesSelection.selectedIssues [0].ToString ();
		Issue2Text.text = IssuesSelection.selectedIssues [1].ToString ();
		Issue3Text.text = IssuesSelection.selectedIssues [2].ToString ();
		Issue4Text.text = IssuesSelection.selectedIssues [3].ToString ();
		Issue5Text.text = IssuesSelection.selectedIssues [4].ToString ();
		Issue6Text.text = IssuesSelection.selectedIssues [5].ToString ();
		Issue7Text.text = IssuesSelection.selectedIssues [6].ToString ();
		Issue8Text.text = IssuesSelection.selectedIssues [7].ToString ();
		Issue9Text.text = IssuesSelection.selectedIssues [8].ToString ();
		Issue10Text.text = IssuesSelection.selectedIssues [9].ToString ();

        Button closecampaigntopics = closecampaignTopics.GetComponent<Button>();
        closecampaigntopics.onClick.AddListener(closeTopics);

        Button closecampaigntype = closecampaignTypes.GetComponent<Button>();
        closecampaigntype.onClick.AddListener(closeCTypes);

        Button afterGameldb = afterGameLdbBut.GetComponent<Button>();
        afterGameldb.onClick.AddListener(LeaderBoard);

        //afterGameLdbBut.interactable = false;
        afterGameLdbButObject.SetActive(false);



        //getScore();
		fetchManpower ();
		fundsUpdate ();
       
    }
    void closeErrorFun()
    {
        errorBox.SetActive(false);
    }

    void closeTopics()
    {
        campaignTopics.SetActive(false);
    }

    void closeCTypes()
    {
       campaignTypes.SetActive(false);
    }

    void closeCredits()
    {
        credits.SetActive(false);
    }

    void openCredits()
    {
        credits.SetActive(true);
    }

    void getScore()
    {
        getScoreHelp();
        string url = "http://localhost:3000/api/getScore";

		var requestString = "{\"access_token\":\"" + NewGame.access_token + "\"}";

        byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

		WWWForm form = new WWWForm();
		var headers = form.headers;
		headers["Content-Type"] = "application/json";

		www = new WWW(url, pData, headers);
        StartCoroutine(getScoreHelp());
    }

    IEnumerator getScoreHelp()
	{
		yield return www;
		if (!string.IsNullOrEmpty(www.error))
		{
			print ("getScoreError: "+ www.error);
			errorMessage.text = www.error;
            errorBox.SetActive(true);
        }
		else
		{
			/*
			while(!www.isDone)
			{
			}
			*/
			var jsonObj = JSON.Parse(www.text);
           	Score.text = jsonObj["score"].Value.ToString(); 
        }
	}

    void closeExtraInfPanelFun()
    {
        containerPanel.SetActive(false);
    }

    void closeweeksPanelFun()
    {
         weeksPanel.SetActive(false);
    }

    void collectFunds()
	{
		print("You have clicked on the collect funds button");

		if (ProvincesButtons.provinceName == null)
		{
            errorMessage.text = "Please select a province to collect funds from";
            errorBox.SetActive(true);
        }
		else
		{
			// Get collected funds for selected province and AI actions
			provinceCollect();
			string url = "http://localhost:3000/api/collectFunds";
            
			var requestString = "{\"access_token\":\"" + NewGame.access_token + "\",\"province\":\"" + ProvincesButtons.provinceName.ToString() + "\"}";

			print ("collectFunds string: " + requestString);

			byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

			WWWForm formColl = new WWWForm();
			var headersColl = formColl.headers;
			headersColl["Content-Type"] = "application/json";

			www2 = new WWW(url, pData, headersColl);
			StartCoroutine(provinceCollect());


			collectFundsText.text = "-$";
			collectFundsTextAnim.Play(collectFundsTextHash, -1, 0f);

			if (ProvincesButtons.provinceName == "northcape")
			{
				NCcoin.enabled = true;
				NCcoinAnim.Play(ncCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "westcape")
			{
				WCcoin.enabled = true;
				WCcoinAnim.Play(wcCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "eastcape")
			{
				ECcoin.enabled = true;
				ECcoinAnim.Play(ecCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "gauteng")
			{
				GPcoin.enabled = true;
				GPcoinAnim.Play(gpCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "mpumalanga")
			{
				MPcoin.enabled = true;
				MPcoinAnim.Play(mpCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "limpopo")
			{
				LPcoin.enabled = true;
				LPcoinAnim.Play(lpCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "NW")
			{
				NWcoin.enabled = true;
				NWcoinAnim.Play(nwCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "kwazulunatal")
			{
				KZNcoin.enabled = true;
				KZNcoinAnim.Play(kznCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "freestate")
			{
				FScoin.enabled = true;
				FScoinAnim.Play(fsCoinHash, -1, 0f);
			}

            infoPanel.SetActive(true);
            infoPanelAnim.Play(infoPanelHash, -1, 0f);
            infoPanelHeadingText.text = ProvincesButtons.provinceName;


        }
	}

	IEnumerator provinceCollect()
	{
		yield return www2;
		if (!string.IsNullOrEmpty(www2.error))
		{
			errorMessage.text = www2.error;
            errorBox.SetActive(true);

        }
		else
		{
			print ("collect: " + www2.text);
			var jsonObj = JSON.Parse(www2.text);

			
			checkActionCount ();
			if (jsonObj ["success"] == 2) {
				infoPanelText.text = "Insufficient manpower";
			} else {
				
			AI1Action.text = jsonObj["AI1Move"].Value.ToString();
			AI2Action.text = jsonObj["AI2Move"].Value.ToString();
			AI3Action.text = jsonObj["AI3Move"].Value.ToString();
			AI4Action.text = jsonObj["AI4Move"].Value.ToString();
			infoPanelText.text = "You have collected " + jsonObj["funds"].Value.ToString() + " funds";


			
				//fundsUpdate ();

			
            //int fundsVal = int.Parse(jsonObj["funds"].Value);

            //userFundsCurrent += fundsVal;
            //userFunds.text = userFundsCurrent.ToString();
			}
			}
	}

	void fundsUpdate() {
		// Update user's total funds.
		updateFunds();
		string url2 = "http://localhost:3000/api/getFunds";

		var requestString2 = "{\"access_token\":\"" + NewGame.access_token + "\"}";

		byte[] pData2 = Encoding.ASCII.GetBytes(requestString2.ToCharArray());

		WWWForm form = new WWWForm();
		var headers = form.headers;
		headers["Content-Type"] = "application/json";

		www3 = new WWW(url2, pData2, headers);
		StartCoroutine(updateFunds());
	}
     
	IEnumerator updateFunds()
	{
		yield return www3;
		if (!string.IsNullOrEmpty(www3.error))
		{
			errorMessage.text = www3.error;
            errorBox.SetActive(true);

			print("updateFundsError: " + www3.error);
            //print(www.error);
        }
		else
		{
			var jsonObj = JSON.Parse(www3.text);
			print("updateFunds: " + www3.text);

           fundsVal = jsonObj["funds"].Value.ToString();
           userFunds.text = fundsVal;

			//getScore();
            
        }
	}

	void pollProvince()
	{
		//print("pollProvince");
		pollProvinceText.text = "-$";
        pollProvinceTextAnim.Play(pollProvinceTextHash, -1, 0f);

		if (ProvincesButtons.provinceName == null) {
            errorMessage.text = "Please select a province to campaign";
            errorBox.SetActive(true);
        } else {
			// Get and update user's total manpower / support
			provincePolled();
			string url = "http://localhost:3000/api/pollProvince";

			var requestString = "{\"access_token\":\"" + NewGame.access_token + "\",\"province\": \"" + ProvincesButtons.provinceName.ToString() + "\"}";

			print("pollProvince: " + requestString);

			byte[] pData = Encoding.ASCII.GetBytes (requestString.ToCharArray ());

			WWWForm formPoll = new WWWForm();
			var headersPoll = formPoll.headers;
			headersPoll["Content-Type"] = "application/json";

			www4 = new WWW (url, pData, headersPoll);
			StartCoroutine (provincePolled());

            infoPanel.SetActive(true);
            infoPanelAnim.Play(infoPanelPollHash, -1, 0f);
            infoPanelHeadingText.text = ProvincesButtons.provinceName;
        }
	}

	IEnumerator provincePolled()
	{
		print("provincePolled");
		yield return www4;
		if (!string.IsNullOrEmpty(www4.error))
		{
			print ("polledError: " + www4.error);
			errorMessage.text = www4.error;
            errorBox.SetActive(true);
        }
		else
		{
			checkActionCount ();
			print ("polled: " + www4.text);
			var jsonObj = JSON.Parse(www4.text);
			if (jsonObj ["success"] == 2) {
				infoPanelText.text = "Insufficient funds or manpower";
			} else {
				AI1Action.text = jsonObj ["AI1Move"].Value.ToString ();
				AI2Action.text = jsonObj ["AI2Move"].Value.ToString ();
				AI3Action.text = jsonObj ["AI3Move"].Value.ToString ();
				AI4Action.text = jsonObj ["AI4Move"].Value.ToString ();


				infoPanelText.text = "Poll Votes\n\n" + PlayerPrefs.GetString("Player Party") + ": " + jsonObj ["User"].Value.ToString () + "\n" + AI1Name.text + ": " + jsonObj ["AI1"].Value.ToString () + "\n" + AI2Name.text +  ": " + jsonObj ["AI2"].Value.ToString () + "\n" + AI3Name.text + ": " +
					jsonObj ["AI3"].Value.ToString () + "\n" + AI4Name.text + ": " + jsonObj ["AI4"].Value.ToString ();
				//getScore();
			}

        }
	}

	void campaign()
	{

		if (ProvincesButtons.provinceName == null)
		{

            errorMessage.text = "Please select a province to campaign";
            errorBox.SetActive(true);
        }
		else
		{
            campaignTopics.SetActive(true);
            // Get manpower / support for selected province and AI actions


        }
	}


		

   
	void getSupport() {
		getSupportHelp();
		string url = "http://localhost:3000/api/getSupport";

		var requestString = "{\"access_token\":\"" + NewGame.access_token + "\"}";

		byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

		WWWForm form = new WWWForm();

		var headers = form.headers;
		headers["Content-Type"] = "application/json";

		www5 = new WWW(url, pData, headers);
		StartCoroutine(getSupportHelp());
	}
    

	IEnumerator getSupportHelp()
	{
		yield return www5;

		if (!string.IsNullOrEmpty(www5.error))
		{
			errorMessage.text = www5.error;
			errorBox.SetActive(true);
			print("getSupportHelpError: " + www5.error);
		}
		else
		{
			print ("getSupportHelp: " + www5.text);
			var jsonObj = JSON.Parse(www5.text);
			userSupport.text = jsonObj["support"].Value.ToString();
		}
	}

	void endTurn() {

		/*
		weeks--;
		endTurnText.text = weeks.ToString();
		if(weeks == 0)
		{
			infoPanel.SetActive(true);
			infoPanelAnim.Play(infoPanelPollHash, -1, 0f);
			infoPanelHeadingText.text = "Congratulations";
			infoPanelText.text = PlayerPrefs.GetString("Player Party") + " has won the election!";


            StartCoroutine(delayLeaderboard());
            
        }
		*/


		getWeeks();
		string url = "http://localhost:3000/api/endTurn";

		var requestString = "{\"access_token\":\"" + NewGame.access_token + "\"}";

		byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

		WWWForm form = new WWWForm();

		var headers = form.headers;
		headers["Content-Type"] = "application/json";

		www6 = new WWW(url, pData, headers);
		StartCoroutine(getWeeks());



	}


    void issue1Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[0].ToString();
        CampaignChoice();
    }

    void issue2Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[1].ToString();
        CampaignChoice();
    }

    void issue3Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[2].ToString();
        CampaignChoice();
    }

    void issue4Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[3].ToString();
        CampaignChoice();
    }

    void issue5Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[4].ToString();
        CampaignChoice();
    }

    void issue6Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[5].ToString();
        CampaignChoice();
    }

    void issue7Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[6].ToString();
        CampaignChoice();
    }

    void issue8Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[7].ToString();
        CampaignChoice();
    }

    void issue9Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[8].ToString();
        CampaignChoice();
    }

    void issue10Campaign()
    {
        campaignIssue = IssuesSelection.selectedIssues[9].ToString();
        CampaignChoice();
    }

    void CampaignChoice()
    {
        campaignTopics.SetActive(false);
        campaignTypes.SetActive(true);
    }

    void CampaignType1()
    {
        //Campaign type is Telemarketing
        campaignType = "telemarketing";
        issueCampaign();
    }

    
    void CampaignType2()
    {
        //Campaign type is Rally
        campaignType = "rally";
        issueCampaign();
        
    }

    void CampaignType3()
    {
        //Campaign type is Social Media
        campaignType = "social media";
        issueCampaign();
    }
    

    void issueCampaign()
    {
		print ("issueCampaign");
        campaignTypes.SetActive(false);

        provinceCampaign ();
		string url2 = "http://localhost:3000/api/campaignProvince";

		var requestString2 = "{\"access_token\":\"" + NewGame.access_token + "\",\"province\":\"" + ProvincesButtons.provinceName.ToString().ToLower() + "\", \"topic\":\"" + campaignIssue.ToLower() + "\",\"campaigntype\":\"" + campaignType.ToLower() + "\"}";

		print ("issueCampaign: " + requestString2);

		byte[] pData2 = Encoding.ASCII.GetBytes (requestString2.ToCharArray ());

		WWWForm form2 = new WWWForm ();
		var headers2 = form2.headers;
		headers2["Content-Type"] = "application/json";

		www8 = new WWW (url2, pData2, headers2);
		StartCoroutine (provinceCampaign ());
        
		//fetchManpower ();


        campaignText.text = "-$";
        campaignTextAnim.Play(campaignTextHash, -1, 0f);

		if (ProvincesButtons.provinceName == "northcape")
        {
            NCmanpower.enabled = true;
            NCmanAnim.Play(ncManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "westcape")
        {
            WCmanpower.enabled = true;
            WCmanAnim.Play(wcManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "eastcape")
        {
            ECmanpower.enabled = true;
            ECmanAnim.Play(ecManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "gauteng")
        {
            GPmanpower.enabled = true;
            GPmanAnim.Play(gpManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "kwazulunatal")
        {
            KZNmanpower.enabled = true;
            KZNmanAnim.Play(kznManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "mpumalanga")
        {
            MPmanpower.enabled = true;
            MPmanAnim.Play(mpManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "limpopo")
        {
            LPmanpower.enabled = true;
            LPmanAnim.Play(lpManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "northwest")
        {
            NWmanpower.enabled = true;
            NWmanAnim.Play(nwManPowerHash, -1, 0f);
        }

		if (ProvincesButtons.provinceName == "freestate")
        {
            FSmanpower.enabled = true;
            FSmanAnim.Play(fsManPowerHash, -1, 0f);
        }

        infoPanel.SetActive(true);
        infoPanelAnim.Play(infoPanelHash, -1, 0f);
        infoPanelHeadingText.text = ProvincesButtons.provinceName;
    }

	IEnumerator provinceCampaign()
	{
		yield return www8;

		if (!string.IsNullOrEmpty(www8.error))
		{
			errorMessage.text = www8.error;
			errorBox.SetActive(true);
			print("provinceCampaignError: " + www8.error);
		}
		else
		{
			print ("provinceCampaign: " + www8.text);
			checkActionCount ();
			var jsonObj = JSON.Parse(www8.text);

			if (jsonObj ["success"] == 2) {
				infoPanelText.text = "Insufficient funds or manpower";
			} else {
				//getScore();
				AI1Action.text = jsonObj["AI1Move"].Value.ToString();
				AI2Action.text = jsonObj["AI2Move"].Value.ToString();
				AI3Action.text = jsonObj["AI3Move"].Value.ToString();
				AI4Action.text = jsonObj["AI4Move"].Value.ToString();

				var supportAmount = jsonObj["support"].Value.ToString();
				//int supportAmountNum = int.Parse(jsonObj["support"].Value);


				infoPanelText.text = "You gained " + supportAmount +  " in support!";

				getSupport();


				//userSupportCurrent += supportAmountNum;
				//userSupport.text = userSupportCurrent.ToString();
			}
		}
	}

	void fetchManpower() {
		// Get and update user's total manpower / support


		getManpower();
		string url = "http://localhost:3000/api/getManpower";

		var requestString = "{\"access_token\":\"" + NewGame.access_token + "\"}";

		byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());


		WWWForm form = new WWWForm();
		var headers = form.headers;
		headers["Content-Type"] = "application/json";

		www9 = new WWW(url, pData, headers);
		StartCoroutine(getManpower());
	}

	IEnumerator getManpower()
	{

		//print ("You have clicked on the campaign button");
		yield return www9;
		if (!string.IsNullOrEmpty(www9.error))
		{
			errorMessage.text = www9.error;
			errorBox.SetActive(true);
		}
		else
		{
			var jsonObj = JSON.Parse(www9.text);
			GPmanp.text = jsonObj["gauteng"].Value.ToString();
			LPmanp.text = jsonObj["limpopo"].Value.ToString();
			KZNmanp.text = jsonObj["kwazulunatal"].Value.ToString();
			NWmanp.text = jsonObj["northwest"].Value.ToString();
			NCmanp.text = jsonObj["northcape"].Value.ToString();
			WCmanp.text = jsonObj["westcape"].Value.ToString();
			ECmanp.text = jsonObj["eastcape"].Value.ToString();
			FSmanp.text = jsonObj["freestate"].Value.ToString();
			MPmanp.text = jsonObj["mpumalanga"].Value.ToString();
			//userSupport.text = manPowerVal;

			//infoPanelText.text = "You have received " + manPowerVal + " manpower";
		}
	}

    IEnumerator getWeeks()
	{
		yield return www6;
		if (!string.IsNullOrEmpty(www6.error))
		{
			errorMessage.text = www6.error;
            errorBox.SetActive(true);
        }
		else
		{
			var jsonObj = JSON.Parse(www6.text);
			string weeksRemaining = jsonObj["Weeks"].Value.ToString();
			endTurnText.text = weeksRemaining;

            weeksPanel.SetActive(true);

            weeksLeftPanelText.text = weeksRemaining;
            actionsLeftText.text = " 3";
            actionCount = 0;

            print ("weeksRemaining: " + weeksRemaining);

			// Make this != "0" to test and go to leaderboard
			if (weeksRemaining == "0") {
				print ("Done!!");
				getScore ();
				finalResult ();
				string url2 = "http://localhost:3000/api/endResult";

				var requestString2 = "{\"access_token\":\"" + NewGame.access_token + "\"}";

				byte[] pData2 = Encoding.ASCII.GetBytes (requestString2.ToCharArray ());

				WWWForm form2 = new WWWForm ();
				var headers2 = form2.headers;
				headers2 ["Content-Type"] = "application/json";

				www7 = new WWW (url2, pData2, headers2);
				StartCoroutine (finalResult ());

			} else {
				//getScore ();
			}
		}
	}

	IEnumerator finalResult() {
		yield return www7;
		if (!string.IsNullOrEmpty (www7.error)) {
			errorMessage.text = www7.error;
			errorBox.SetActive (true);
		} else {
			print ("finalResult: " + www7.text);
			//getScore();
			var jsonObj = JSON.Parse(www7.text);
			finalScore = jsonObj["score"].Value.ToString();
			string hasWon = jsonObj ["success"].Value.ToString ();

			if (hasWon == "1") {
				infoPanel.SetActive(true);
				infoPanelAnim.Play(infoPanelHash, -1, 0f);
				infoPanelHeadingText.text = "Congratulations";
				infoPanelText.text = PlayerPrefs.GetString("Player Party") + " has won the election!\n\n" +
					"Score: " + finalScore;
			} else {
				infoPanel.SetActive(true);
				infoPanelAnim.Play(infoPanelHash, -1, 0f);
				infoPanelHeadingText.text = "Unfortunately";
				infoPanelText.text = PlayerPrefs.GetString("Player Party") + " has lost the election!\n\n" +
					"Score: " + finalScore;
			}

            afterGameLdbButObject.SetActive(true);
        }
	}

    void LeaderBoard()
    {
        loadScreen.SetActive(true);
        loadText.SetActive(true);

        SceneManager.LoadScene("LeaderBoard");
    }

	void checkActionCount() {
		getScore ();
		fetchManpower ();
		fundsUpdate ();

        actionCount++;

        actionsLeftText.text = " " + (3 - actionCount).ToString();


        if (actionCount == 3) {
			endTurn ();
           

            
		} 
	}
}
