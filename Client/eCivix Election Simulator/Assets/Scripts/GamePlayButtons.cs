using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.Networking;
using System.Text;
using System.Linq;

public class GamePlayButtons : MonoBehaviour {

    public Button collectFundsButton;
    public Button pollProvinceButton;
    public Button campaignButton;
    private WWW www;
    private WWWForm form;
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
        string url = "http://ecivix.org.za/api/getFunds";
        form = new WWWForm();
        form.AddField( "access_token", "123abc" );

        Dictionary<string, string> headers = new Dictionary<string, string>();
        headers.Add("Content-Type", "application/x-www-form-urlencoded");

        www = new WWW( url, form.data, headers );
        StartCoroutine(collectFunds());
    }

    IEnumerator collectFunds()
    {
        print("You have clicked on the collect funds button");

        yield return www;

        if (www.error != null)
        {
            Debug.Log("Data Submitted");
            print(www.text);
        }
        else
        {
            Debug.Log(www.error);
        }

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
