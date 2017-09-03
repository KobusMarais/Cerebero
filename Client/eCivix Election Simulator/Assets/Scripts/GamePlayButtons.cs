using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using SimpleJSON;
using System.Text;

public class GamePlayButtons : MonoBehaviour {

	public Button collectFundsButton;
	public Button pollProvinceButton;
	public Button campaignButton;

	public Button endTurnButton;
	public Text endTurnText;
	public Text AI1Action;
	public Text AI2Action;
	public Text AI3Action;
	public Text AI4Action;
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
	public Text userFunds;
	public Text userManpower;

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


		// Set new game variables
		var jsonObj = JSON.Parse(NewGameDetails.newGameJson);
		userName.text = jsonObj["Username"].Value.ToString();
		userFunds.text = jsonObj["Funds"].Value.ToString();
		userManpower.text = jsonObj["Manpower"].Value.ToString();
		endTurnText.text = jsonObj["Weeks"].Value.ToString();
		weeks =  int.Parse(jsonObj["Weeks"].Value);

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

        getScore();
	}


    void getScore()
    {
        getScoreHelp();
        string url = "http://ecivix.org.za/api/getScore";

        var requestString = "{'access_token':'123abc'}";

        byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

        www = new WWW(url, pData);
        StartCoroutine(getScoreHelp());
    }

    IEnumerator getScoreHelp()
	{
		yield return www;
		if (!string.IsNullOrEmpty(www.error))
		{
			Debug.Log(www.error);
			//print(www.error);
		}
		else
		{
			var jsonObj = JSON.Parse(www.text);
            Score.text = jsonObj["score"].Value.ToString(); 
        }
	}

    void collectFunds()
	{
		print("You have clicked on the collect funds button");

		if (ProvincesButtons.provinceName == null)
		{
			print("Please select a province to collect funds from");
		}
		else
		{
			// Get collected funds for selected province and AI actions
			provinceCollect();
			string url = "http://ecivix.org.za/api/collectFunds";

			var requestString = "{'access_token':'123abc','province':'Gauteng'}";

			byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

			www = new WWW(url, pData);
			StartCoroutine(provinceCollect());

			// Update user's total funds.
			updateFunds();
			string url2 = "http://ecivix.org.za/api/getFunds";

			var requestString2 = "{'access_token':'123abc','province':'Gauteng'}";

			byte[] pData2 = Encoding.ASCII.GetBytes(requestString2.ToCharArray());

			www2 = new WWW(url2, pData2);
			StartCoroutine(updateFunds());

			collectFundsText.text = "-$5";
			collectFundsTextAnim.Play(collectFundsTextHash, -1, 0f);

			if (ProvincesButtons.provinceName == "NC")
			{
				NCcoin.enabled = true;
				NCcoinAnim.Play(ncCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "WC")
			{
				WCcoin.enabled = true;
				WCcoinAnim.Play(wcCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "EC")
			{
				ECcoin.enabled = true;
				ECcoinAnim.Play(ecCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "GP")
			{
				GPcoin.enabled = true;
				GPcoinAnim.Play(gpCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "MP")
			{
				MPcoin.enabled = true;
				MPcoinAnim.Play(mpCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "LP")
			{
				LPcoin.enabled = true;
				LPcoinAnim.Play(lpCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "NW")
			{
				NWcoin.enabled = true;
				NWcoinAnim.Play(nwCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "KZN")
			{
				KZNcoin.enabled = true;
				KZNcoinAnim.Play(kznCoinHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "FS")
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
		yield return www;
		if (!string.IsNullOrEmpty(www.error))
		{
			Debug.Log(www.error);
			//print(www.error);
		}
		else
		{
			var jsonObj = JSON.Parse(www.text);
			AI1Action.text = jsonObj["AI1Move"].Value.ToString();
			AI2Action.text = jsonObj["AI2Move"].Value.ToString();
			AI3Action.text = jsonObj["AI3Move"].Value.ToString();
			AI4Action.text = jsonObj["AI4Move"].Value.ToString();
            
        }
	}

	IEnumerator updateFunds()
	{
		yield return www2;
		if (!string.IsNullOrEmpty(www2.error))
		{
			Debug.Log(www2.error);
			//print(www.error);
		}
		else
		{
			var jsonObj = JSON.Parse(www2.text);
            //print(www.text);

            fundsVal = jsonObj["funds"].Value.ToString();
            userFunds.text = fundsVal;

            infoPanelText.text = "You have collected " + fundsVal + " funds";
        }
	}

	void pollProvince()
	{
		print("You have clicked on the poll province button");
		pollProvinceText.text = "-$5";
        pollProvinceTextAnim.Play(pollProvinceTextHash, -1, 0f);

		if (ProvincesButtons.provinceName == null) {
			print ("Please select a province to campaign");
		} else {
			// Get and update user's total manpower / support
			provincePolled();
			string url = "http://ecivix.org.za/api/pollProvince";

			var requestString = "{'access_token':'123abc'}";

			byte[] pData = Encoding.ASCII.GetBytes (requestString.ToCharArray ());

			www = new WWW (url, pData);
			StartCoroutine (provincePolled());

            infoPanel.SetActive(true);
            infoPanelAnim.Play(infoPanelPollHash, -1, 0f);
            infoPanelHeadingText.text = ProvincesButtons.provinceName;
        }
	}

	IEnumerator provincePolled()
	{
		yield return www;
		if (!string.IsNullOrEmpty(www.error))
		{
			Debug.Log(www.error);
			//print(www.error);
		}
		else
		{
			var jsonObj = JSON.Parse(www.text);
			AI1Action.text = jsonObj["AI1Move"].Value.ToString();
			AI2Action.text = jsonObj["AI2Move"].Value.ToString();
			AI3Action.text = jsonObj["AI3Move"].Value.ToString();
			AI4Action.text = jsonObj["AI4Move"].Value.ToString();


            infoPanelText.text = "Poll Votes\n\n" + userName.text + ": " + jsonObj["User"].Value.ToString() + "\nAI 1: " + jsonObj["AI1"].Value.ToString() + "\nAI 2: " + jsonObj["AI2"].Value.ToString() + "\nAI 3: " +
            jsonObj["AI3"].Value.ToString() + "\nAI 4: " + jsonObj["AI4"].Value.ToString();
        }
	}

	void campaign()
	{
		print("You have clicked on the campaign button");

		if (ProvincesButtons.provinceName == null)
		{
			print("Please select a province to campaign");
		}
		else
		{

			// Get manpower / support for selected province and AI actions
			provinceCampaign();
			string url2 = "http://ecivix.org.za/api/campaignProvince";

			var requestString2 = "{'access_token':'123abc','province':'Gauteng'}";

			byte[] pData2 = Encoding.ASCII.GetBytes(requestString2.ToCharArray());

			www2 = new WWW(url2, pData2);
			StartCoroutine(provinceCampaign());

			// Get and update user's total manpower / support
			getManpower();
			string url = "http://ecivix.org.za/api/getManpower";

			var requestString = "{'access_token':'123abc'}";

			byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

			www = new WWW(url, pData);
			StartCoroutine(getManpower());


			campaignText.text = "-$5";
			campaignTextAnim.Play(campaignTextHash, -1, 0f);

			if (ProvincesButtons.provinceName == "NC")
			{
				NCmanpower.enabled = true;
				NCmanAnim.Play(ncManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "WC")
			{
				WCmanpower.enabled = true;
				WCmanAnim.Play(wcManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "EC")
			{
				ECmanpower.enabled = true;
				ECmanAnim.Play(ecManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "GP")
			{
				GPmanpower.enabled = true;
				GPmanAnim.Play(gpManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "KZN")
			{
				KZNmanpower.enabled = true;
				KZNmanAnim.Play(kznManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "MP")
			{
				MPmanpower.enabled = true;
				MPmanAnim.Play(mpManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "LP")
			{
				LPmanpower.enabled = true;
				LPmanAnim.Play(lpManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "NW")
			{
				NWmanpower.enabled = true;
				NWmanAnim.Play(nwManPowerHash, -1, 0f);
			}

			if (ProvincesButtons.provinceName == "FS")
			{
				FSmanpower.enabled = true;
				FSmanAnim.Play(fsManPowerHash, -1, 0f);
			}

            infoPanel.SetActive(true);
            infoPanelAnim.Play(infoPanelHash, -1, 0f);
            infoPanelHeadingText.text = ProvincesButtons.provinceName;

        }
	}

	IEnumerator getManpower()
	{

		//print ("You have clicked on the campaign button");
		yield return www;
		if (!string.IsNullOrEmpty(www.error))
		{
			Debug.Log(www.error);
		}
		else
		{
			var jsonObj = JSON.Parse(www.text);
            manPowerVal = jsonObj["manpower"].Value.ToString();
            userManpower.text = manPowerVal;

            infoPanelText.text = "You have received " + manPowerVal + " manpower";
        }
	}

	IEnumerator provinceCampaign()
	{
		yield return www2;
		if (!string.IsNullOrEmpty(www2.error))
		{
			Debug.Log(www2.error);
			//print(www.error);
		}
		else
		{
			var jsonObj = JSON.Parse(www2.text);
			AI1Action.text = jsonObj["AI1Move"].Value.ToString();
			AI2Action.text = jsonObj["AI2Move"].Value.ToString();
			AI3Action.text = jsonObj["AI3Move"].Value.ToString();
			AI4Action.text = jsonObj["AI4Move"].Value.ToString();
		}
	}

	void endTurn() {
		print("End turn button clicked");

		weeks--;
		endTurnText.text = weeks.ToString();
		if(weeks == 0)
		{
			infoPanel.SetActive(true);
			infoPanelAnim.Play(infoPanelPollHash, -1, 0f);
			infoPanelHeadingText.text = "Congratulations";
			infoPanelText.text = PlayerPrefs.GetString("Player Party") + " has won the election!";
		}

		/*
		getWeeks();
		string url = "http://ecivix.org.za/api/endTurn";

		var requestString = "{'access_token':'123abc','weeks':'3'}";

		byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

		www = new WWW(url, pData);
		StartCoroutine(getWeeks());
		*/


	}

	IEnumerator getWeeks()
	{
		yield return www;
		if (!string.IsNullOrEmpty(www.error))
		{
			Debug.Log(www.error);
		}
		else
		{
			print(www.text);
			var jsonObj = JSON.Parse(www.text);
			endTurnText.text = jsonObj["Weeks"].Value.ToString();

            if(jsonObj["Weeks"].Value.ToString() == "10")
            {
                infoPanel.SetActive(true);
                infoPanelAnim.Play(infoPanelHash, -1, 0f);
                infoPanelHeadingText.text = "Congratulations";
                infoPanelText.text = PlayerPrefs.GetString("Player Party") + " has won the election!";
            }
		}
	}
}
