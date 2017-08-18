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
        }
    }

    void OnGUI()
    {
    }
    
}
