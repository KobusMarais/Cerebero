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

    

    // Use this for initialization
    void Start () {

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
    }

    void OnGUI()
    {
    }
}
