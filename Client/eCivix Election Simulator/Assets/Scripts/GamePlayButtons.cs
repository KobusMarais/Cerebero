using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.Networking;

public class GamePlayButtons : MonoBehaviour {

    public Button collectFundsButton;
    public Button pollProvinceButton;
    public Button campaignButton;
    private WWW www;
    // Use this for initialization
    void Start () {

        Button btn1 = collectFundsButton.GetComponent<Button>();
        btn1.onClick.AddListener(fundmid);

        Button btn2 = pollProvinceButton.GetComponent<Button>();
        btn2.onClick.AddListener(pollProvince);

        Button btn3 = campaignButton.GetComponent<Button>();
        btn3.onClick.AddListener(campaign);
    }
    void fundmid()
    {
       collectFunds();
        string url = "https://ecivix-testing.herokuapp.com/api/getFunds";
        www = new WWW(url);
        StartCoroutine(collectFunds());
    }

    IEnumerator collectFunds()
    {
        print("You have clicked on the collect funds button");
       
        yield return www;
        print(www.text);

    }

    void pollProvince()
    {
        print("You have clicked on the poll province button");
    }

    void campaign()
    {
        print("You have clicked on the campaign button");
    }
}
