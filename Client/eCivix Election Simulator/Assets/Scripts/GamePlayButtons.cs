using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class GamePlayButtons : MonoBehaviour {

    public Button collectFundsButton;
    public Button pollProvinceButton;
    public Button campaignButton;

    public Text collectFundsText;
    public Text pollProvinceText;
    public Text campaignText;

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


    int ncCoinHash = Animator.StringToHash("NC_CoinAnimation");
    int ncManPowerHash = Animator.StringToHash("NC_ManPowerAnimation");

    int wcCoinHash = Animator.StringToHash("WC_CoinAnimation");
    int wcManPowerHash = Animator.StringToHash("WC_ManPowerAnimation");

    int ecCoinHash = Animator.StringToHash("EC_CoinAnimation");
    int ecManPowerHash = Animator.StringToHash("EC_ManPowerAnimation");

    int gpCoinHash = Animator.StringToHash("GP_CoinAnimation");
    int gpManPowerHash = Animator.StringToHash("GP_ManPowerAnimation");
    

    // Use this for initialization
    void Start () {

        NCcoin.enabled = false;
        NCmanpower.enabled = false;

        WCcoin.enabled = false;
        WCmanpower.enabled = false;

        ECcoin.enabled = false;
        ECmanpower.enabled = false;

        GPcoin.enabled = false;
        GPmanpower.enabled = false;

        NCcoinAnim = NCcoin.GetComponent<Animator>();
        NCmanAnim = NCmanpower.GetComponent<Animator>();

        WCcoinAnim = WCcoin.GetComponent<Animator>();
        WCmanAnim = WCmanpower.GetComponent<Animator>();

        ECcoinAnim = ECcoin.GetComponent<Animator>();
        ECmanAnim = ECmanpower.GetComponent<Animator>();

        GPcoinAnim = GPcoin.GetComponent<Animator>();
        GPmanAnim = GPmanpower.GetComponent<Animator>();


        Button btn1 = collectFundsButton.GetComponent<Button>();
        btn1.onClick.AddListener(collectFunds);

        Button btn2 = pollProvinceButton.GetComponent<Button>();
        btn2.onClick.AddListener(pollProvince);

        Button btn3 = campaignButton.GetComponent<Button>();
        btn3.onClick.AddListener(campaign);
        
    }

    void collectFunds()
    {
        print("You have clicked on the collect funds button");

        collectFundsText.text = "-$5";

        if(ProvincesButtons.provinceName == null)
        {
            print("Please select a province to collect funds from");
        }
        else
        {
            if(ProvincesButtons.provinceName == "NC")
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
        }
    }

    void pollProvince()
    {
        print("You have clicked on the poll province button");
        pollProvinceText.text = "-$5";
    }

    void campaign()
    {
        print("You have clicked on the campaign button");
        campaignText.text = "-$5";

        //print(ProvincesButtons.provinceName);

        if (ProvincesButtons.provinceName == null)
        {
            print("Please select a province to campaign");
        }
        else
        {
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
        }
    }

    void OnGUI()
    {
    }
    
}
