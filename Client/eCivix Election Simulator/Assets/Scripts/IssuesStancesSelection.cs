using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using SimpleJSON;
using System.Text;
using System;

public class IssuesStancesSelection : MonoBehaviour {

	private WWW www;
	private WWW www2;
    public GameObject loadScreen;
    public GameObject loadText;

    JSONNode jsonStanceObj;
    public static string stancesArray;

    public GameObject errorBox;
    public Text errorMessage;
    public Button closeError;

    public Button startButton;
    public Slider issue1;
    public Slider issue2;
    public Slider issue3;
    public Slider issue4;
    public Slider issue5;
    public Slider issue6;
    public Slider issue7;
    public Slider issue8;
    public Slider issue9;
    public Slider issue10;

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

    public Text Issue1Stance;
    public Text Issue2Stance;
    public Text Issue3Stance;
    public Text Issue4Stance;
    public Text Issue5Stance;
    public Text Issue6Stance;
    public Text Issue7Stance;
    public Text Issue8Stance;
    public Text Issue9Stance;
    public Text Issue10Stance;

    public static String newGameJson;
    // Use this for initialization
    void Start () {
        loadScreen.SetActive(false);
        loadText.SetActive(false);

        getStances();
		//loadIssues();

        Issue1Stance.text = "Stance: Center";
		Issue2Stance.text = "Stance: Center";
		Issue3Stance.text = "Stance: Center";
		Issue4Stance.text = "Stance: Center";
        Issue5Stance.text = "Stance: Center";
        Issue6Stance.text = "Stance: Center";
        Issue7Stance.text = "Stance: Center";
        Issue8Stance.text = "Stance: Center";
        Issue9Stance.text = "Stance: Center";
        Issue10Stance.text = "Stance: Center";



        //Issue1Text.text = "Issue 1 asdf";
        //Issue2Text.text = "Issue 2 text";
        //Issue3Text.text = "Issue 3 text";
        //Issue4Text.text = "Issue 4 text";

        Button btn = startButton.GetComponent<Button>();
        btn.onClick.AddListener(SelectStances);

        issue1.onValueChanged.AddListener(issue1Slider);
        issue2.onValueChanged.AddListener(issue2Slider);
        issue3.onValueChanged.AddListener(issue3Slider);
        issue4.onValueChanged.AddListener(issue4Slider);
        issue5.onValueChanged.AddListener(issue5Slider);
        issue6.onValueChanged.AddListener(issue6Slider);
        issue7.onValueChanged.AddListener(issue7Slider);
        issue8.onValueChanged.AddListener(issue8Slider);
        issue9.onValueChanged.AddListener(issue9Slider);
        issue10.onValueChanged.AddListener(issue10Slider);

        errorBox.SetActive(false);

        Button closeErrorbtn = closeError.GetComponent<Button>();
        closeErrorbtn.onClick.AddListener(closeErrorFun);

        //startGame();

    }

    void closeErrorFun()
    {
        errorBox.SetActive(false);
    }

    void issue1Slider(float value)
    {
        //Issue1Stance.text = "Value: " + value;
		//Issue1Stance.text = "Stance:";

        if(value == 1)
        {
			Issue1Stance.text = jsonStanceObj[0][0][2];
        }

        if (value == 2)
        {
			Issue1Stance.text = jsonStanceObj[0][1][2];
        }

        if (value == 3)
        {
			Issue1Stance.text = jsonStanceObj[0][2][2];
        }

        if (value == 4)
        {
			Issue1Stance.text = jsonStanceObj[0][3][2];
        }

        if (value == 5)
        {
			Issue1Stance.text = jsonStanceObj[0][4][2];
        }
        
    }

    void issue2Slider(float value)
    {
		//Issue2Stance.text = "Value: " + value;
		//Issue2Stance.text = "Stance:";

		if(value == 1)
		{
			Issue2Stance.text = jsonStanceObj[1][0][2];
		}

		if (value == 2)
		{
			Issue2Stance.text = jsonStanceObj[1][1][2];
		}

		if (value == 3)
		{
			Issue2Stance.text = jsonStanceObj[1][2][2];
		}

		if (value == 4)
		{
			Issue2Stance.text = jsonStanceObj[1][3][2];
		}

		if (value == 5)
		{
			Issue2Stance.text = jsonStanceObj[1][4][2];
		}

    }

    void issue3Slider(float value)
    {
		//Issue3Stance.text = "Value: " + value;
		//Issue3Stance.text = "Stance:";

		if(value == 1)
		{
			Issue3Stance.text = jsonStanceObj[2][0][2];
		}

		if (value == 2)
		{
			Issue3Stance.text = jsonStanceObj[2][1][2];
		}

		if (value == 3)
		{
			Issue3Stance.text = jsonStanceObj[2][2][2];
		}

		if (value == 4)
		{
			Issue3Stance.text = jsonStanceObj[2][3][2];
		}

		if (value == 5)
		{
			Issue3Stance.text = jsonStanceObj[2][4][2];
		}

    }

    void issue4Slider(float value)
    {
		//Issue4Stance.text = "Value: " + value;
		//Issue4Stance.text = "Stance:";

		if(value == 1)
		{
			Issue4Stance.text = jsonStanceObj[3][0][2];
		}

		if (value == 2)
		{
			Issue4Stance.text = jsonStanceObj[3][1][2];
		}

		if (value == 3)
		{
			Issue4Stance.text = jsonStanceObj[3][2][2];
		}

		if (value == 4)
		{
			Issue4Stance.text = jsonStanceObj[3][3][2];
		}

		if (value == 5)
		{
			Issue4Stance.text = jsonStanceObj[3][4][2];
		}

    }
    void issue5Slider(float value)
    {
        //Issue1Stance.text = "Value: " + value;
        //Issue5Stance.text = "Stance:";

		if(value == 1)
		{
			Issue5Stance.text = jsonStanceObj[4][0][2];
		}

		if (value == 2)
		{
			Issue5Stance.text = jsonStanceObj[4][1][2];
		}

		if (value == 3)
		{
			Issue5Stance.text = jsonStanceObj[4][2][2];
		}

		if (value == 4)
		{
			Issue5Stance.text = jsonStanceObj[4][3][2];
		}

		if (value == 5)
		{
			Issue5Stance.text = jsonStanceObj[4][4][2];
		}

    }

    void issue6Slider(float value)
    {
        //Issue2Stance.text = "Value: " + value;
        //Issue6Stance.text = "Stance:";

		if(value == 1)
		{
			Issue6Stance.text = jsonStanceObj[5][0][2];
		}

		if (value == 2)
		{
			Issue6Stance.text = jsonStanceObj[5][1][2];
		}

		if (value == 3)
		{
			Issue6Stance.text = jsonStanceObj[5][2][2];
		}

		if (value == 4)
		{
			Issue6Stance.text = jsonStanceObj[5][3][2];
		}

		if (value == 5)
		{
			Issue6Stance.text = jsonStanceObj[5][4][2];
		}

    }

    void issue7Slider(float value)
    {
        //Issue3Stance.text = "Value: " + value;
        //Issue7Stance.text = "Stance:";

		if(value == 1)
		{
			Issue7Stance.text = jsonStanceObj[6][0][2];
		}

		if (value == 2)
		{
			Issue7Stance.text = jsonStanceObj[6][1][2];
		}

		if (value == 3)
		{
			Issue7Stance.text = jsonStanceObj[6][2][2];
		}

		if (value == 4)
		{
			Issue7Stance.text = jsonStanceObj[6][3][2];
		}

		if (value == 5)
		{
			Issue7Stance.text = jsonStanceObj[6][4][2];
		}

    }

    void issue8Slider(float value)
    {
        //Issue4Stance.text = "Value: " + value;
        //Issue8Stance.text = "Stance:";

		if(value == 1)
		{
			Issue8Stance.text = jsonStanceObj[7][0][2];
		}

		if (value == 2)
		{
			Issue8Stance.text = jsonStanceObj[7][1][2];
		}

		if (value == 3)
		{
			Issue8Stance.text = jsonStanceObj[7][2][2];
		}

		if (value == 4)
		{
			Issue8Stance.text = jsonStanceObj[7][3][2];
		}

		if (value == 5)
		{
			Issue8Stance.text = jsonStanceObj[7][4][2];
		}

    }
    void issue9Slider(float value)
    {
        //Issue1Stance.text = "Value: " + value;
        //Issue9Stance.text = "Stance:";

		if(value == 1)
		{
			Issue9Stance.text = jsonStanceObj[8][0][2];
		}

		if (value == 2)
		{
			Issue9Stance.text = jsonStanceObj[8][1][2];
		}

		if (value == 3)
		{
			Issue9Stance.text = jsonStanceObj[8][2][2];
		}

		if (value == 4)
		{
			Issue9Stance.text = jsonStanceObj[8][3][2];
		}

		if (value == 5)
		{
			Issue9Stance.text = jsonStanceObj[8][4][2];
		}

    }

    void issue10Slider(float value)
    {
        //Issue2Stance.text = "Value: " + value;
        //Issue10Stance.text = "Stance:";

		if(value == 1)
		{
			Issue10Stance.text = jsonStanceObj[9][0][2];
		}

		if (value == 2)
		{
			Issue10Stance.text = jsonStanceObj[9][1][2];
		}

		if (value == 3)
		{
			Issue10Stance.text = jsonStanceObj[9][2][2];
		}

		if (value == 4)
		{
			Issue10Stance.text = jsonStanceObj[9][3][2];
		}

		if (value == 5)
		{
			Issue10Stance.text = jsonStanceObj[9][4][2];
		}

    }

    void SelectStances()
    {
		setIssues();
    }

    IEnumerator delayLoading()
    {
        yield return new WaitForSeconds(2);


        SceneManager.LoadScene("MainScreen");
    }

	void loadIssues()
	{
		// Re-arrange issues
		//jsonStanceObj = JSON.Parse(stancesArray);

		//selectedIssues
		int i = 0;
		foreach (var issue in IssuesSelection.selectedIssues) {
			i++;
			switch (i) {
			case 1:
				//Issue1Text.text = issue.ToString();
				Issue1Text.text = jsonStanceObj[0][2][0];
				//print ("Dude1: " + jsonStanceObj[0][2][0].ToString());
				break;
			case 2:
				//Issue2Text.text = issue.ToString();
				Issue2Text.text = jsonStanceObj[1][2][0];
				break;
			case 3:
				//Issue3Text.text = issue.ToString();
				Issue3Text.text = jsonStanceObj[2][2][0];
				break;
			case 4:
				//Issue4Text.text = issue.ToString();
				Issue4Text.text = jsonStanceObj[3][2][0];
				break;
            case 5:
                //Issue5Text.text = issue.ToString();
				Issue5Text.text = jsonStanceObj[4][2][0];
				break;
			case 6:
				//Issue6Text.text = issue.ToString();
				Issue6Text.text = jsonStanceObj[5][2][0];
				break;
			case 7:
				//Issue7Text.text = issue.ToString();
				Issue7Text.text = jsonStanceObj[6][2][0];
				break;
			case 8:
				//Issue8Text.text = issue.ToString();
				Issue8Text.text = jsonStanceObj[7][2][0];
				break;
            case 9:
				//Issue9Text.text = issue.ToString();
				Issue9Text.text = jsonStanceObj[8][2][0];
				break;
			case 10:
				//Issue10Text.text = issue.ToString();
				Issue10Text.text = jsonStanceObj[9][2][0];
				break;
			}
		}
	}

    void loadStances()
    {
		print ("whatsup");
        jsonStanceObj = JSON.Parse(stancesArray);
		print ("Dude: " + jsonStanceObj.ToString());
		//print ("Dude1: " + jsonStanceObj[0][2][2].ToString());
		Issue1Stance.text = jsonStanceObj[0][2][2];
		Issue2Stance.text = jsonStanceObj[1][2][2];
		Issue3Stance.text = jsonStanceObj[2][2][2];
		Issue4Stance.text = jsonStanceObj[3][2][2];

		Issue5Stance.text = jsonStanceObj[4][2][2];
		Issue6Stance.text = jsonStanceObj[5][2][2];
		Issue7Stance.text = jsonStanceObj[6][2][2];
		Issue8Stance.text = jsonStanceObj[7][2][2];

		Issue9Stance.text = jsonStanceObj[8][2][2];
		Issue10Stance.text = jsonStanceObj[9][2][2];
        //print("xyz: " + jsonStanceObj[0][0][0][2][0].ToString());

		loadIssues ();
    }



    void setIssues()
	{
		print("Setting issues");

		setIssuesReturn();
		string url = "http://ecivix.org.za/api/setIssues";

		var requestString = "{\"access_token\":\"2\",\"issues\":[" + createIssueStanceArray() + "]}";
        print("setIssuesString: " + requestString);
       // print(requestString);
		byte[] pData = Encoding.ASCII.GetBytes (requestString.ToCharArray ());

        WWWForm form = new WWWForm();

        var headers = form.headers;
        headers.Add("content-type", "application/json");


        www = new WWW (url, pData, headers);
		StartCoroutine (setIssuesReturn());

        
    }

	IEnumerator setIssuesReturn()
	{
		yield return www;
		if (!string.IsNullOrEmpty (www.error)) {
			errorMessage.text = www.error;
			errorBox.SetActive(true);
		} else {
			print ("setIssuesReturn_Response: " + www.text);
			startGame();
		}

	}

    IEnumerator Upload()
    {
        yield return www;

        if (!string.IsNullOrEmpty(www.error))
        {
            errorMessage.text = www.error;
            errorBox.SetActive(true);
        }
        else
        {
			print("Upload: " + www.text);
            loadScreen.SetActive(true);
            loadText.SetActive(true);
            newGameJson = www.text;

            StartCoroutine(delayLoading());

        }
    }

    void startGame()
    {
        Upload();
        string url = "http://ecivix.org.za/api/startGame";
        

		var requestString = "{\"access_token\":\"2\", \"difficulty\":\"" + PlayerPrefs.GetString("Player Difficulty") + "\"}";

       	//print("StartGame" + requestString);
        byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());
        WWWForm form = new WWWForm();

        var headers = form.headers;
        headers.Add("content-type", "application/json");

        www = new WWW(url, pData, headers);
        StartCoroutine(Upload());
    }

    void getStances()
    {
        getStancesHelp();
        string url = "http://ecivix.org.za/api/getStances";


		//var requestString = "{\"access_token\": \"2\",\"issues\":[\"" + IssuesSelection.selectedIssues[0].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[1].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[2].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[3].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[4].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[5].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[6].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[7].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[8].ToString().ToLower() + "\",\"" + IssuesSelection.selectedIssues[9].ToString().ToLower() + "\"]}";
		//var requestString = "{\"access_token\": \"2\",\"issues\":[\"Same-Sex Marriage\", \"Racism\", \"Abortion\", \"Prostitution\", \"Mining\", \"Crime\", \"Unemployment\", \"Housing\", \"Tax Of High Income Earners\", \"Social Grants\"]}";
		var requestString = "{\"access_token\": \"2\",\"issues\":[\"" + IssuesSelection.selectedIssues[0].ToString() + "\",\"" + IssuesSelection.selectedIssues[1].ToString() + "\",\"" + IssuesSelection.selectedIssues[2].ToString() + "\",\"" + IssuesSelection.selectedIssues[3].ToString() + "\",\"" + IssuesSelection.selectedIssues[4].ToString() + "\",\"" + IssuesSelection.selectedIssues[5].ToString() + "\",\"" + IssuesSelection.selectedIssues[6].ToString() + "\",\"" + IssuesSelection.selectedIssues[7].ToString() + "\",\"" + IssuesSelection.selectedIssues[8].ToString() + "\",\"" + IssuesSelection.selectedIssues[9].ToString() + "\"]}";

        WWWForm form = new WWWForm();

        var headers = form.headers;
        headers.Add("content-type", "application/json");

        print("requestString: " + requestString);
        //print("getStances");
        byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());


		www2 = new WWW(url, pData, headers);
       StartCoroutine(getStancesHelp());
    }

    IEnumerator getStancesHelp()
    {
        yield return www2;
        if (!string.IsNullOrEmpty(www2.error))
        {
			print("Error: " + www2.error);
            errorMessage.text = www2.error;
            errorBox.SetActive(true);
        }
        else
        {
            stancesArray = www2.text;
            //print("Biatch: " + stancesArray);
            loadStances();
            
        }

    }

	string createIssueStanceArray(){
		string array = "{\"issue\":\"" + IssuesSelection.selectedIssues[0].ToString().ToLower() + "\", \"stance\":\"" + stance(issue1.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[1].ToString().ToLower() + "\", \"stance\":\"" + stance(issue2.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[2].ToString().ToLower() + "\", \"stance\":\"" + stance(issue3.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[3].ToString().ToLower() + "\", \"stance\":\"" + stance(issue4.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[4].ToString().ToLower() + "\", \"stance\":\"" + stance(issue5.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[5].ToString().ToLower() + "\", \"stance\":\"" + stance(issue6.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[6].ToString().ToLower() + "\", \"stance\":\"" + stance(issue7.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[7].ToString().ToLower() + "\", \"stance\":\"" + stance(issue8.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[8].ToString().ToLower() + "\", \"stance\":\"" + stance(issue9.value) + "\"}," +
			"{\"issue\":\"" + IssuesSelection.selectedIssues[9].ToString().ToLower() + "\", \"stance\":\"" + stance(issue10.value) + "\"}";

		//print("createIssueStanceArray: " + array);

        return array;
	}

	string stance(float t){

		if (t == 1)
			return "far left";
		if (t == 2)
			return "left";
		if (t == 3)
			return "centre";
		if (t == 4)
			return "right";
		if (t == 5)
			return "far right";

		return "";
	}

}
