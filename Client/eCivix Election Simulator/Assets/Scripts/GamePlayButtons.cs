using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.Networking;
using System.Text;
using SimpleJSON;

public class GamePlayButtons : MonoBehaviour {

	public Button collectFundsButton;
	public Button pollProvinceButton;
	public Button campaignButton;
	private WWW www;
	public Text userFunds;
	public Text userManpower;

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

		var requestString = "{'access_token':'123abc'}";

		byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

		www = new WWW(url, pData);
		StartCoroutine(collectFunds());
	}

	IEnumerator collectFunds()
	{
		//print("You have clicked on the collect funds button");

		yield return www;
		if (!string.IsNullOrEmpty (www.error)) {
			Debug.Log(www.error);
		} else {
			var jsonObj = JSON.Parse(www.text);
			userFunds.text = jsonObj ["funds"].Value.ToString ();
		}

	}

	void pollProvince()
	{
		print("You have clicked on the poll province button");
	}

	void campaign()
	{
		
		getManpower();
		string url = "http://ecivix.org.za/api/getManpower";

		var requestString = "{'access_token':'123abc'}";

		byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

		www = new WWW(url, pData);
		StartCoroutine(getManpower());
	}

	IEnumerator getManpower()
	{
		
		//print ("You have clicked on the campaign button");
		yield return www;
		if (!string.IsNullOrEmpty (www.error)) {
			Debug.Log (www.error);
		} else {
			var jsonObj = JSON.Parse (www.text);
			userManpower.text = jsonObj ["manpower"].Value.ToString ();
		}
	}
}
